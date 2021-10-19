import React, { useState } from "react"
import classNames from "classnames"
import moment from "moment"
import Tippy from "@tippyjs/react"

import classes from "@styles/components/blog/CommentsList.module.scss"
import "tippy.js/dist/tippy.css"

import CommentForm from "./CommentForm"
import Markdown from "@components/common/Markdown"
import useLocale from "@context/locale-context/hooks/useLocale"
import { Comment } from "@definitions/app"
import useLocaleInfo from "@hooks/useLocaleInfo"
import { useTranslations } from "@hooks/useTranslations"
import gravatar from "@utils/gravatar"


type CommentsListProps = {
  comments: Comment[]
  depth?: number
  multiLang: boolean
}

const CommentsList: React.FC<CommentsListProps> = ({ comments, depth = 1, multiLang = false }) => {
  const [locale] = useLocale()
  const [localeInfo] = useLocaleInfo()
  const { t } = useTranslations(locale, "blog")
  const [replyTo, setReplyTo] = useState<Comment>()

  return (
    <>
      {comments.map((msg, i) => (
        <li className={classes.threadMessage} key={i}>
          <div className={classes.threadMessageMeta}>
            <div className={classes.threadMessageAvatar}>
              {
                msg.owner?.avatar ? (
                  <img src={msg.owner.avatar} alt={msg.name} />
                ) : (
                  <img src={gravatar((msg.owner && msg.owner.email) || msg.email)} alt={msg.name} />
                )
              }
            </div>
            <div className={classes.threadMessageInfo}>
              <span className={classes.threadMessageBy}>
                {multiLang && (
                  <img
                    src={localeInfo(msg.locale as string).flag.localFile.publicURL}
                    className={classes.threadMessageLang}
                    alt=""
                  />
                )}
                {
                  msg.owner ? (
                    <Tippy content={t`ethernaTeam`}>
                      <span className={classNames(classes.threadMessageName, classes.verified)}>
                        {msg.owner?.name ?? msg.name}
                      </span>
                    </Tippy>
                  ) : (
                    <span className={classes.threadMessageName}>
                      {msg.name}
                    </span>
                  )
                }
                <span className={classes.threadMessageTime}>
                  {moment(msg.created_on).locale(locale).fromNow()}
                </span>
              </span>
              <span className={classes.threadMessageComment}>
                <Markdown rawMarkdown={msg.comment} />
              </span>

              {/* Disable replies after certain depth */}
              {depth < 3 && !replyTo && (
                <div className={classes.threadMessageActions}>
                  <a onClick={() => setReplyTo(msg)}>{t`reply`}</a>
                </div>
              )}

              {replyTo && replyTo.id === msg.id && (
                <CommentForm
                  inViewport={true}
                  replyTo={replyTo}
                  onCancel={() => setReplyTo(undefined)}
                />
              )}
            </div>
          </div>

          <ol className={classNames(classes.threadMessageReplies, `depth-${depth}`)}>
            <CommentsList
              comments={msg.replies}
              depth={depth + 1}
              multiLang={multiLang}
            />
          </ol>
        </li>
      ))}
    </>
  )
}

export default CommentsList
