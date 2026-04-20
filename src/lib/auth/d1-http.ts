import { Buffer } from 'node:buffer'

/**
 * Minimal D1 client over Cloudflare’s REST API so `drizzle-orm/d1` can run on Node (e.g. Vercel).
 * Workers get a native `D1Database` binding; serverless Node does not.
 *
 * @see https://developers.cloudflare.com/api/resources/d1/subresources/database/methods/query/
 * @see https://developers.cloudflare.com/api/resources/d1/subresources/database/methods/raw/
 */

type CfApiError = { message?: string }

type CfApiEnvelope = {
  success: boolean
  errors?: CfApiError[]
  result?: CfQueryResult[]
}

type CfQueryResult = {
  success?: boolean
  meta?: Record<string, unknown>
  results?: Record<string, unknown>[] | { columns?: string[]; rows?: unknown[][] }
}

function assertApiSuccess(json: CfApiEnvelope, httpStatus: number) {
  if (!json.success) {
    const msg = json.errors?.map((e) => e.message).filter(Boolean).join('; ') || `HTTP ${httpStatus}`
    throw new Error(`D1 API: ${msg}`)
  }
}

/** Cloudflare expects `params` as an array of strings. */
export function d1StringParams(values: unknown[]): string[] {
  return values.map((v) => {
    if (v === null || v === undefined) return ''
    if (typeof v === 'boolean') return v ? '1' : '0'
    if (typeof v === 'number' || typeof v === 'bigint') return String(v)
    if (v instanceof Date) return v.toISOString()
    if (v instanceof Uint8Array) return Buffer.from(v).toString('base64')
    return String(v)
  })
}

type BoundStatement = {
  sql: string
  values: unknown[]
  run: () => Promise<{ success: boolean; meta: Record<string, unknown> }>
  all: () => Promise<{
    success: boolean
    meta: Record<string, unknown>
    results: Record<string, unknown>[]
  }>
  raw: () => Promise<unknown[][]>
}

export function createD1HttpClient(opts: {
  accountId: string
  databaseId: string
  apiToken: string
  fetchImpl?: typeof fetch
}) {
  const fetchFn = opts.fetchImpl ?? fetch
  const base = `https://api.cloudflare.com/client/v4/accounts/${opts.accountId}/d1/database/${opts.databaseId}`

  const headers: Record<string, string> = {
    Authorization: `Bearer ${opts.apiToken}`,
    'Content-Type': 'application/json',
  }

  async function postJson(path: '/query' | '/raw', body: unknown): Promise<CfApiEnvelope> {
    const res = await fetchFn(`${base}${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
    const json = (await res.json()) as CfApiEnvelope
    assertApiSuccess(json, res.status)
    return json
  }

  async function execRun(sql: string, values: unknown[]) {
    const json = await postJson('/query', { sql, params: d1StringParams(values) })
    const first = json.result?.[0]
    if (!first) throw new Error('D1 API: empty result')
    return {
      success: first.success ?? true,
      meta: (first.meta ?? {}) as Record<string, unknown>,
    }
  }

  async function execAll(sql: string, values: unknown[]) {
    const json = await postJson('/query', { sql, params: d1StringParams(values) })
    const first = json.result?.[0]
    if (!first) throw new Error('D1 API: empty result')
    const rows = Array.isArray(first.results)
      ? (first.results as Record<string, unknown>[])
      : []
    return {
      success: first.success ?? true,
      meta: (first.meta ?? {}) as Record<string, unknown>,
      results: rows,
    }
  }

  async function execRaw(sql: string, values: unknown[]) {
    const json = await postJson('/raw', { sql, params: d1StringParams(values) })
    const first = json.result?.[0]
    if (!first) throw new Error('D1 API: empty result')
    const r = first.results
    if (r && typeof r === 'object' && !Array.isArray(r) && 'rows' in r && Array.isArray((r as { rows: unknown }).rows)) {
      return (r as { rows: unknown[][] }).rows
    }
    return [] as unknown[][]
  }

  return {
    prepare(sql: string) {
      return {
        bind(...values: unknown[]): BoundStatement {
          const bound: BoundStatement = {
            sql,
            values,
            run: () => execRun(sql, values),
            all: () => execAll(sql, values),
            raw: () => execRaw(sql, values),
          }
          return bound
        },
      }
    },

    async batch(statements: unknown[]) {
      const batch = (statements as BoundStatement[]).map((st) => ({
        sql: st.sql,
        params: d1StringParams(st.values),
      }))
      const json = await postJson('/query', { batch })
      const out = json.result ?? []
      return out.map((r) => ({
        success: r.success ?? true,
        meta: r.meta ?? {},
        results: Array.isArray(r.results) ? (r.results as Record<string, unknown>[]) : [],
      }))
    },
  }
}
