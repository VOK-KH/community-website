'use client'

import * as React from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'

type CmsSettings = {
  communityName: string
  announcementsEnabled: boolean
  eventsEnabled: boolean
}

const KEY = 'cms_settings'

function readSettings(): CmsSettings {
  if (typeof window === 'undefined') {
    return { communityName: 'VokDev', announcementsEnabled: true, eventsEnabled: true }
  }
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return { communityName: 'VokDev', announcementsEnabled: true, eventsEnabled: true }
    return JSON.parse(raw) as CmsSettings
  } catch {
    return { communityName: 'VokDev', announcementsEnabled: true, eventsEnabled: true }
  }
}

export default function CmsSettingsPage() {
  const [settings, setSettings] = React.useState<CmsSettings>({
    communityName: 'VokDev',
    announcementsEnabled: true,
    eventsEnabled: true,
  })
  const [savedAt, setSavedAt] = React.useState<string | null>(null)

  React.useEffect(() => {
    setSettings(readSettings())
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-2xl font-semibold tracking-tight">Settings</div>
          <div className="text-sm text-muted-foreground">Configure CMS features for the community.</div>
        </div>
        <Badge variant="secondary">local</Badge>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Community</CardTitle>
          <CardDescription>These settings affect the CMS experience.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="communityName">Community name</Label>
            <Input
              id="communityName"
              value={settings.communityName}
              onChange={(e) => setSettings((s) => ({ ...s, communityName: e.target.value }))}
            />
          </div>

          <div className="flex items-center justify-between gap-3 rounded-md border p-3">
            <div>
              <div className="text-sm font-medium">Announcements</div>
              <div className="text-xs text-muted-foreground">Enable the announcements section.</div>
            </div>
            <Switch
              checked={settings.announcementsEnabled}
              onCheckedChange={(v) => setSettings((s) => ({ ...s, announcementsEnabled: v }))}
            />
          </div>

          <div className="flex items-center justify-between gap-3 rounded-md border p-3">
            <div>
              <div className="text-sm font-medium">Events</div>
              <div className="text-xs text-muted-foreground">Enable event planning features.</div>
            </div>
            <Switch
              checked={settings.eventsEnabled}
              onCheckedChange={(v) => setSettings((s) => ({ ...s, eventsEnabled: v }))}
            />
          </div>

          <Separator />

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              onClick={() => {
                window.localStorage.setItem(KEY, JSON.stringify(settings))
                setSavedAt(new Date().toLocaleString())
              }}
            >
              Save settings
            </Button>
            {savedAt && <div className="text-xs text-muted-foreground">Saved {savedAt}</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

