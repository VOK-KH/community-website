'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

type Profile = {
  displayName: string
  bio: string
  handle: string
}

const KEY = 'cms_profile'

function readProfile(): Profile {
  if (typeof window === 'undefined') {
    return { displayName: '', bio: '', handle: '' }
  }
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return { displayName: '', bio: '', handle: '' }
    return JSON.parse(raw) as Profile
  } catch {
    return { displayName: '', bio: '', handle: '' }
  }
}

export default function CmsProfilePage() {
  const [profile, setProfile] = React.useState<Profile>({ displayName: '', bio: '', handle: '' })
  const [savedAt, setSavedAt] = React.useState<string | null>(null)

  React.useEffect(() => {
    setProfile(readProfile())
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <div className="text-2xl font-semibold tracking-tight">Profile</div>
        <div className="text-sm text-muted-foreground">Update your CMS profile details.</div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Basics</CardTitle>
          <CardDescription>Stored in your browser for this demo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="displayName">Display name</Label>
            <Input
              id="displayName"
              value={profile.displayName}
              onChange={(e) => setProfile((p) => ({ ...p, displayName: e.target.value }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="handle">Handle</Label>
            <Input
              id="handle"
              placeholder="@yourname"
              value={profile.handle}
              onChange={(e) => setProfile((p) => ({ ...p, handle: e.target.value }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              value={profile.bio}
              onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
            />
          </div>

          <Separator />

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              onClick={() => {
                window.localStorage.setItem(KEY, JSON.stringify(profile))
                setSavedAt(new Date().toLocaleString())
              }}
            >
              Save
            </Button>
            {savedAt && <div className="text-xs text-muted-foreground">Saved {savedAt}</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

