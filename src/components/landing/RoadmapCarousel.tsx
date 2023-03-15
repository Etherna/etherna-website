import React, { useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"

import classes from "@/styles/components/landing/RoadmapCarousel.module.scss"

import RoadmapNav from "./RoadmapNav"
import Image from "@/components/common/Image"
import { ReactComponent as ArrowDown } from "@/images/icons/arrow-down.svg"
import classNames from "@/utils/classnames"
import { smoothScrollBy } from "@/utils/scroll"

import type { Milestone } from "@/utils/schemas"

type RoadmapCarouselProps = {
  milestones: Milestone[]
  hidePhotos?: boolean
  onSelectMilestone?(milestone: Milestone): void
}

const RoadmapCarousel: React.FC<RoadmapCarouselProps> = ({
  milestones,
  hidePhotos,
  onSelectMilestone,
}) => {
  const { t } = useTranslation("roadmap")
  const [currentIndex, setCurrentIndex] = useState(
    milestones.findIndex(m => m.completion === "ongoing") ?? 0
  )
  const [listEl, setListEl] = useState<HTMLOListElement>()
  const timer = useRef<number>()

  useEffect(() => {
    if (listEl) {
      window.addEventListener("resize", onResize)
      window.addEventListener("fullscreenchange", onResize)

      scrollToIndex(currentIndex)

      onResize()
    }

    return () => {
      window.removeEventListener("resize", onResize)
      window.removeEventListener("fullscreenchange", onResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listEl])

  const onResize = () => {
    timer.current = setTimeout(() => {
      scrollToIndex(currentIndex)
    }, 500) as unknown as number
  }

  const previuos = () => {
    const index = currentIndex - 1
    setCurrentIndex(index)
    scrollToIndex(index)
  }

  const next = () => {
    const index = currentIndex + 1
    setCurrentIndex(index)
    scrollToIndex(index)
  }

  const scrollToIndex = (index: number) => {
    const container = listEl!
    const itemSize = container.querySelector<HTMLLIElement>("li")!.clientHeight
    const scroll = index * itemSize
    smoothScrollBy(container, {
      top: scroll - container.scrollTop,
      duration: 500,
    })
  }

  return (
    <div className={classes.roadmapCarousel}>
      <div className={classes.roadmapCarouselMap}>
        <RoadmapNav
          latitude={milestones[currentIndex]!.latitude}
          longitude={milestones[currentIndex]!.longitude}
          startLongitude={milestones[0]!.longitude}
        />
      </div>
      <div className={classes.roadmapCarouselWrapper}>
        <ol className={classes.roadmapCarouselItems} ref={el => el && setListEl(el)}>
          {milestones.map((milestone, i) => (
            <li
              className={classNames(classes.roadmapCarouselItem, {
                [classes.visible]: i === currentIndex - 1 || i === currentIndex + 1,
                [classes.active]: i === currentIndex,
                [classes.done]: milestone.completion === "done",
                [classes.ongoing]: milestone.completion === "ongoing",
                [classes.todo]: milestone.completion === "todo",
              })}
              key={milestone.title}
            >
              {hidePhotos !== true && (
                <div className={classes.roadmapCarouselItemPhoto}>
                  {milestone.image && <Image data={milestone.image} />}
                </div>
              )}
              <div className={classes.roadmapCarouselItemDetails}>
                <span className={classes.roadmapCarouselItemInfo}>
                  <span className={classes.roadmapCarouselItemPhase}>
                    {t`phase`} {i + 1}
                  </span>
                  <span className={classes.roadmapCarouselItemQuarter}>
                    {milestone.completion_quarter}
                  </span>
                  <span className={classes.roadmapCarouselItemBadge}>
                    {t(
                      milestone.completion_quarter === "n.d." ? "unscheduled" : milestone.completion
                    )}
                  </span>
                </span>
                <span className={classes.roadmapCarouselItemTitle}>{milestone.title}</span>
                <span className={classes.roadmapCarouselItemSubtitle}>{milestone.subtitle}</span>
                <button
                  className={classes.roadmapCarouselItemLink}
                  onClick={() => onSelectMilestone?.(milestone)}
                >
                  {t`details`}
                </button>
              </div>
            </li>
          ))}
        </ol>

        <div className={classes.roadmapCarouselNav}>
          <button
            className={classNames(classes.roadmapCarouselNavBtn, classes.prev)}
            onClick={previuos}
            disabled={currentIndex === 0}
          >
            <ArrowDown />
          </button>
          <button
            className={classes.roadmapCarouselNavBtn}
            onClick={next}
            disabled={currentIndex === milestones.length - 1}
          >
            <ArrowDown />
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoadmapCarousel
