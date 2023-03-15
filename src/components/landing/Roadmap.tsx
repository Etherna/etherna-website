import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import classes from "@/styles/components/landing/Roadmap.module.scss"

import RoadmapCarousel from "./RoadmapCarousel"
import SectionTitle from "./SectionTitle"
import Col from "@/components/common/Col"
import Container from "@/components/common/Container"
import Image from "@/components/common/Image"
import Markdown from "@/components/common/Markdown"
import Modal from "@/components/common/Modal"
import Prose from "@/components/common/Prose"
import Row from "@/components/common/Row"
import { ReactComponent as CheckIcon } from "@/images/icons/check.svg"
import { ReactComponent as ClockIcon } from "@/images/icons/clock.svg"
import { ReactComponent as FlagIcon } from "@/images/icons/flag.svg"
import classNames from "@/utils/classnames"

import type { Milestone } from "@/utils/schemas"

type RoadmapProps = {
  milestones: Milestone[]
}

const Roadmap: React.FC<RoadmapProps> = ({ milestones }) => {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone>()
  const { t } = useTranslation("roadmap")

  const hideRoadmapPhotos = milestones.some(milestone => !milestone.image)

  return (
    <section className={classes.roadmap} id="roadmap">
      <Container>
        <Row>
          <Col>
            <SectionTitle
              className={classNames(classes.roadmapTitle)}
              title={t("roadmap")}
              anchorLink="roadmap"
            />

            <div className="">
              <RoadmapCarousel
                milestones={milestones}
                hidePhotos={hideRoadmapPhotos}
                onSelectMilestone={setSelectedMilestone}
              />
            </div>
          </Col>
        </Row>
      </Container>

      <Modal show={!!selectedMilestone} onClose={() => setSelectedMilestone(undefined)}>
        {selectedMilestone && (
          <div
            className={classNames(classes.roadmapModalContent, {
              [classes.done]: selectedMilestone.completion === "done",
              [classes.ongoing]: selectedMilestone.completion === "ongoing",
              [classes.todo]: selectedMilestone.completion === "todo",
            })}
          >
            <div className={classes.roadmapModalPhoto}>
              {!hideRoadmapPhotos && selectedMilestone.image && (
                <Image data={selectedMilestone.image} />
              )}

              <span className={classes.roadmapModalStatus}>
                {selectedMilestone.completion === "done" && <CheckIcon aria-hidden />}
                {selectedMilestone.completion === "ongoing" && <ClockIcon aria-hidden />}
                {selectedMilestone.completion === "todo" && <FlagIcon aria-hidden />}
              </span>
            </div>

            <span className={classes.roadmapModalTitle}>{selectedMilestone.title}</span>
            <span className={classes.roadmapModalSubtitle}>{selectedMilestone.subtitle}</span>
            <span className={classes.roadmapModalQuarter}>
              {selectedMilestone.completion_quarter}
            </span>
            <Prose>
              <article>
                <Markdown
                  className={classes.roadmapModalDescription}
                  rawMarkdown={selectedMilestone.description}
                />
              </article>
            </Prose>
          </div>
        )}
      </Modal>
    </section>
  )
}

export default Roadmap
