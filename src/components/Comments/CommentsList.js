import React, { useState } from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import moment from "moment"
import Tippy from "@tippyjs/react"
import { Markdown } from "react-showdown"

import CommentForm from "./CommentForm"
import gravatar from "@utils/gravatar"
import { useLocale } from "@utils/localizedPage"
import { useTranslations } from "@utils/useTranslations"
import useLocaleInfo from "@utils/useLocaleInfo"

import "tippy.js/dist/tippy.css"

/**
 * @typedef CommentsListProps
 * @property {import("@utils/dataParser").Comment[]} comments
 * @property {number} depth
 * @property {boolean} multiLang
 *
 * @param {CommentsListProps} param0
 */
const CommentsList = ({ comments, depth, multiLang }) => {
  const [locale] = useLocale()
  const [localeInfo] = useLocaleInfo()
  const trans = useTranslations(locale, "blog")
  const [replyTo, setReplyTo] = useState(null)

  return (
    <>
      {comments.map((msg, i) => (
        <li className="thread-message" key={i}>
          <div className="thread-message-meta">
            <div className="thread-message-avatar">
              {
                msg.owner && msg.owner.avatar ? (
                  <img src={msg.owner.avatar} alt={msg.name} />
                ) : (
                  <img src={gravatar((msg.owner && msg.owner.email) || msg.email)} alt={msg.name} />
                )
              }
            </div>
            <div className="thread-message-info">
              <span className="thread-message-by">
                {multiLang && (
                  <img
                    src={localeInfo(msg.locale).flag.localFile.publicURL}
                    className="thread-message-lang"
                    alt=""
                  />
                )}
                {
                  msg.owner ? (
                    <Tippy content={trans("ethernaTeam")}>
                      <span className="thread-message-name verified">
                        {(msg.owner && msg.owner.name) || msg.name}
                      </span>
                    </Tippy>
                  ) : (
                    <span className="thread-message-name">
                      {(msg.owner && msg.owner.name) || msg.name}
                    </span>
                  )
                }
                <span className="thread-message-time">
                  {moment(msg.created_on).locale(locale).fromNow()}
                </span>
              </span>
              <span className="thread-message-comment">
                <Markdown markdown={msg.comment} />
              </span>

              {/* Disable replies after certain depth */}
              {depth < 3 && !replyTo && (
                <div className="thread-message-actions">
                  {/* eslint-disable-next-line */}
                  <a onClick={() => setReplyTo(msg)}>{trans("reply")}</a>
                </div>
              )}

              {replyTo && replyTo.id === msg.id && (
                <CommentForm
                  inViewport={true}
                  replyTo={replyTo}
                  onCancel={() => setReplyTo(null)}
                />
              )}
            </div>
          </div>

          <ol className={classnames(`thread-message-replies`, `depth-${depth}`)}>
            <CommentsList
              comments={msg.replies}
              depth={depth+1}
              multiLang={multiLang}
            />
          </ol>
        </li>
      ))}
    </>
  )
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
      created_on: PropTypes.string.isRequired,
      locale: PropTypes.string.isRequired,
      replies: PropTypes.array.isRequired,
    }),
  ).isRequired,
  depth: PropTypes.number,
  multiLang: PropTypes.bool,
}

CommentsList.defaultProps = {
  depth: 1,
  multiLang: false
}

export default CommentsList
