import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import classNames from "classnames"

import classes from "@styles/components/blog/CommentsForm.module.scss"
import threadClasses from "@styles/components/blog/CommentsList.module.scss"

import SpinnerIcon from "!svg-react-loader!@images/animated/spinner-light.svg"
import Alert from "@components/common/Alert"
import Button from "@components/common/Button"
import Markdown from "@components/common/Markdown"
import useCommentsContext from "@context/comments-context/hooks/useCommentsContext"
import useLocale from "@context/locale-context/hooks/useLocale"
import { Comment, CurrentUser } from "@definitions/app"
import { CommentNode } from "@definitions/sources"
import { useTranslations } from "@hooks/useTranslations"
import { getCurrentUser, currentUserToken } from "@utils/admin"
import dayjs from "@utils/dayjs"
import gravatar from "@utils/gravatar"

type CommentFormProps = {
  inViewport?: boolean
  replyTo?: Comment
  onCancel?(): void
}

const CommentForm: React.FC<CommentFormProps> = ({ inViewport = false, replyTo, onCancel }) => {
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "blog")
  const { t: tCommon } = useTranslations(locale, "common")

  const [isOpen, setIsOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<CurrentUser>()
  const [comment, setComment] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const [state, actions] = useCommentsContext()
  const { client, postId } = state ?? {}
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
    client!.config.token = token || undefined

    // submit comment
    try {
      const resp = await client!.createItem<Partial<CommentNode>>("comments", {
        name,
        email,
        comment,
        status: "published",
        locale: replyTo?.locale ?? locale,
        post: postId,
        parent: replyTo?.id
      })

      const owner = resp.data.owner
        ? (await client!.getUser(resp.data.owner.id, { fields: ["*.*"] })).data
        : undefined

      const newComment: CommentNode = {
        ...(resp.data as CommentNode),
        owner: owner ? {
          id: owner.id,
          email: owner.email,
          first_name: owner.first_name,
          last_name: owner.last_name,
          avatar: owner.avatar
        } : undefined
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
    } catch (error: any) {
      setErrorMessage(error.message || t`commentSubmitError`)
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
        className={classNames(classes.commentsForm, {
          [classes.commentsFormReplyto]: replyTo != null,
          [classes.active]: isActive
        })}
        onSubmit={submitComment}
      >
        <a className={classes.commentsFormCloseForm} role="button" onClick={handleCancel}>
          {tCommon`cancel`}
        </a>

        {replyTo && (
          <div className={classes.commentsFormReplytoMsg}>
            <strong className="block mb-3">{t`replyingTo`}:</strong>
            <div className={threadClasses.threadMessage}>
              <div className={threadClasses.threadMessageMeta}>
                <div className={threadClasses.threadMessageAvatar}>
                  <img src={gravatar(replyTo.email)} alt={replyTo.name} />
                </div>
                <div className={threadClasses.threadMessageInfo}>
                  <span className={threadClasses.threadMessageBy}>
                    {replyTo.name} {dayjs(replyTo.created_on).locale(locale).fromNow()}
                  </span>
                  <span className={threadClasses.threadMessageComment}>
                    <Markdown rawMarkdown={replyTo.comment} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={classes.commentsFormWrapper}>
          <textarea
            className={classNames(classes.commentsFormControl, classes.commentsFormComment)}
            placeholder={t`commentPlaceholder`}
            value={comment}
            onChange={e => setComment(e.target.value)}
            onFocus={() => setIsOpen(true)}
            required
          />
          <input
            type="text"
            className={classNames(classes.commentsFormControl, classes.commentsFormName)}
            placeholder={t`namePlaceholder`}
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={currentUser != null}
            required
          />
          <input
            type="email"
            className={classNames(classes.commentsFormControl, classes.commentsFormEmail)}
            placeholder={t`emailPlaceholder`}
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={currentUser != null}
            required
          />

          <div className={classes.commentsFormSubmitComment}>
            {currentUser && (
              <Link to="/admin" className={classes.commentAuthUser}>
                <span className={classes.commentAuthUserLabel}>{t`authAs`}:</span>
                <img src={currentUser.avatar} alt="" className={classes.commentAuthUserAvatar} />
                <span className={classes.commentAuthUserName}>{currentUser.name}</span>
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
              {t`sendComment`}
            </Button>
          </div>
        </div>
      </form>

      {submitted && (
        <Alert
          type="success"
          className="my-5"
          title={t`commentSubmitSuccess`}
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

export default CommentForm
