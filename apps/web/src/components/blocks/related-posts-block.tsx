import { Image } from "../common/image"
import { RichText } from "../common/rich-text"
import {
  TextColumns,
  TextColumnsContentColumn,
  TextColumnsDescription,
  TextColumnsMainColumn,
  TextColumnsSubtitle,
  TextColumnsTitle,
} from "../layout/text-columns"
import { BaseBlock } from "./base-block"
import { localized } from "@/i18n/utils"
import { hasBundledImage } from "@/lib/bundle"
import { isNotEmptyLexical } from "@/lib/lexical"
import { route } from "@/lib/routes"
import { cn, getInnerTag } from "@/lib/utils"

import type { BlockProps } from "./base-block"
import type { Post, RelatedPostsBlock } from "@payload-types"

export function RelatedPostsBlock({
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
  relatedPosts,
  locale,
}: BlockProps<RelatedPostsBlock>) {
  const InnerTag = getInnerTag(heading)
  const posts = (relatedPosts || []) as Post[]

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
        <TextColumnsContentColumn inlineSize={"lg"}>
          <ul
            className={cn("grid grid-cols-2 gap-x-4 gap-y-8", {
              "md:grid-cols-3": centered,
            })}
          >
            {posts.map((post, index) => (
              <li key={index} className="w-full">
                <a
                  href={localized(route("/blog/:slug", { slug: post.slug ?? "" }), locale)}
                  className="flex w-full flex-col gap-2 text-center"
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-md border">
                    {hasBundledImage(post.thumbnail) && (
                      <Image
                        className="absolute inset-0 h-full w-full object-cover"
                        image={post.thumbnail.bundled.image}
                      />
                    )}
                  </div>

                  <InnerTag className="text-left text-base/tight font-semibold text-secondary-foreground">
                    {post.title}
                  </InnerTag>
                </a>
              </li>
            ))}
          </ul>
        </TextColumnsContentColumn>
      </TextColumns>
    </BaseBlock>
  )
}
