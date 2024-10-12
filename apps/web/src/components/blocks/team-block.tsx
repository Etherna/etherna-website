import { ArrowRightIcon } from "lucide-react"

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
import { Button } from "../ui/button"
import { DialogHeader } from "../ui/dialog"
import { BaseBlock } from "./base-block"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { hasBundledImage } from "@/lib/bundle"
import { isNotEmptyLexical } from "@/lib/lexical"
import { cn, getInnerTag } from "@/lib/utils"

import type { BlockProps } from "./base-block"
import type { TeamBlock } from "@payload-types"

export function TeamBlock({
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
  members,
}: BlockProps<TeamBlock>) {
  const InnerTag = getInnerTag(heading)

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
            className={cn("grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3", {
              "md:grid-cols-3": centered,
            })}
          >
            {members?.map((member, index) => (
              <li
                key={index}
                className="group/member flex overflow-hidden rounded-t-xl bg-gradient-to-b from-muted to-muted/20 p-px"
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="flex h-auto grow items-center overflow-hidden rounded-t-lg bg-transparent bg-gradient-to-b from-card to-card/20 p-2.5 pb-10 hover:bg-transparent"
                      variant={"ghost"}
                    >
                      <div className="flex w-full flex-col gap-3">
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-md">
                          {hasBundledImage(member.photo) && (
                            <Image
                              className="absolute inset-0 h-full w-full object-cover"
                              image={member.photo.bundled.image}
                            />
                          )}
                        </div>
                        <div className="flex flex-col space-y-1 text-left">
                          <InnerTag className="text-lg/tight font-semibold md:text-xl/tight">
                            {member.name}
                          </InnerTag>
                          <p className="flex items-baseline justify-between gap-2 text-sm text-muted-foreground">
                            <span>{member.role}</span>
                            <ArrowRightIcon className="size-4 text-muted-foreground/50 transition-all duration-300 group-hover/member:-rotate-[30deg] group-hover/member:scale-110 group-hover/member:text-foreground" />
                          </p>
                        </div>
                      </div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{member.name}</DialogTitle>
                      <DialogDescription>{member.role}</DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="prose mt-8 max-h-[80vh] text-sm lg:max-h-[60vh]">
                      <RichText nodes={member.bio?.root.children ?? []} />
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </li>
            ))}
          </ul>
        </TextColumnsContentColumn>
      </TextColumns>
    </BaseBlock>
  )
}
