import React, { useState } from "react"
import PropTypes from "prop-types"
import { GatsbyImage } from "gatsby-plugin-image"

import "./team.scss"

import Modal from "@components/Modal"
import Markdown from "@components/Markdown"
import classNames from "classnames"
import { useTranslations } from "@utils/useTranslations"
import { useLocale } from "@utils/localizedPage"

/**
 * @param {object} param0
 * @param {import('@utils/dataParser').TeamMember[]} param0.team
 * @param {boolean} param0.abtest
 */
const Team = ({ team, abtest }) => {
  const [selectedMember, setSelectedMember] = useState()
  const [locale] = useLocale()
  const t = useTranslations(locale, "about")

  return (
    <>
      <div className={classNames("team", { abtest })}>
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
                  <GatsbyImage image={member.photo} objectFit="cover" alt={member.name ?? ""} />
                </div>
              </div>
              <h2 className="team-member-name">{member.name}</h2>
              <p className="team-member-role">{member.role}</p>
              {member.bio && (
                <Markdown className="team-member-bio" rawMarkdown={member.bio} forceNewLine />
              )}
              <div className="team-show-more">﹢ {t`showMore`}</div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={!!selectedMember} onClose={() => setSelectedMember(undefined)}>
        <div className="team-member-wrapper fluid dark">
          <div className="team-member">
            <div className="team-member-photo">
              <div>
                {selectedMember?.photo && (
                  <GatsbyImage image={selectedMember.photo} objectFit="cover" alt={selectedMember?.name ?? ""} />
                )}
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
  abtest: PropTypes.bool,
}

export default Team
