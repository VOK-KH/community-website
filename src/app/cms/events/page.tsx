'use client'

import * as React from 'react'

import { cmsStorage, type CmsEvent } from '@/lib/cms/storage'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'

function formatDate(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString()
}

export default function CmsEventsPage() {
  const [events, setEvents] = React.useState<CmsEvent[]>([])
  const [query, setQuery] = React.useState('')

  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [location, setLocation] = React.useState('')
  const [startsAt, setStartsAt] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [published, setPublished] = React.useState(false)

  const refresh = React.useCallback(() => {
    setEvents(cmsStorage.events.list())
  }, [])

  React.useEffect(() => {
    refresh()
  }, [refresh])

  React.useEffect(() => {
    if (startsAt) return
    const next = new Date(Date.now() + 86400000).toISOString().slice(0, 16)
    setStartsAt(next)
  }, [startsAt])

  const filtered = events.filter((e) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      e.title.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-2xl font-semibold tracking-tight">Events</div>
          <div className="text-sm text-muted-foreground">
            Create and publish meetups, build nights, and workshops.
          </div>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>New event</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Create event</DialogTitle>
            </DialogHeader>

            <div className="grid gap-3">
              <div className="grid gap-2">
                <Label htmlFor="e_title">Title</Label>
                <Input id="e_title" value={title} onChange={(v) => setTitle(v.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="e_location">Location</Label>
                <Input
                  id="e_location"
                  value={location}
                  onChange={(v) => setLocation(v.target.value)}
                  placeholder="Discord / Zoom / In-person"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="e_startsAt">Starts at</Label>
                <Input
                  id="e_startsAt"
                  type="datetime-local"
                  value={startsAt}
                  onChange={(v) => setStartsAt(v.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="e_desc">Description</Label>
                <Textarea
                  id="e_desc"
                  value={description}
                  onChange={(v) => setDescription(v.target.value)}
                  rows={5}
                />
              </div>
              <div className="flex items-center justify-between gap-3 rounded-md border p-3">
                <div>
                  <div className="text-sm font-medium">Publish</div>
                  <div className="text-xs text-muted-foreground">Visible as an event when published.</div>
                </div>
                <Switch checked={published} onCheckedChange={setPublished} />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                onClick={() => {
                  const iso = startsAt ? new Date(startsAt).toISOString() : new Date().toISOString()
                  cmsStorage.events.upsert({
                    title: title.trim() || 'Untitled event',
                    location: location.trim() || 'TBA',
                    startsAt: iso,
                    description: description.trim() || '',
                    published,
                  })
                  setTitle('')
                  setLocation('')
                  setDescription('')
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
          <CardDescription>Search title, location, or description.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input placeholder="Search…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">All events</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>When</TableHead>
                <TableHead>Where</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="font-medium">{e.title}</TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(e.startsAt)}</TableCell>
                  <TableCell className="text-muted-foreground">{e.location}</TableCell>
                  <TableCell>
                    <Badge variant={e.published ? 'default' : 'secondary'}>
                      {e.published ? 'Published' : 'Draft'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        cmsStorage.events.upsert({ ...e, published: !e.published })
                        refresh()
                      }}
                    >
                      Toggle
                    </Button>{' '}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        cmsStorage.events.remove(e.id)
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
                  <TableCell colSpan={5} className="text-center text-sm text-muted-foreground">
                    No events found.
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

