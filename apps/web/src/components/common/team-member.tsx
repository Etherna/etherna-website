import { useTranslation } from "react-i18next"

import { Image } from "./image"
import { Markdown } from "./markdown"
import { cn } from "@/utils/classnames"

import type { TeamMember as TeamMemberType } from "@/schema/app"

interface TeamMemberProps {
  member: TeamMemberType | undefined
  fluid?: boolean
  dark?: boolean
  onSelect?: () => void
}

export function TeamMember({ member, fluid, dark, onSelect }: TeamMemberProps) {
  const { t } = useTranslation("about")

  return (
    <div
      className={cn("w-full p-8 md:p-6 lg:p-8", {
        "sm:w-1/2": !fluid,
        dark,
      })}
    >
      <button
        className={cn(
          "group relative grid w-full gap-x-2 pb-3 focus:outline-none md:gap-x-4",
          "grid-cols-[fit-content(40%)_auto] grid-rows-[auto_auto_auto_auto] lg:grid-rows-[auto_auto_1fr]",
          {
            "cursor-pointer": !!onSelect,
          }
        )}
        onClick={onSelect}
      >
        <div
          className={cn(
            "relative col-span-1 col-start-1 row-span-3 row-start-1 min-w-[5rem] md:min-w-xxs lg:self-start",
            "before:block before:pb-[100%]",
            {
              "max-w-52": fluid,
            }
          )}
        >
          <div className="transform-[translateZ(0)] absolute inset-0 overflow-hidden rounded-xl">
            {member?.photo && (
              <Image
                data={member.photo}
                className={cn("object-cover object-top", {
                  "transition-transform duration-500 ease-out group-hover:scale-105": !!onSelect,
                })}
              />
            )}
          </div>
        </div>
        <h2
          className={cn(
            "col-span-1 col-start-2 row-span-1 row-start-1 mb-0 mt-2",
            "text-xl font-semibold leading-none text-gray-900 dark:text-gray-100"
          )}
        >
          {member?.name}
        </h2>
        <p
          className={cn(
            "col-span-1 col-start-2 row-span-1 row-start-2 mt-2",
            "leading-tight text-gray-400 dark:text-gray-400"
          )}
        >
          {member?.role}
        </p>
        {member?.bio && (
          <Markdown
            className={cn(
              "relative col-span-full col-start-1 row-span-1 row-start-4 mt-3 overflow-hidden",
              "lg:col-span-1 lg:col-start-2 lg:row-start-3",
              "text-xs text-gray-500 dark:text-gray-300 sm:text-sm lg:text-base",
              {
                "max-h-[calc(4*1.5em)]": !fluid,
                "max-h-full": fluid,
              },
              !fluid && [
                "after:absolute after:inset-x-0 after:bottom-0 after:block after:h-10 after:bg-gradient-to-t after:from-gray-100",
              ]
            )}
            rawMarkdown={member.bio}
            forceNewLine
          />
        )}
        {!fluid && (
          <div
            className={cn(
              "col-span-full col-start-1 row-span-1 row-start-4 -mb-6 self-end justify-self-start rounded py-1",
              "lg:col-span-1 lg:col-start-2 lg:row-start-3 lg:mb-2 lg:translate-y-2 lg:px-1",
              "bg-gray-100 text-sm font-semibold text-gray-500",
              "lg:opacity-0 lg:transition lg:duration-300",
              "group-hover:lg:translate-y-0 group-hover:lg:opacity-100"
            )}
          >
            ﹢ {t("showMore")}
          </div>
        )}
      </button>
    </div>
  )
}
