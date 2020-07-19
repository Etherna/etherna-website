import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import { Link } from "gatsby"

import SpinnerIcon from "!svg-react-loader!@images/animated/spinner-light.svg"
import { useCommentsContext } from "./commentsContext"
import Alert from "@components/common/Alert"
import Button from "@components/common/Button"
import { getCurrentUser, currentUserToken } from "@utils/admin"
import { useLocale } from "@utils/localizedPage"
import { useTranslations } from "@utils/useTranslations"

const CommentForm = ({ inViewport }) => {
  const [locale] = useLocale()
  const trans = useTranslations(locale, "blog")
  const transCommon = useTranslations(locale, "common")
  const [state] = useCommentsContext()
  const [isOpen, setIsOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(false)
  const [comment, setComment] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const { client, postId, replyTo } = state

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
    setCurrentUser(currentUser)
    setName(currentUser.name)
    setEmail(currentUser.email)
  }

  const submitComment = async () => {
    setIsSubmitting(true)

    // set current user token, if authenticated
    if (currentUser) {
      const token = await currentUserToken()
      if (token) {
        client.config.token = token
      }
    }

    // submit comment
    try {
      await client.createItem("comments", {
        name,
        email,
        comment,
        locale,
        post: postId,
        parent: replyTo
      })

      // if guest user, save info for future comments
      window.localStorage.setItem("comment:name", name)
      window.localStorage.setItem("comment:email", email)

      // clear form
      setComment("")
      setSubmitted(true)
      setIsOpen(false)
    } catch (error) {
      setErrorMessage(error.message || trans("commentSubmitError"))
    }

    setIsSubmitting(false)
  }

  return (
    <>
      {isOpen && (
        // eslint-disable-next-line
        <a className="close-form" role="button" onClick={() => setIsOpen(false)}>{transCommon("cancel")}</a>
      )}
      <form
        className={classnames("comments-form", {
          "active": isOpen
        })}
        onSubmit={submitComment}
      >
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
              <img src={currentUser.avatar} alt="" className="auth-user-avatar"/>
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
  replyTo: PropTypes.number,
}

CommentForm.defaultProps = {
  inViewport: false
}

export default CommentForm
