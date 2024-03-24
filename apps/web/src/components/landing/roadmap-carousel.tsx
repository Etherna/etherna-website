import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

import { RoadmapNav } from "./roadmap-nav"
import { Image } from "@/components/common/image"
import { cn } from "@/utils/classnames"
import { smoothScrollBy } from "@/utils/scroll"

import type { ButtonHTMLAttributes } from "react"
import type { ParsedMilestone } from "@/queries/fetch-home-data"

interface RoadmapCarouselProps {
  milestones: ParsedMilestone[]
  hidePhotos?: boolean
  onSelectMilestone?: (milestone: ParsedMilestone) => void
}

export function RoadmapCarousel({
  milestones,
  hidePhotos,
  onSelectMilestone,
}: RoadmapCarouselProps) {
  const { t } = useTranslation("roadmap")
  const [currentIndex, setCurrentIndex] = useState(
    milestones.findIndex(m => m.completion === "ongoing")
  )
  const [listEl, setListEl] = useState<HTMLOListElement>()
  const timer = useRef<number>()

  const currentMilestone = milestones[currentIndex]

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
    if (!listEl) return

    const itemSize = listEl.querySelector<HTMLLIElement>("li")?.clientHeight ?? 0
    const scroll = index * itemSize

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    smoothScrollBy(listEl, {
      top: scroll - listEl.scrollTop,
      duration: 500,
    })
  }

  const initialLongiude = milestones[0]?.longitude ?? 0

  return (
    <div className="flex flex-wrap items-center">
      <div className="w-full md:w-1/3 lg:w-2/5">
        {currentMilestone && (
          <RoadmapNav
            latitude={currentMilestone.latitude ?? 0}
            longitude={currentMilestone.longitude ?? 0}
            startLongitude={initialLongiude}
          />
        )}
      </div>
      <div className="relative w-full md:w-2/3 lg:w-3/5">
        <ol
          ref={el => el && setListEl(el)}
          className="h-[30rem] overflow-hidden md:h-[576px] md:pl-6"
        >
          <div className="block h-40 md:h-[192px]" />
          {milestones.map((milestone, i) => (
            <li
              key={milestone.title}
              className={cn(
                "relative flex h-40 origin-left -translate-x-7 scale-0 items-center opacity-0 transition duration-700 md:h-auto",
                {
                  "translate-x-0 scale-50 opacity-30":
                    i === currentIndex - 1 || i === currentIndex + 1,
                  "translate-x-0 scale-100 pr-7 opacity-100 md:translate-x-7": i === currentIndex,
                }
              )}
            >
              {hidePhotos !== true && (
                <div
                  className={cn(
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
                    className={cn("whitespace-nowrap font-bold lg:ml-3", {
                      "text-green-500": milestone.completion === "done",
                      "text-blue-500": milestone.completion === "ongoing",
                      "text-gray-600": milestone.completion === "todo",
                    })}
                  >
                    {milestone.completionQuarter}
                  </span>
                  <span
                    className={cn(
                      "ml-3 whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-bold text-white",
                      {
                        "bg-green-500": milestone.completion === "done",
                        "bg-blue-500": milestone.completion === "ongoing",
                        "bg-gray-600": milestone.completion === "todo",
                      }
                    )}
                  >
                    {t(
                      milestone.completionQuarter === "n.d."
                        ? "unscheduled"
                        : milestone.completion ?? "unscheduled"
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
                  className={cn(
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
          <RoadmapCarouselNavBtn disabled={currentIndex === 0} onClick={previuos}>
            <ArrowUpIcon className="h-5 w-5" strokeWidth={3} />
          </RoadmapCarouselNavBtn>
          <RoadmapCarouselNavBtn disabled={currentIndex === milestones.length - 1} onClick={next}>
            <ArrowDownIcon className="h-5 w-5" strokeWidth={3} />
          </RoadmapCarouselNavBtn>
        </div>
      </div>
    </div>
  )
}

function RoadmapCarouselNavBtn({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
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
