import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import { ReactComponent as CheckIcon } from "@/assets/icons/check.svg"
import { ReactComponent as ClockIcon } from "@/assets/icons/clock.svg"
import { ReactComponent as FlagIcon } from "@/assets/icons/flag.svg"
import { ReactComponent as RoadmapTitleBg } from "@/assets/roadmap-title-bg.svg"

import RoadmapCarousel from "./RoadmapCarousel"
import SectionTitle from "./SectionTitle"
import Col from "@/components/common/Col"
import Container from "@/components/common/Container"
import Image from "@/components/common/Image"
import Markdown from "@/components/common/Markdown"
import Modal from "@/components/common/Modal"
import Prose from "@/components/common/Prose"
import Row from "@/components/common/Row"
import classNames from "@/utils/classnames"

import type { Milestone } from "@/schema/app"

type RoadmapProps = {
  milestones: Milestone[]
}

const Roadmap: React.FC<RoadmapProps> = ({ milestones }) => {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone>()
  const { t } = useTranslation("roadmap")

  const hideRoadmapPhotos = milestones.some(milestone => !milestone.image)

  return (
    <section className="py-16" id="roadmap">
      <Container>
        <Row>
          <Col>
            <div className="relative flex items-center justify-center">
              <RoadmapTitleBg className="absolute inset-0 h-full w-full" />
              <SectionTitle
                className="relative my-auto bg-no-repeat text-center text-4xl"
                title={t("roadmap")}
                anchorLink="roadmap"
              />
            </div>

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
          <div className="flex flex-col items-center text-gray-100">
            <div className="relative h-20 w-20 rounded-full bg-gray-700/25 sm:h-28 sm:w-28 lg:h-36 lg:w-36">
              {!hideRoadmapPhotos && selectedMilestone.image && (
                <Image className="overflow-hidden rounded-full" data={selectedMilestone.image} />
              )}

              <span
                className={classNames(
                  "absolute top-2 right-8 ml-3 flex h-8 w-8 translate-x-full whitespace-nowrap rounded-full text-xs font-bold text-white",
                  {
                    "bg-green-500": selectedMilestone.completion === "done",
                    "bg-blue-500": selectedMilestone.completion === "ongoing",
                    "bg-gray-700": selectedMilestone.completion === "todo",
                  }
                )}
              >
                {selectedMilestone.completion === "done" && (
                  <CheckIcon className="m-auto h-5 w-5" aria-hidden />
                )}
                {selectedMilestone.completion === "ongoing" && (
                  <ClockIcon className="m-auto h-5 w-5" aria-hidden />
                )}
                {selectedMilestone.completion === "todo" && (
                  <FlagIcon className="m-auto h-5 w-5" aria-hidden />
                )}
              </span>
            </div>

            <span className="mt-3 text-2xl font-semibold tracking-tight md:text-4xl">
              {selectedMilestone.title}
            </span>
            <span className="mt-1 text-sm font-semibold tracking-tight text-gray-400">
              {selectedMilestone.subtitle}
            </span>
            <span
              className={classNames("mt-2 whitespace-nowrap text-sm font-bold text-white", {
                "text-green-500": selectedMilestone.completion === "done",
                "text-blue-500": selectedMilestone.completion === "ongoing",
                "text-gray-700": selectedMilestone.completion === "todo",
              })}
            >
              {selectedMilestone.completion_quarter}
            </span>
            <Prose>
              <article>
                <Markdown
                  className={classNames(
                    "mx-auto mt-6 max-w-[30rem] pb-6 text-justify text-gray-300",
                    "[&_:is(h1,h2,h3,h4,h5,h6)]:text-center [&_:is(h1,h2,h3,h4,h5,h6)]:text-white"
                  )}
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
