import React, { useState, useEffect } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import classNames from "classnames"

import classes from "@styles/components/landing/RoadmapCarousel.module.scss"
import { ReactComponent as ArrowDown } from "@images/icons/arrow-down.svg"

import { Milestone } from "@definitions/app"
import { smoothScrollBy } from "@utils/scroll"

type RoadmapCarouselProps = {
  milestones: Milestone[]
}

const RoadmapCarousel: React.FC<RoadmapCarouselProps> = ({ milestones }) => {
  const [currentIndex, setCurrentIndex] = useState(milestones.findIndex(m => m.completion === "ongoing") ?? 0)
  const [listEl, setListEl] = useState<HTMLOListElement>()

  useEffect(() => {
    if (listEl) {
      listEl.scrollTop = currentIndex * 192
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listEl])

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
    const scroll = index * 192
    smoothScrollBy(container, {
      top: scroll - container.scrollTop,
      duration: 500
    })
  }

  return (
    <div className={classes.roadmapCarousel}>
      <div className={classes.roadmapCarouselMap}></div>
      <div className={classes.roadmapCarouselWrapper}>
        <ol className={classes.roadmapCarouselItems} ref={el => el && setListEl(el)}>
          {milestones.map((milestone, i) => (
            <li
              className={classNames(classes.roadmapCarouselItem, {
                [classes.visible]: i === currentIndex - 1 || i === currentIndex + 1,
                [classes.active]: i === currentIndex,
              })}
              key={milestone.title}
            >
              <div className={classes.roadmapCarouselItemPhoto}>
                {milestone.image && (
                  <GatsbyImage image={milestone.image} objectFit="cover" alt={milestone.title} />
                )}
              </div>
              <div className={classes.roadmapCarouselItemDetails}>
                <span className={classes.roadmapCarouselItemPhase}>Phase {i + 1}</span>
                <span className={classes.roadmapCarouselItemTitle}>{milestone.title}</span>
                <span className={classes.roadmapCarouselItemSubtitle}>{milestone.subtitle}</span>
                <button className={classes.roadmapCarouselItemLink}>details</button>
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
