import { ArrowRightIcon, MailIcon } from "lucide-react"

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { ScrollArea } from "../ui/scroll-area"
import { BaseBlock } from "./base-block"
import { isNotEmptyLexical } from "@/lib/lexical"
import { cn, getInnerTag } from "@/lib/utils"

import type { BlockProps } from "./base-block"
import type { Job, JobsBlock } from "@payload-types"

export function JobsBlock({
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
  jobs,
}: BlockProps<JobsBlock> & { jobs?: Job[] }) {
  const InnerTag = getInnerTag(heading)

  const applyForJob = (job: Job) => {
    const subject = `Application for ${job.name}`
    const body = [
      "Hello,",
      `my name is <YOUR_NAME_HERE> and I am writing to apply for the position of ${job.name} (id: '${job.id}').`,
      "",
      "====== Presentation ======",
      "",
      "<write a brief presentation about you>",
      "",
      "",
    ].join("\n")

    const a = document.createElement("a")
    a.href = `mailto:jobs@etherna.io?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    a.click()
  }

  return (
    <BaseBlock blockId={id} blockType={blockType} background={background}>
      <TextColumns
        className="gap-6 md:gap-8 lg:gap-10"
        centered={centered ?? false}
        inline={!forceFullWidth && !centered}
      >
        <TextColumnsMainColumn>
          {subtitle && (
            <TextColumnsSubtitle size={titleSize ?? "default"}>{subtitle}</TextColumnsSubtitle>
          )}

          {title && (
            <TextColumnsTitle tag={heading} size={titleSize ?? "sm"}>
              {title}
            </TextColumnsTitle>
          )}

          {isNotEmptyLexical(text) && (
            <TextColumnsDescription>
              <RichText nodes={text.root.children} />
            </TextColumnsDescription>
          )}
        </TextColumnsMainColumn>
        <TextColumnsContentColumn className="max-w-lg">
          <ul className="flex flex-col gap-8 text-left">
            {jobs?.map((job) => (
              <li
                key={job.id}
                className="group/job flex rounded-t-xl bg-gradient-to-b from-muted to-transparent p-px"
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="flex h-auto grow items-center rounded-t-lg bg-transparent bg-gradient-to-b from-card to-card/10 p-6 py-3 pb-6 hover:bg-transparent"
                      variant={"ghost"}
                    >
                      <div className="flex flex-1 flex-col items-start gap-2">
                        <div className="flex w-full flex-wrap items-baseline gap-3">
                          <InnerTag className="text-base font-semibold">{job.name}</InnerTag>
                          <p className="text-sm text-muted-foreground">{job.location}</p>
                        </div>
                        {job.salary && (
                          <p className="text-sm text-muted-foreground">{job.salary}/year</p>
                        )}
                      </div>
                      <ArrowRightIcon className="size-4 shrink-0 text-muted-foreground/50 transition-all duration-300 group-hover/job:-rotate-[30deg] group-hover/job:scale-110 group-hover/job:text-foreground" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Open position: {job.name}</DialogTitle>
                      <DialogDescription>{job.location}</DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="prose mt-8 max-h-[80vh] text-sm lg:max-h-[60vh]">
                      <RichText nodes={job.description?.root.children ?? []} />
                    </ScrollArea>
                    <DialogFooter>
                      <Button onClick={() => applyForJob(job)}>
                        <MailIcon className="mr-2 size-4" />
                        Apply
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </li>
            ))}
          </ul>

          {!jobs?.length && (
            <p
              className={cn("text-base font-medium text-muted-foreground", {
                "mx-auto text-center": centered,
              })}
            ></p>
          )}
        </TextColumnsContentColumn>
      </TextColumns>
    </BaseBlock>
  )
}
