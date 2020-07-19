import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import moment from "moment"
import { Markdown } from "react-showdown"

import gravatar from "@utils/gravatar"
import { useLocale } from "@utils/localizedPage"
import { useTranslations } from "@utils/useTranslations"

/**
 * @typedef CommentsListProps
 * @property {import("@utils/dataParser").Comment[]} comments
 * @property {number} depth
 *
 * @param {CommentsListProps} param0
 */
const CommentsList = ({ comments, depth }) => {
  const [locale] = useLocale()
  const trans = useTranslations(locale, "blog")

  return (
    <>
      {comments.map((msg, i) => (
        <li className="thread-message" key={i}>
          <div className="thread-message-meta">
            <div className="thread-message-avatar">
              <img src={gravatar(msg.email)} alt={msg.name} />
            </div>
            <div className="thread-message-info">
              <span className="thread-message-by">
                {msg.name} {moment(msg.created_on).locale(locale).fromNow()}
              </span>
              <span className="thread-message-comment">
                <Markdown markdown={msg.comment} />
              </span>

              {/* Disable replies after certain depth */}
              {depth < 3 && (
                <div className="thread-message-actions">
                  <a href="#replyForm">{trans("reply")}</a>
                </div>
              )}
            </div>
          </div>

          <ol className={classnames(`thread-message-replies`, `depth-${depth}`)}>
            <CommentsList comments={msg.replies} depth={depth+1} />
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
}

CommentsList.defaultProps = {
  depth: 1
}

export default CommentsList
