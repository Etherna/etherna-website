import React, { useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"

import { ReactComponent as ArrowDown } from "@/images/icons/arrow-down.svg"

import RoadmapNav from "./RoadmapNav"
import Image from "@/components/common/Image"
import classNames from "@/utils/classnames"
import { smoothScrollBy } from "@/utils/scroll"

import type { ButtonHTMLAttributes } from "react"
import type { Milestone } from "@/schema/app"

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
    <div className="flex flex-wrap items-center">
      <div className="w-full md:w-1/3 lg:w-2/5">
        <RoadmapNav
          latitude={milestones[currentIndex]!.latitude}
          longitude={milestones[currentIndex]!.longitude}
          startLongitude={milestones[0]!.longitude}
        />
      </div>
      <div className="relative w-full md:w-2/3 lg:w-3/5">
        <ol
          className="h-[30rem] overflow-hidden md:h-[576px] md:pl-6"
          ref={el => el && setListEl(el)}
        >
          <div className="block h-40 md:h-[192px]" />
          {milestones.map((milestone, i) => (
            <li
              className={classNames(
                "relative flex h-40 origin-left -translate-x-7 scale-0 items-center opacity-0 transition duration-700 md:h-auto",
                {
                  "translate-x-0 scale-50 opacity-30":
                    i === currentIndex - 1 || i === currentIndex + 1,
                  "translate-x-0 scale-100 pr-7 opacity-100 md:translate-x-7": i === currentIndex,
                }
              )}
              key={milestone.title}
            >
              {hidePhotos !== true && (
                <div
                  className={classNames(
                    "flex-shrink-0 overflow-hidden rounded-full bg-gray-200",
                    `w-[96px] md:w-[192px]`
                  )}
                >
                  {milestone.image && (
                    <Image data={milestone.image} className="overflow-hidden rounded-full" />
                  )}
                </div>
              )}
              <div className="ml-2 flex flex-col md:ml-8">
                <span className="text-sm font-semibold uppercase tracking-tight">
                  <span className="block w-full text-gray-500 lg:inline lg:w-auto">
                    {t`phase`} {i + 1}
                  </span>
                  <span
                    className={classNames("whitespace-nowrap font-bold lg:ml-3", {
                      "text-green-500": milestone.completion === "done",
                      "text-blue-500": milestone.completion === "ongoing",
                      "text-gray-600": milestone.completion === "todo",
                    })}
                  >
                    {milestone.completion_quarter}
                  </span>
                  <span
                    className={classNames(
                      "ml-3 whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-bold text-white",
                      {
                        "bg-green-500": milestone.completion === "done",
                        "bg-blue-500": milestone.completion === "ongoing",
                        "bg-gray-600": milestone.completion === "todo",
                      }
                    )}
                  >
                    {t(
                      milestone.completion_quarter === "n.d." ? "unscheduled" : milestone.completion
                    )}
                  </span>
                </span>
                <span className="mt-3 text-2xl font-semibold tracking-tight md:text-4xl">
                  {milestone.title}
                </span>
                <span className="mt-1 text-sm font-semibold tracking-tight text-gray-700">
                  {milestone.subtitle}
                </span>
                <button
                  className={classNames(
                    "absolute mt-3 inline-block -translate-y-full opacity-0 transition focus:shadow-none focus:outline-none focus:ring-transparent",
                    "text-left font-semibold tracking-tight text-blue-400",
                    {
                      "static translate-y-0 opacity-100 delay-500 duration-300": i === currentIndex,
                      "delay-[0]": i === currentIndex - 1 || i === currentIndex + 1,
                    }
                  )}
                  onClick={() => onSelectMilestone?.(milestone)}
                >
                  {t("details")}
                </button>
              </div>
            </li>
          ))}
          <div className="block h-40 md:h-[192px]" />
        </ol>

        <div className="absolute left-2/3 top-1/2 flex h-full -translate-y-1/2 flex-col items-center justify-between md:h-[384px]">
          <RoadmapCarouselNavBtn
            className="rotate-180"
            onClick={previuos}
            disabled={currentIndex === 0}
          >
            <ArrowDown className="h-5 w-5" strokeWidth={3} />
          </RoadmapCarouselNavBtn>
          <RoadmapCarouselNavBtn onClick={next} disabled={currentIndex === milestones.length - 1}>
            <ArrowDown className="h-5 w-5" strokeWidth={3} />
          </RoadmapCarouselNavBtn>
        </div>
      </div>
    </div>
  )
}

const RoadmapCarouselNavBtn: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={classNames(
        "flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 active:bg-gray-400",
        "text-center text-sm font-semibold text-gray-400",
        "transition-colors duration-75",
        "disabled:pointer-events-none disabled:opacity-30",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default RoadmapCarousel
