import { useCallback, useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring } from "framer-motion"

import { CheckIcon, ClockIcon, MilestoneIcon } from "lucide-react"

import { Image } from "../common/image"
import { RichText } from "../common/rich-text"
import { TextColumns, TextColumnsMainColumn, TextColumnsTitle } from "../layout/text-columns"
import { AspectRatio } from "../ui/aspect-ratio"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { ScrollArea } from "../ui/scroll-area"
import { BaseBlock } from "./base-block"
import { t } from "@/i18n"
import { milestonesDictionary } from "@/i18n/dictionaries/milestones"
import { hasBundledImage } from "@/lib/bundle"
import { isEmptyLexical } from "@/lib/lexical"
import { cn } from "@/lib/utils"

import type { BlockProps } from "./base-block"
import type { Locale } from "@/i18n/types"
import type { MilestonesBlock } from "@payload-types"

export function MilestonesBlock({
  id,
  blockType,
  title,
  background,
  items,
  type,
  locale,
}: BlockProps<MilestonesBlock>) {
  return (
    <BaseBlock blockId={id} blockType={blockType} background={background}>
      <TextColumns centered={true} inline={false}>
        <TextColumnsMainColumn>
          {title && (
            <TextColumnsTitle tag={"h2"} size={"xs"}>
              {title}
            </TextColumnsTitle>
          )}
        </TextColumnsMainColumn>
      </TextColumns>

      <div
        className={cn("overflow-hidden", {
          "mt-8 lg:mt-12 xl:mt-16": type === "timeline",
          "mt-6 lg:mt-8 xl:mt-10": type === "roadmap",
        })}
      >
        {type === "timeline" && <Milestones items={items} locale={locale} />}
        {type === "roadmap" && <Roadmap items={items} locale={locale} />}
      </div>
    </BaseBlock>
  )
}

function Milestones({ items, locale }: Pick<MilestonesBlock, "items"> & { locale: Locale }) {
  const containerElRef = useRef<HTMLDivElement>(null)
  const scrollerElRef = useRef<HTMLUListElement | null>(null)
  const startPointRef = useRef<[number, number] | null>(null)
  const manualScrollAmountRef = useRef(0)
  const scrollAmountRef = useRef(0)
  const { scrollYProgress } = useScroll({
    target: scrollerElRef as React.RefObject<HTMLUListElement>,
    offset: ["start end", "end start"],
  })

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const scrollAmount = window.innerWidth * 0.5 * v
    scrollAmountRef.current = scrollAmount
    updateScroll()
  })

  const scrollValue = useMotionValue(0)
  const spring = useSpring(scrollValue, {
    bounce: 0,
  })

  const updateScroll = () => {
    scrollValue.set(-scrollAmountRef.current + manualScrollAmountRef.current)
  }

  const onMouseMove = useCallback((event: MouseEvent) => {
    if (!startPointRef.current) return
    const [startX, startTranslateX] = startPointRef.current
    manualScrollAmountRef.current = startTranslateX + event.clientX - startX

    updateScroll()
  }, [])

  const onMouseUp = useCallback(() => {
    document.removeEventListener("mousemove", onMouseMove)
    document.removeEventListener("mouseup", onMouseUp)
  }, [])

  const onMouseDown = (event: React.MouseEvent) => {
    startPointRef.current = [event.clientX, manualScrollAmountRef.current]
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp)
  }

  const onTouchMove = useCallback((event: TouchEvent) => {
    event.preventDefault()
    const touch = event.touches[0]
    if (!touch || !startPointRef.current) return
    const [startX, startTranslateX] = startPointRef.current
    manualScrollAmountRef.current = startTranslateX + touch.clientX - startX

    updateScroll()
  }, [])

  const onTouchEnd = useCallback(() => {
    document.removeEventListener("touchmove", onTouchMove)
    document.removeEventListener("touchend", onTouchEnd)
  }, [])

  const onTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0]
    if (!touch) return
    startPointRef.current = [touch.clientX, manualScrollAmountRef.current]
    document.addEventListener("touchmove", onTouchMove, { passive: false })
    document.addEventListener("touchend", onTouchEnd)
  }

  return (
    <div
      ref={containerElRef}
      className="relative isolate z-0 w-full cursor-grab overflow-hidden transition-transform duration-75"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      <motion.ul
        ref={scrollerElRef}
        className="flex h-64 px-[25vw]"
        style={{
          x: spring,
        }}
      >
        {items.map((milestone, index) => {
          const hasContent = !isEmptyLexical(milestone.text)

          return (
            <li
              key={index}
              className={cn(
                "flex shrink-0 basis-3/4 select-none flex-col gap-y-2 md:basis-[320px]",
                {
                  "flex-col-reverse": index % 2 !== 0,
                },
              )}
              data-current={milestone.status === "active" ? "true" : undefined}
            >
              <div
                className={cn("flex flex-1 flex-col px-4", {
                  "flex-col-reverse": index % 2 !== 0,
                })}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <h3
                      className={cn(
                        "py-1 text-center text-muted-foreground/50 underline-offset-4",
                        {
                          "cursor-pointer hover:underline": hasContent,
                          "font-semibold text-primary": milestone.status === "active",
                          "text-muted-foreground": milestone.status === "completed",
                        },
                      )}
                    >
                      {milestone.title}
                    </h3>
                  </DialogTrigger>

                  {hasContent && <MilestoneDialogContent item={milestone} locale={locale} />}
                </Dialog>
                <div
                  className={cn("mx-auto w-0.5 flex-1 rounded-full bg-muted", {
                    "bg-muted-foreground": milestone.status === "completed",
                    "bg-primary": milestone.status === "active",
                  })}
                />
              </div>
              <div
                className={cn(
                  "mx-auto flex size-5 shrink-0 items-center justify-center rounded-full border border-black/5 bg-muted text-muted-foreground",
                  {
                    "bg-muted-foreground text-muted": milestone.status === "completed",
                    "bg-primary text-primary-foreground": milestone.status === "active",
                  },
                )}
              >
                {milestone.status === "completed" && <CheckIcon className="size-3" />}
                {milestone.status === "active" && <ClockIcon className="size-3" />}
                {milestone.status === "upcoming" && <MilestoneIcon className="size-3" />}
              </div>
              <div
                className={cn("flex flex-1 flex-col", {
                  "flex-col-reverse": index % 2 !== 0,
                })}
              >
                <div
                  className={cn(
                    "mx-auto flex items-center gap-1 rounded-full bg-muted px-1.5 py-px text-xs text-muted-foreground",
                    {
                      "bg-muted-foreground text-muted": milestone.status === "completed",
                      "bg-primary text-primary-foreground": milestone.status === "active",
                    },
                  )}
                >
                  <span>{milestone.date}</span>
                </div>
              </div>
            </li>
          )
        })}
      </motion.ul>

      <div className="absolute left-0 top-1/2 -z-[1] flex w-full -translate-y-1/2 flex-col gap-1">
        <div className="h-px w-full rounded-full bg-muted-foreground/20" />
        <div className="h-px w-full rounded-full bg-muted-foreground" />
        <div className="h-px w-full rounded-full bg-muted-foreground/20" />
      </div>
    </div>
  )
}

function Roadmap({ items, locale }: Pick<MilestonesBlock, "items"> & { locale: Locale }) {
  const [selectedIndex, setSelectedIndex] = useState<number>()
  const [startIndex, setStartIndex] = useState<number>()

  useEffect(() => {
    // fix embla carousel misalignemnt
    setTimeout(() => {
      setStartIndex(
        Math.max(
          0,
          items.findIndex((m) => m.status === "active"),
        ),
      )
    }, 100)
  }, [items])

  return (
    <div>
      <Carousel
        className="relative w-full pt-12"
        opts={{
          startIndex,
          align: "center",
          containScroll: false,
        }}
      >
        <div className="absolute left-1/2 top-0 flex -translate-x-1/2 items-center gap-3">
          <CarouselPrevious className="static transform-none" />
          <CarouselNext className="static transform-none" />
        </div>
        <CarouselContent className="ml-0 gap-0">
          {items.map((milestone, index) => {
            const hasContent = !isEmptyLexical(milestone.text)

            return (
              <CarouselItem
                key={index}
                className="group/milestone basis-3/4 pl-0 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6"
                onMouseEnter={() => setSelectedIndex(index)}
                onMouseLeave={() => setSelectedIndex(undefined)}
              >
                <Dialog onOpenChange={(open) => !open && setSelectedIndex(undefined)}>
                  <DialogTrigger asChild>
                    <AspectRatio
                      className="relative isolate cursor-pointer bg-muted transition-colors duration-300"
                      ratio={0.6}
                    >
                      <motion.div
                        className="absolute inset-x-0 -z-[1] bg-foreground"
                        initial={"initial"}
                        animate={
                          selectedIndex === index
                            ? "visible"
                            : selectedIndex !== undefined
                              ? "hidden"
                              : "initial"
                        }
                        variants={{
                          initial: { height: 0, bottom: 0 },
                          hidden: { height: 0, bottom: "100%", top: 0 },
                          visible: { height: "100%", bottom: 0, top: 0 },
                        }}
                        transition={{ type: "spring", bounce: 0 }}
                      />

                      {hasBundledImage(milestone.media) && (
                        <Image
                          className="absolute -z-[1] h-full w-full object-cover transition-all duration-500 group-hover/milestone:opacity-80 group-hover/milestone:invert"
                          image={milestone.media.bundled.image}
                        />
                      )}

                      <div
                        className={cn("flex flex-col items-center gap-1 px-3 py-6", {
                          dark: selectedIndex === index,
                        })}
                      >
                        <MilestoneStatus status={milestone.status} locale={locale} />
                        <h3 className="text-center font-semibold text-foreground">
                          {milestone.title}
                        </h3>
                        <p className="text-center text-sm text-muted-foreground">
                          {milestone.date}
                        </p>
                      </div>
                    </AspectRatio>
                  </DialogTrigger>

                  {hasContent && <MilestoneDialogContent item={milestone} locale={locale} />}
                </Dialog>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

function MilestoneDialogContent({
  item,
  locale,
}: {
  item: MilestonesBlock["items"][number]
  locale: Locale
}) {
  return (
    <DialogContent className="max-w-2xl overflow-hidden">
      {hasBundledImage(item.media) && (
        <Image
          className="absolute -bottom-[5%] -right-[10%] -top-[15%] -z-[1] h-[120%] w-auto max-w-[50%] object-cover object-top opacity-10"
          image={{
            ...item.media.bundled.image,
            thumbhash: undefined,
          }}
        />
      )}
      <DialogHeader>
        <DialogTitle>
          <span className="mr-3">{item.title}</span>
          <MilestoneStatus status={item.status} locale={locale} />
        </DialogTitle>
        <DialogDescription>{item.date}</DialogDescription>
      </DialogHeader>
      <ScrollArea className="prose mt-4 max-h-[80vh] text-sm lg:max-h-[60vh]">
        <RichText nodes={item.text?.root.children ?? []} />
      </ScrollArea>
    </DialogContent>
  )
}

function MilestoneStatus({
  status,
  locale,
}: {
  status: MilestonesBlock["items"][number]["status"]
  locale: Locale
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-1.5 py-px text-xs font-medium",
        {
          "border-primary text-primary": status === "active",
          "border-muted-foreground text-muted-foreground": status === "completed",
          "border-muted-foreground/50 text-muted-foreground/50": status === "upcoming",
        },
      )}
    >
      {status === "completed" && <CheckIcon className="size-3" />}
      {status === "active" && <ClockIcon className="size-3" />}
      {status === "upcoming" && <MilestoneIcon className="size-3" />}
      <span>{t(milestonesDictionary[status], { locale })}</span>
    </span>
  )
}
