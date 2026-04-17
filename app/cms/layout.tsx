import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Cctv, CalendarDays, LayoutDashboard, Megaphone, Settings, Users, User } from 'lucide-react'

export const metadata: Metadata = {
  title: 'CMS',
}

function CmsTopBar() {
  return (
    <div className="border-b bg-background/80 supports-[backdrop-filter]:bg-background/60 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3">
        <SidebarTrigger />
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium">Community CMS</div>
          <div className="truncate text-xs text-muted-foreground">
            Manage members, announcements, and events
          </div>
        </div>
        <form action="/cms/logout" method="post">
          <Button variant="outline" size="sm" type="submit">
            Sign out
          </Button>
        </form>
      </div>
    </div>
  )
}

function CmsSidebar({ role }: { role: string }) {
  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <div className="flex items-center justify-between gap-2 px-2">
          <Link href="/cms/dashboard" className="text-sm font-semibold">
            VokDev CMS
          </Link>
          <span className="text-xs text-muted-foreground">{role}</span>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard">
                  <Link href="/cms/dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Members">
                  <Link href="/cms/members">
                    <Users />
                    <span>Members</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Announcements">
                  <Link href="/cms/posts">
                    <Megaphone />
                    <span>Announcements</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Events">
                  <Link href="/cms/events">
                    <CalendarDays />
                    <span>Events</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Profile">
                  <Link href="/cms/profile">
                    <User />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                  <Link href="/cms/settings">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {role === 'admin' && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Admin</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Audit log">
                      <Link href="/cms/admin/audit">
                        <Cctv />
                        <span>Audit log</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>

      <SidebarFooter>
        <div className="px-2 text-xs text-muted-foreground">
          <div className="truncate">Member-only area</div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

export default async function CmsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies()
  const role = cookieStore.get('cms_role')?.value ?? 'member'

  return (
    <div className="min-h-svh bg-background text-foreground">
      <SidebarProvider defaultOpen>
        <CmsSidebar role={role} />
        <SidebarInset>
          <CmsTopBar />
          <div className="mx-auto w-full max-w-6xl px-4 py-6">{children}</div>
          <Separator className="mt-10" />
          <div className="mx-auto w-full max-w-6xl px-4 py-6 text-xs text-muted-foreground">
            CMS demo auth uses cookies. Wire this to your real auth provider later.
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

