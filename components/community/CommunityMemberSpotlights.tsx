'use client'

import { useMemo, useState } from 'react'
import { VokDevButton } from '@/components/VokDevButton'
import { VokDevBadge } from '@/components/VokDevBadge'
import { communityMembers } from './data'

export function CommunityMemberSpotlights() {
  const [selectedRole, setSelectedRole] = useState('All')

  const roles = useMemo(
    () => ['All', ...Array.from(new Set(communityMembers.map((m) => m.role)))],
    [],
  )

  const filteredMembers = useMemo(
    () =>
      selectedRole === 'All'
        ? communityMembers
        : communityMembers.filter((m) => m.role === selectedRole),
    [selectedRole],
  )

  return (
    <>
      <section className="pg-sec pg-sec-alt" aria-labelledby="community-roles-heading">
        <div className="pg-sec-inner">
          <div className="pg-sec-hd">
            <h2 id="community-roles-heading">Browse by role</h2>
            <p>Filter member spotlights to match the kind of collaboration you are looking for.</p>
          </div>
          <div className="flex flex-wrap gap-2" role="toolbar" aria-label="Filter by role">
            {roles.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role)}
                className={`pg-pill ${selectedRole === role ? 'pg-pill-active' : ''}`}
                aria-pressed={selectedRole === role}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pg-sec" aria-labelledby="community-spotlights-heading">
        <div className="pg-sec-inner">
          <div className="pg-sec-hd">
            <h2 id="community-spotlights-heading">Member spotlights</h2>
            <p>
              Showing {filteredMembers.length} of {communityMembers.length} profiles for the
              selected filter.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredMembers.map((member) => (
              <div key={member.id} className="pg-card flex flex-col items-center text-center">
                <div className="relative mb-5 inline-flex">
                  <div className="pg-avatar-ring">
                    <div className="pg-avatar">
                      <member.avatar className="h-7 w-7 shrink-0" aria-hidden />
                    </div>
                  </div>
                  <span className="pg-online" title="Active" aria-hidden />
                </div>
                <h3 className="mb-1 text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="mb-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {member.role}
                </p>
                <div className="mb-5 flex flex-wrap justify-center gap-2">
                  {member.specialties.map((specialty) => (
                    <VokDevBadge
                      key={specialty}
                      variant="secondary"
                      size="sm"
                      withGlow={false}
                      className="pg-tag !gap-0"
                    >
                      {specialty}
                    </VokDevBadge>
                  ))}
                </div>
                <div className="mb-5 flex w-full justify-around gap-4 border-y border-border/40 py-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-foreground">{member.projects}</div>
                    <p className="pg-stat-label">Projects</p>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-foreground">{member.followers}</div>
                    <p className="pg-stat-label">Followers</p>
                  </div>
                </div>
                <VokDevButton variant="secondary" size="sm" className="w-full">
                  View Profile
                </VokDevButton>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
