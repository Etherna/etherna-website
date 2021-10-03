import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import moment from "moment"
import { Link } from "gatsby"

import SpinnerIcon from "!svg-react-loader!@images/animated/spinner-light.svg"
import { useCommentsContext } from "./commentsContext"
import Alert from "@components/common/Alert"
import Button from "@components/common/Button"
import Markdown from "@components/Markdown"
import { getCurrentUser, currentUserToken } from "@utils/admin"
import { useLocale } from "@utils/localizedPage"
import { useTranslations } from "@utils/useTranslations"
import gravatar from "@utils/gravatar"

/**
 * @typedef CommentFormProps
 * @property {boolean} inViewport
 * @property {import("@utils/dataParser").Comment} replyTo
 * @property {Function} onCancel
 *
 * @param {CommentFormProps} param0
 */
const CommentForm = ({ inViewport, replyTo, onCancel }) => {
  const [locale] = useLocale()
  const trans = useTranslations(locale, "blog")
  const transCommon = useTranslations(locale, "common")

  const [isOpen, setIsOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [comment, setComment] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const [state, actions] = useCommentsContext()
  const { client, postId } = state
  const { insertComment } = actions
  const isActive = isOpen || replyTo != null

  useEffect(() => {
    if (typeof window === "undefined" || currentUser) return

    setName(window.localStorage.getItem("comment:name") || "")
    setEmail(window.localStorage.getItem("comment:email") || "")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (inViewport) {
      fetchCurrentUser()
    }
  }, [inViewport])

  const fetchCurrentUser = async () => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setCurrentUser(currentUser)
      setName(currentUser.name)
      setEmail(currentUser.email)
    }
  }

  const submitComment = async () => {
    setIsSubmitting(true)

    // set current user token, if authenticated
    const token = await currentUserToken()
    client.config.token = token || null

    // submit comment
    try {
      const resp = await client.createItem("comments", {
        name,
        email,
        comment,
        status: "published",
        locale: (replyTo && replyTo.locale) || locale,
        post: postId,
        parent: replyTo && replyTo.id
      })

      const newComment = {
        ...resp.data,
        owner: resp.data.owner && (await client.getUser(resp.data.owner, {
          fields: ["*.*"]
        })).data
      }

      // insert comment in thread
      insertComment(newComment)

      // if guest user, save info for future comments
      window.localStorage.setItem("comment:name", name)
      window.localStorage.setItem("comment:email", email)

      // clear form
      setComment("")
      setSubmitted(true)
      setIsSubmitting(false)
      handleCancel()
    } catch (error) {
      setErrorMessage(error.message || trans("commentSubmitError"))
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setIsOpen(false)
    onCancel && onCancel()
  }

  return (
    <>
      <form
        className={classnames("comments-form", {
          "comments-form-replyto": replyTo != null,
          "active": isActive
        })}
        onSubmit={submitComment}
      >
        {/* eslint-disable-next-line */}
        <a className="close-form" role="button" onClick={handleCancel}>{transCommon("cancel")}</a>

        {replyTo && (
          <div className="comments-form-replyto-msg">
            <strong className="block mb-3">{trans("replyingTo")}:</strong>
            <div className="thread-message">
              <div className="thread-message-meta">
                <div className="thread-message-avatar">
                  <img src={gravatar(replyTo.email)} alt={replyTo.name} />
                </div>
                <div className="thread-message-info">
                  <span className="thread-message-by">
                    {replyTo.name} {moment(replyTo.created_on).locale(locale).fromNow()}
                  </span>
                  <span className="thread-message-comment">
                    <Markdown rawMarkdown={replyTo.comment} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="comments-form-wrapper">
          <textarea
            type="text"
            className="comments-form-control comments-form-comment"
            placeholder={trans("commentPlaceholder")}
            value={comment}
            onChange={e => setComment(e.target.value)}
            onFocus={() => setIsOpen(true)}
            required
          />
          <input
            type="text"
            className="comments-form-control comments-form-name"
            placeholder={trans("namePlaceholder")}
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={currentUser != null}
            required
          />
          <input
            type="email"
            className="comments-form-control comments-form-email"
            placeholder={trans("emailPlaceholder")}
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={currentUser != null}
            required
          />

          <div className="submit-comment">
            {currentUser && (
              <Link to="/admin" className="auth-user">
                <span className="auth-user-label">{trans("authAs")}:</span>
                <img src={currentUser.avatar} alt="" className="auth-user-avatar" />
                <span className="auth-user-name">{currentUser.name}</span>
              </Link>
            )}
            <Button
              type="primary"
              disabled={isSubmitting || comment === "" || name === "" || email === ""}
              onClick={submitComment}
            >
              {isSubmitting && (
                <SpinnerIcon width="16" height="16" className="inline-block mr-2" />
              )}
              {trans("sendComment")}
            </Button>
          </div>
        </div>
      </form>

      {submitted && (
        <Alert
          type="success"
          className="my-5"
          title={trans("commentSubmitSuccess")}
          onClose={() => setSubmitted(false)}
        />
      )}

      {errorMessage && (
        <Alert
          type="danger"
          className="my-5"
          title={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}
    </>
  )
}

CommentForm.propTypes = {
  inViewport: PropTypes.bool,
  replyTo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
  }),
  handleCancel: PropTypes.func,
}

CommentForm.defaultProps = {
  inViewport: false
}

export default CommentForm
