'use client'

import * as React from 'react'

import { cmsStorage, type CmsPost } from '@/lib/cms/storage'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'

function parseTags(raw: string) {
  return raw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
}

export default function CmsPostsPage() {
  const [posts, setPosts] = React.useState<CmsPost[]>([])
  const [query, setQuery] = React.useState('')

  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [body, setBody] = React.useState('')
  const [tags, setTags] = React.useState('announcement')
  const [published, setPublished] = React.useState(false)

  const refresh = React.useCallback(() => {
    setPosts(cmsStorage.posts.list())
  }, [])

  React.useEffect(() => {
    refresh()
  }, [refresh])

  const filtered = posts.filter((p) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      p.title.toLowerCase().includes(q) ||
      p.body.toLowerCase().includes(q) ||
      p.tags.join(',').toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-2xl font-semibold tracking-tight">Announcements</div>
          <div className="text-sm text-muted-foreground">
            Draft, tag, and publish updates to the community.
          </div>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>New announcement</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Create announcement</DialogTitle>
            </DialogHeader>

            <div className="grid gap-3">
              <div className="grid gap-2">
                <Label htmlFor="p_title">Title</Label>
                <Input id="p_title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="p_body">Body</Label>
                <Textarea
                  id="p_body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={6}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="p_tags">Tags (comma-separated)</Label>
                <Input id="p_tags" value={tags} onChange={(e) => setTags(e.target.value)} />
              </div>
              <div className="flex items-center justify-between gap-3 rounded-md border p-3">
                <div>
                  <div className="text-sm font-medium">Publish</div>
                  <div className="text-xs text-muted-foreground">
                    Toggle on to mark as published.
                  </div>
                </div>
                <Switch checked={published} onCheckedChange={setPublished} />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                onClick={() => {
                  cmsStorage.posts.upsert({
                    title: title.trim() || 'Untitled',
                    body: body.trim() || '',
                    tags: parseTags(tags),
                    published,
                  })
                  setTitle('')
                  setBody('')
                  setTags('announcement')
                  setPublished(false)
                  setOpen(false)
                  refresh()
                }}
              >
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Search</CardTitle>
          <CardDescription>Search title, body, or tags.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input placeholder="Search…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">All announcements</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.title}</TableCell>
                  <TableCell className="text-muted-foreground">
                    <div className="flex flex-wrap gap-1">
                      {p.tags.slice(0, 4).map((t) => (
                        <Badge key={t} variant="secondary">
                          {t}
                        </Badge>
                      ))}
                      {p.tags.length > 4 && <Badge variant="outline">+{p.tags.length - 4}</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={p.published ? 'default' : 'secondary'}>
                      {p.published ? 'Published' : 'Draft'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        cmsStorage.posts.upsert({ ...p, published: !p.published })
                        refresh()
                      }}
                    >
                      Toggle
                    </Button>{' '}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        cmsStorage.posts.remove(p.id)
                        refresh()
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-sm text-muted-foreground">
                    No announcements found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

