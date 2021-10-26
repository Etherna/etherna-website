import React, { useRef, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import classNames from "classnames"

import classes from "@styles/components/landing/Roadmap.module.scss"
import { ReactComponent as CheckIcon } from "@images/icons/check.svg"
import { ReactComponent as ClockIcon } from "@images/icons/clock.svg"
import { ReactComponent as FlagIcon } from "@images/icons/flag.svg"

import RoadmapCarousel from "./RoadmapCarousel"
import Container from "@components/common/Container"
import Row from "@components/common/Row"
import Col from "@components/common/Col"
import Modal from "@components/common/Modal"
import ViewportObserver from "@components/layout/ViewportObserver"
import useLocale from "@context/locale-context/hooks/useLocale"
import { MilestoneNode } from "@definitions/sources"
import { Milestone } from "@definitions/app"
import { parseMilestones } from "@utils/dataParser"
import Markdown from "@components/common/Markdown"
import { useTranslations } from "@hooks/useTranslations"

type RoadmapStaticQuery = {
  milestones: {
    nodes: MilestoneNode[]
  }
}

const Roadmap: React.FC = () => {
  const data = useStaticQuery<RoadmapStaticQuery>(graphql`
    query {
      milestones: allDirectusMilestone {
        nodes {
          localized_contents {
            title
            subtitle
            description
            locale
          }
          image {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  width: 400
                  placeholder: BLURRED
                  formats: [AUTO, WEBP]
                  layout: CONSTRAINED
                )
              }
            }
          }
          completion
          completion_quarter
          latitude
          longitude
        }
      }
    }
  `)
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "roadmap")
  const milestones = parseMilestones(data.milestones.nodes, locale)
  const titleEl = useRef<HTMLHeadingElement>(null)
  const roadmapEl = useRef<HTMLDivElement>(null)
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone>()

  return (
    <section className={classes.roadmap}>
      <Container>
        <Row>
          <Col>
            <ViewportObserver childrenRef={titleEl} viewportClassName="animation-active">
              <h2 className={classNames(classes.roadmapTitle, "fade-in-up", "delay-50")} ref={titleEl}>
                {t`roadmap`}
              </h2>
            </ViewportObserver>

            <ViewportObserver childrenRef={roadmapEl} viewportClassName="animation-active">
              <div className="fade-in-up delay-50" ref={roadmapEl}>
                <RoadmapCarousel milestones={milestones} onSelectMilestone={setSelectedMilestone} />
              </div>
            </ViewportObserver>
          </Col>
        </Row>
      </Container>

      <Modal show={!!selectedMilestone} onClose={() => setSelectedMilestone(undefined)}>
        {selectedMilestone && (
          <div className={classNames(classes.roadmapModalContent, {
            [classes.done]: selectedMilestone.completion === "done",
            [classes.ongoing]: selectedMilestone.completion === "ongoing",
            [classes.todo]: selectedMilestone.completion === "todo",
          })}>
            <div className={classes.roadmapModalPhoto}>
              {selectedMilestone.image && (
                <GatsbyImage image={selectedMilestone.image} objectFit="cover" alt={selectedMilestone.title} />
              )}

              <span className={classes.roadmapModalStatus}>
                {selectedMilestone.completion === "done" && (
                  <CheckIcon aria-hidden />
                )}
                {selectedMilestone.completion === "ongoing" && (
                  <ClockIcon aria-hidden />
                )}
                {selectedMilestone.completion === "todo" && (
                  <FlagIcon aria-hidden />
                )}
              </span>
            </div>

            <span className={classes.roadmapModalTitle}>{selectedMilestone.title}</span>
            <span className={classes.roadmapModalSubtitle}>{selectedMilestone.subtitle}</span>
            <span className={classes.roadmapModalQuarter}>{selectedMilestone.completion_quarter}</span>
            <Markdown className={classes.roadmapModalDescription} rawMarkdown={selectedMilestone.description} />
          </div>
        )}
      </Modal>
    </section>
  )
}

export default Roadmap
