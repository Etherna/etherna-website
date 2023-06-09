import { useState } from "react"
import { useTranslation } from "react-i18next"
import Tippy from "@tippyjs/react"
import dayjs from "dayjs"

import "tippy.js/dist/tippy.css"

import { ReactComponent as VerifiedUserIcon } from "@/assets/icons/verified-user.svg"

import CommentForm from "./CommentForm"
import Image from "@/components/common/Image"
import Markdown from "@/components/common/Markdown"
import classNames from "@/utils/classnames"
import gravatarImage from "@/utils/gravatar"
import { localeInfo } from "@/utils/lang"

import type { PropsWithChildren } from "react"
import type { Comment } from "@/schema/app"
import type { Lang } from "@/utils/lang"

type CommentThreadMessageProps = PropsWithChildren<{
  className?: string
  comment: Comment
  lang: Lang
  showLocale?: boolean
  depth?: number
  hideReplies?: boolean
}>

const CommentThreadMessage: React.FC<CommentThreadMessageProps> = ({
  children,
  className,
  comment,
  lang,
  showLocale,
  depth = 1,
  hideReplies,
}) => {
  const [replyTo, setReplyTo] = useState<Comment>()
  const { t } = useTranslation("blog")

  return (
    <div className={classNames(className)}>
      <div className="mb-4 flex flex-wrap">
        <div className="h-6 w-6 overflow-hidden rounded-full md:h-8 md:w-8">
          {comment.owner?.avatar ? (
            <Image data={comment.owner.avatar} />
          ) : (
            <img src={gravatarImage(comment.email)} alt={comment.name} />
          )}
        </div>
        <div className="flex-1 pl-2">
          <span className="my-0 flex items-center text-xs leading-none text-gray-500">
            {showLocale && (
              <Image
                data={localeInfo(comment.locale)?.flag}
                className="mr-2 inline-block h-3 w-3 rounded-full"
                alt=""
              />
            )}
            <span className="mr-2">
              {comment.owner ? (
                <Tippy content={t("ethernaTeam")}>
                  <span className={classNames("cursor-default font-semibold text-gray-900")}>
                    {comment.owner?.name ?? comment.name}
                    <VerifiedUserIcon className="mx-1 inline-block h-3 w-3 bg-contain bg-center bg-no-repeat" />
                  </span>
                </Tippy>
              ) : (
                <span>{comment.name}</span>
              )}
            </span>
            <span className="text-xs text-gray-600">
              {dayjs(comment.created_on).locale(lang).fromNow()}
            </span>
          </span>

          <span className="mt-1 block leading-none text-gray-900 [&_p]:mb-1 [&_p]:mt-0">
            <Markdown rawMarkdown={comment.comment} />
          </span>

          {!hideReplies && (
            <>
              {/* Disable replies after certain depth */}
              {depth < 3 && !replyTo && (
                <div className="mt-2 w-full text-xs">
                  <a onClick={() => setReplyTo(comment)}>{t`reply`}</a>
                </div>
              )}

              {replyTo && replyTo.id === comment.id && (
                <CommentForm
                  inViewport={true}
                  replyTo={replyTo}
                  lang={lang}
                  onCancel={() => setReplyTo(undefined)}
                />
              )}
            </>
          )}
        </div>
      </div>

      {children}
    </div>
  )
}

export default CommentThreadMessage
