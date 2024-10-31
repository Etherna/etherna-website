import React from "react"

import { Image } from "../common/image"
import { Avatar, AvatarFallback, AvatarList, AvatarListExtraCount } from "../ui/avatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"
import { t } from "@/i18n"
import { blogDictionary } from "@/i18n/dictionaries/blog"
import { hasBundledImage } from "@/lib/bundle"
import { cn } from "@/lib/utils"
import { $locale } from "@/stores/locale-store"

import type { User } from "@payload-types"

interface PostAuthorsProps extends React.ComponentProps<"div"> {
  variant?: "default" | "compact"
  authors: User[]
}

function PostAuthors({ className, variant = "default", authors, ...props }: PostAuthorsProps) {
  const authorsCount = authors.length
  const slicedAuthors = authors.slice(0, 2)
  const excludedAuthorsCount = authorsCount - slicedAuthors.length

  return (
    <div
      className={cn(
        "flex items-center",
        {
          "gap-3": variant === "default",
        },
        className,
      )}
      {...props}
    >
      {variant === "compact" && (
        <>
          <AvatarList>
            {slicedAuthors.map((author, index) => (
              <PostAuthorAvatar key={index} author={author} />
            ))}
            {excludedAuthorsCount > 0 && (
              <AvatarListExtraCount className="size-6 border-2 border-current-background text-2xs font-semibold">
                +{excludedAuthorsCount}
              </AvatarListExtraCount>
            )}
          </AvatarList>

          <span className="ml-1">
            {[
              ...slicedAuthors.map((a) => a.firstName),
              t(blogDictionary.plusOthers, {
                locale: $locale.get() ?? "en",
                count: excludedAuthorsCount,
                params: { count: excludedAuthorsCount },
              }),
            ]
              .filter(Boolean)
              .join(", ")}
          </span>
        </>
      )}
      {variant === "default" &&
        authors.map((author, index) => (
          <HoverCard key={index}>
            <HoverCardTrigger asChild>
              <div className="flex items-center gap-1.5">
                <PostAuthorAvatar author={author} />
                <span>{author.firstName}</span>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="flex flex-col">
              <p className="text-base font-semibold">{author.name}</p>
              <p className="text-sm text-muted-foreground">{author.role}</p>
            </HoverCardContent>
          </HoverCard>
        ))}
    </div>
  )
}

function PostAuthorAvatar({ author }: { author: User }) {
  return (
    <Avatar className="size-6 border-2 border-current-background bg-input text-xs font-semibold">
      {hasBundledImage(author.avatar) ? (
        <Image className="object-cover" image={author.avatar.bundled.image} alt={author.name} />
      ) : (
        <AvatarFallback>{author.name[0]}</AvatarFallback>
      )}
    </Avatar>
  )
}

export { PostAuthors }
