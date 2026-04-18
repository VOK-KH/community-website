import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

import { requireCmsSession } from '@/lib/auth/cms'

type AuditRow = {
  id: string
  action: string
  actor: string
  at: string
}

function makeAudit(actor: string): AuditRow[] {
  const now = new Date()
  return [
    {
      id: 'a1',
      action: 'login',
      actor,
      at: now.toISOString(),
    },
    {
      id: 'a2',
      action: 'view members',
      actor,
      at: new Date(now.getTime() - 1000 * 60 * 12).toISOString(),
    },
    {
      id: 'a3',
      action: 'create announcement (draft)',
      actor,
      at: new Date(now.getTime() - 1000 * 60 * 30).toISOString(),
    },
  ]
}

export default async function CmsAuditPage() {
  const session = await requireCmsSession()
  const actor = session.user.email
  const rows = makeAudit(actor)

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-2xl font-semibold tracking-tight">Audit log</div>
          <div className="text-sm text-muted-foreground">Admin-only visibility.</div>
        </div>
        <Badge>admin</Badge>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Recent activity</CardTitle>
          <CardDescription>Demo data (wire to DB later).</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>When</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.action}</TableCell>
                  <TableCell className="text-muted-foreground">{r.actor}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(r.at).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

