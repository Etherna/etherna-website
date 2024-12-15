import React from "react"

import { Image } from "../common/image"
import { RichText } from "../common/rich-text"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { BaseBlock } from "./base-block"
import { cn } from "@/lib/utils"

import type { Page } from "@payload-types"

export function HeroBlock({
  type,
  backgroundImage,
  badges,
  title,
  description,
  links,
  media,
}: Page["hero"]) {
  return (
    <BaseBlock
      className="bg-card pt-24 reset-current-bg-card"
      blockType={"hero"}
      background={{
        type: "image",
        backgroundImage: backgroundImage,
      }}
      spacing="none"
    >
      <div
        className={cn("container flex flex-col gap-4", {
          "lg:flex-row lg:items-center": type !== "highImpact",
          "gap-8 py-12": type === "highImpact",
          "py-6": type === "mediumImpact",
          "pb-4": type === "lowImpact" || type === "none",
        })}
      >
        <div
          className={cn("flex flex-col lg:flex-1", {
            "gap-8 md:gap-12 xl:gap-16": type === "highImpact",
            "gap-6 md:gap-10 xl:gap-14": type === "mediumImpact",
            "gap-4 md:gap-6 xl:gap-10": type === "lowImpact" || type === "none",
          })}
        >
          <div className="flex flex-col gap-4">
            <div
              className={cn("flex w-full flex-wrap items-center gap-3", {
                "justify-center": type === "highImpact",
              })}
            >
              {badges?.map((badge, i) => (
                <Badge
                  key={i}
                  className="border-0 p-0.5 text-foreground"
                  asChild
                  style={{
                    backgroundImage:
                      "linear-gradient(35deg, #3acfd5 0%, #d59a3a 50%, #853ad5 100%)",
                  }}
                >
                  <a href={badge.link.url ?? ""}>
                    <span className="rounded-full bg-current-background px-2 py-0.5 transition-colors duration-300 hover:bg-transparent hover:text-white">
                      {badge.link.label}
                    </span>
                  </a>
                </Badge>
              ))}
            </div>
            <h1
              className={cn("font-bold text-gradient", {
                "max-w-screen-sm": type !== "highImpact",
                "text-center text-4xl/none xs:text-5xl/none md:text-7xl/none":
                  type === "highImpact",
                "text-2xl/none xs:text-4xl/none md:text-6xl/none": type === "mediumImpact",
                "text-2xl/none xs:text-3xl/none md:text-4xl/none":
                  type === "lowImpact" || type === "none",
              })}
            >
              {title}
            </h1>
          </div>

          <div
            className={cn("w-full max-w-screen-sm text-secondary-foreground", {
              "mx-auto text-center": type === "highImpact",
            })}
          >
            <RichText nodes={description?.root.children ?? []} />
          </div>

          <div
            className={cn("flex flex-wrap gap-4", {
              "mx-auto justify-center": type === "highImpact",
            })}
          >
            {links?.map(({ link }, i) => (
              <Button
                key={i}
                className="min-w-28"
                variant={link.appearance}
                size={type === "highImpact" ? "lg" : "default"}
                asChild
              >
                <a href={link.url ?? ""}>{link.label}</a>
              </Button>
            ))}
          </div>
        </div>

        {typeof media === "object" &&
          media?.bundled?.image &&
          (type === "highImpact" || type === "mediumImpact") && (
            <div
              className={cn({
                "lg:w-1/3": type === "mediumImpact",
              })}
            >
              <Image className="w-full" image={media.bundled.image} />
            </div>
          )}
      </div>
    </BaseBlock>
  )
}