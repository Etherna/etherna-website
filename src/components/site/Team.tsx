import React, { useState } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import classNames from "classnames"

import classes from "@styles/components/site/Team.module.scss"

import Modal from "@components/common/Modal"
import Markdown from "@components/common/Markdown"
import useLocale from "@context/locale-context/hooks/useLocale"
import { TeamMember } from "@definitions/app"
import { useTranslations } from "@hooks/useTranslations"

type TeamProps = {
  team: TeamMember[]
}

const Team: React.FC<TeamProps> = ({ team }) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember>()
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "about")

  return (
    <>
      <div className={classes.team}>
        {team.map(member => (
          <div className={classes.teamMemberWrapper} key={member.name}>
            <div
              className={classes.teamMember}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedMember(member)}
            >
              <div className={classes.teamMemberPhoto}>
                <div>
                  <GatsbyImage image={member.photo} objectFit="cover" alt={member.name ?? ""} />
                </div>
              </div>
              <h2 className={classes.teamMemberName}>{member.name}</h2>
              <p className={classes.teamMemberRole}>{member.role}</p>
              {member.bio && (
                <Markdown className={classes.teamMemberBio} rawMarkdown={member.bio} forceNewLine />
              )}
              <div className={classes.teamShowMore}>﹢ {t`showMore`}</div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={!!selectedMember} onClose={() => setSelectedMember(undefined)}>
        <div className={classNames(classes.teamMemberWrapper, classes.fluid, "dark")}>
          <div className={classes.teamMember}>
            <div className={classes.teamMemberPhoto}>
              <div>
                {selectedMember?.photo && (
                  <GatsbyImage image={selectedMember.photo} objectFit="cover" alt={selectedMember?.name ?? ""} />
                )}
              </div>
            </div>
            <h2 className={classes.teamMemberName}>{selectedMember?.name}</h2>
            <p className={classes.teamMemberRole}>{selectedMember?.role}</p>
            {selectedMember?.bio && (
              <Markdown className={classes.teamMemberBio} rawMarkdown={selectedMember.bio} forceNewLine />
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Team
