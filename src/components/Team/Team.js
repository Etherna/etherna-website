import React, { useState } from "react"
import PropTypes from "prop-types"
import { GatsbyImage } from "gatsby-plugin-image"

import "./team.scss"
import Modal from "@components/Modal"
import Markdown from "@components/Markdown"
import { parseFluidImage } from "@utils/dataParser"

const Team = ({ team }) => {
  const [selectedMember, setSelectedMember] = useState()

  return (
    <>
      <div className="team">
        {team.map(member => (
          <div className="team-member-wrapper" key={member.name}>
            <div
              className="team-member"
              role="button"
              tabIndex={0}
              onKeyDown={() => { }}
              onClick={() => setSelectedMember(member)}
            >
              <div className="team-member-photo">
                <div>
                  <GatsbyImage image={parseFluidImage(member.photo)} objectFit="cover" alt={member.name ?? ""} />
                </div>
              </div>
              <h2 className="team-member-name">{member.name}</h2>
              <p className="team-member-role">{member.role}</p>
            </div>
          </div>
        ))}
      </div>

      <Modal show={!!selectedMember} onClose={() => setSelectedMember(undefined)}>
        <div className="team-member-wrapper fluid dark">
          <div className="team-member">
            <div className="team-member-photo">
              <div>
                <GatsbyImage image={parseFluidImage(selectedMember?.photo)} objectFit="cover" alt={selectedMember?.name ?? ""} />
              </div>
            </div>
            <h2 className="team-member-name">{selectedMember?.name}</h2>
            <p className="team-member-role">{selectedMember?.role}</p>
            {selectedMember?.bio && (
              <Markdown className="team-member-bio" rawMarkdown={selectedMember.bio} forceNewLine />
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}

Team.propTypes = {
  team: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string,
    bio: PropTypes.string,
    photo: PropTypes.object,
  })),
}

export default Team
