import React, { useState } from "react"

import Modal from "@/components/common/Modal"
import TeamMember from "@/components/common/TeamMember"

import type { TeamMember as TeamMemberType } from "@/schema/app"

type TeamProps = {
  team: TeamMemberType[]
}

const Team: React.FC<TeamProps> = ({ team }) => {
  const [selectedMember, setSelectedMember] = useState<TeamMemberType>()

  return (
    <>
      <div className="-m-8 flex flex-wrap md:-m-6 lg:-m-8">
        {team.map(member => (
          <TeamMember
            member={member}
            onSelect={() => setSelectedMember(member)}
            key={member.name}
          />
        ))}
      </div>

      <Modal show={!!selectedMember} onClose={() => setSelectedMember(undefined)}>
        <TeamMember member={selectedMember} fluid dark />
      </Modal>
    </>
  )
}

export default Team
