import { useState } from "react"

import { Modal } from "@/components/common/modal"
import { TeamMember } from "@/components/common/team-member"

import type { ParsedTeamData } from "@/queries/fetch-team-data"

type TeamMemberData = ParsedTeamData["team"][number]

interface TeamProps {
  team: TeamMemberData[]
}

export function Team({ team }: TeamProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMemberData>()

  return (
    <>
      <div className="-m-8 flex flex-wrap md:-m-6 lg:-m-8">
        {team.map(member => (
          <TeamMember
            key={member.name}
            member={member}
            onSelect={() => setSelectedMember(member)}
          />
        ))}
      </div>

      <Modal show={!!selectedMember} onClose={() => setSelectedMember(undefined)}>
        <TeamMember member={selectedMember} fluid dark />
      </Modal>
    </>
  )
}
