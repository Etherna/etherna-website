import { useId } from "react"

import { QuoteIcon } from "lucide-react"

import { Image } from "../common/image"
import { RichText } from "../common/rich-text"
import { Svg } from "../common/svg"
import {
  TextColumns,
  TextColumnsDescription,
  TextColumnsMainColumn,
  TextColumnsSubtitle,
  TextColumnsTitle,
} from "../layout/text-columns"
import { Avatar, AvatarFallback } from "../ui/avatar"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"
import { BaseBlock } from "./base-block"
import { blurHashToDataURL } from "@/lib/blurhash"
import { hasBundledImage } from "@/lib/bundle"
import { isNotEmptyLexical } from "@/lib/lexical"
import { cn } from "@/lib/utils"

import type { BlockProps } from "./base-block"
import type { TestimonialsBlock } from "@payload-types"

export function TestimonialsBlock({
  id,
  blockType,
  title,
  subtitle,
  text,
  background,
  heading,
  centered,
  forceFullWidth,
  titleSize,
  items,
}: BlockProps<TestimonialsBlock>) {
  const elementId = useId()

  return (
    <BaseBlock blockId={id} blockType={blockType} background={background}>
      <TextColumns centered={centered ?? false} inline={!forceFullWidth && !centered}>
        <TextColumnsMainColumn>
          {subtitle && (
            <TextColumnsSubtitle size={titleSize ?? "default"}>{subtitle}</TextColumnsSubtitle>
          )}

          {title && (
            <TextColumnsTitle tag={heading} size={titleSize ?? "lg"}>
              {title}
            </TextColumnsTitle>
          )}

          {isNotEmptyLexical(text) && (
            <TextColumnsDescription>
              <RichText nodes={text.root.children} />
            </TextColumnsDescription>
          )}
        </TextColumnsMainColumn>
      </TextColumns>

      <Carousel
        className="mt-8 lg:mt-12 xl:mt-16"
        opts={{
          loop: true,
          align: "center",
        }}
      >
        <CarouselContent className="ml-0.5 pb-10 md:pb-16">
          {items?.map((testimonial, index) => {
            const gradientId = `${elementId}_TestimonialGradient_${index}`
            return (
              <CarouselItem
                key={index}
                className={cn(
                  "basis-3/4 px-2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6",
                  {
                    "group/testimonial": !!testimonial.link?.url,
                  },
                )}
              >
                <div className="flex overflow-hidden rounded-t-xl bg-gradient-to-b from-muted to-muted/20 p-px text-left">
                  <a
                    className="relative flex w-full flex-col gap-2 rounded-t-lg bg-transparent bg-gradient-to-b from-card to-card/20 p-4 pb-10 md:p-6"
                    href={testimonial.link?.url ?? undefined}
                    target={testimonial.link?.newTab ? "_blank" : undefined}
                  >
                    <div className="absolute inset-0 -z-[1] rounded-lg bg-transparent transition-colors duration-300 group-hover/testimonial:bg-card" />
                    <span className="self-start">
                      <Svg
                        className="size-5 opacity-30 sm:size-7"
                        svg={<QuoteIcon strokeWidth={1} />}
                        defs={<SvgDefs id={gradientId} />}
                        style={{
                          stroke: `url(#${gradientId})`,
                        }}
                      />
                    </span>
                    <div className="prose text-base/tight">
                      <RichText nodes={testimonial.quote?.root.children ?? []} />
                    </div>
                    <div className="mt-3 flex items-start gap-2">
                      {hasBundledImage(testimonial.avatar) && (
                        <Avatar className="size-5 shrink-0">
                          <AvatarFallback
                            className="bg-muted"
                            style={{
                              backgroundImage: testimonial.avatar.bundled.image.blurhash
                                ? `url(${blurHashToDataURL(testimonial.avatar.bundled.image.blurhash)})`
                                : undefined,
                            }}
                          />
                          <Image image={testimonial.avatar.bundled.image} />
                        </Avatar>
                      )}
                      <div className="mt-px text-sm/tight">
                        <span>{testimonial.name}</span>
                        <span className="mx-1.5 text-muted-foreground">–</span>
                        <span className="text-muted-foreground">{testimonial.role}</span>
                      </div>
                    </div>
                  </a>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center justify-center gap-3">
          <CarouselPrevious className="static transform-none" />
          <CarouselNext className="static transform-none" />
        </div>
      </Carousel>
    </BaseBlock>
  )
}

function SvgDefs({ id }: { id: string }) {
  return (
    <>
      <linearGradient id={id} x1="0" x2="1" y1="0" y2="1">
        <stop
          className="transition-all duration-500 stop-color-foreground/20 group-hover/client:stop-color-foreground"
          offset="0%"
        />
        <stop
          className="transition-all duration-500 stop-color-foreground/60 group-hover/client:stop-color-foreground"
          offset="100%"
        />
      </linearGradient>
    </>
  )
}
