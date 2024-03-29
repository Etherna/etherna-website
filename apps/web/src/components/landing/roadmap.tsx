import { useState } from "react"
import { useTranslation } from "react-i18next"

import { CheckIcon, ClockIcon, FlagIcon } from "lucide-react"
import { RoadmapTitleBg } from "@/components/assets/landing"

import { RoadmapCarousel } from "./roadmap-carousel"
import { SectionTitle } from "./section-title"
import { Col } from "@/components/common/col"
import { Container } from "@/components/common/container"
import { Image } from "@/components/common/image"
import { Markdown } from "@/components/common/markdown"
import { Modal } from "@/components/common/modal"
import { Prose } from "@/components/common/prose"
import { Row } from "@/components/common/row"
import { cn } from "@/utils/classnames"

import type { ParsedMilestone } from "@/queries/fetch-home-data"

interface RoadmapProps {
  milestones: ParsedMilestone[]
}

export function Roadmap({ milestones }: RoadmapProps) {
  const [selectedMilestone, setSelectedMilestone] = useState<ParsedMilestone>()
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
                className={cn(
                  "absolute right-8 top-2 ml-3 flex h-8 w-8 translate-x-full whitespace-nowrap rounded-full text-xs font-bold text-white",
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
              className={cn("mt-2 whitespace-nowrap text-sm font-bold text-white", {
                "text-green-500": selectedMilestone.completion === "done",
                "text-blue-500": selectedMilestone.completion === "ongoing",
                "text-gray-700": selectedMilestone.completion === "todo",
              })}
            >
              {selectedMilestone.completionQuarter}
            </span>
            <Prose>
              <article>
                <Markdown
                  className={cn(
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
