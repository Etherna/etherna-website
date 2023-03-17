import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import { ReactComponent as SpinnerIcon } from "@/images/animated/spinner-light.svg"

import Image from "../common/Image"
import CommentThreadMessage from "./CommentThreadMessage"
import Alert from "@/components/common/Alert"
import Button from "@/components/common/Button"
import TextField from "@/components/common/TextField"
import useCommentsContext from "@/context/comments-context/hooks/useCommentsContext"
import { getCurrentUser, currentUserToken } from "@/utils/admin"
import classNames from "@/utils/classnames"
import { parseComment } from "@/utils/dataParser"

import type { Comment, User } from "@/schema/app"
import type { CommentNode } from "@/schema/cms"
import type { Lang } from "@/utils/lang"

type CommentFormProps = {
  lang: Lang
  inViewport?: boolean
  replyTo?: Comment
  onCancel?(): void
}

const CommentForm: React.FC<CommentFormProps> & {
  Field: typeof CommentFormField
} = ({ inViewport = false, lang, replyTo, onCancel }) => {
  const { t } = useTranslation(["common", "blog"])

  const [isOpen, setIsOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<User>()
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
    client!.token = token || undefined

    // submit comment
    try {
      const resp = await client!.createItem<CommentNode>("comments", {
        name,
        email,
        comment,
        status: "published",
        locale: replyTo?.locale ?? lang,
        post: postId,
        parent: replyTo?.id,
      })

      const owner = resp.owner
        ? await client!.getUser(resp.owner.id, { fields: ["*.*"] })
        : undefined

      const newComment = await parseComment(
        {
          ...resp,
          owner: owner ?? null,
        },
        []
      )

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
        className={classNames(
          "mb-6",
          {
            "translate-y-0": isActive,
          },
          replyTo != null && [
            "fixed inset-x-0 top-0 z-50 m-10 -translate-y-10 transform rounded p-8 shadow-lg",
            "border border-gray-200 bg-white",
            "sm:static sm:z-0 sm:m-0 sm:border-none sm:bg-transparent sm:p-0 sm:shadow-none",
            "transition duration-500",
          ]
        )}
        onSubmit={submitComment}
      >
        <a
          className={classNames("mb-3 block text-xs opacity-0", {
            "opacity-100": isActive,
          })}
          role="button"
          onClick={handleCancel}
        >
          {t("cancel")}
        </a>

        {replyTo && (
          <div className="mb-4 sm:hidden">
            <strong className="mb-3 block">{t("blog:replyingTo")}:</strong>
            <CommentThreadMessage comment={replyTo} lang={lang} hideReplies />
          </div>
        )}

        <div className="flex flex-wrap">
          <CommentForm.Field
            className={classNames("h-10", {
              "h-auto rounded-b-none": isActive,
            })}
            placeholder={t`commentPlaceholder`}
            value={comment}
            onChange={setComment}
            onFocus={() => setIsOpen(true)}
            multiline
            required
          />
          <CommentForm.Field
            type="text"
            className={classNames("hidden lg:w-1/2", {
              "block rounded-none lg:-mt-px lg:rounded-bl-lg lg:rounded-br-none": isActive,
            })}
            placeholder={t`namePlaceholder`}
            value={name}
            onChange={setName}
            disabled={currentUser != null}
            required
          />
          <CommentForm.Field
            type="email"
            className={classNames("hidden lg:w-1/2", {
              "block rounded-t-none lg:-mt-px lg:rounded-bl-none lg:rounded-br-lg lg:border-l-0":
                isActive,
            })}
            placeholder={t`emailPlaceholder`}
            value={email}
            onChange={setEmail}
            disabled={currentUser != null}
            required
          />

          <div
            className={classNames("mt-3 hidden w-full flex-wrap justify-between md:flex-nowrap", {
              flex: isActive,
            })}
          >
            {currentUser && (
              <a href="/admin" className="my-1 flex items-center text-sm">
                <span className="mr-2 pl-1 text-gray-600">{t("blog:authAs")}:</span>
                <Image data={currentUser.avatar} alt="" className="mr-2 h-5 w-5 rounded-full" />
                <span className="font-semibold text-gray-700">{currentUser.first_name}</span>
              </a>
            )}
            <Button
              type="primary"
              disabled={isSubmitting || comment === "" || name === "" || email === ""}
              onClick={submitComment}
            >
              {isSubmitting && <SpinnerIcon width="16" height="16" className="mr-2 inline-block" />}
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
CommentForm.Field = CommentFormField

type InferProps<T> = T extends React.FC<infer P> ? P : never

function CommentFormField({ className, ...props }: InferProps<typeof TextField>) {
  return (
    <TextField
      {...props}
      className={classNames(
        "w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 transition duration-500",
        "[&_is(input,textarea)]:placeholder:text-sm [&_is(input,textarea)]:placeholder:text-gray-500",
        "focus:z-10 focus:rounded-lg focus:border-primary-500 focus:bg-white focus:shadow-none focus:outline-none",
        "active:z-10 active:rounded-lg active:border-primary-500 active:bg-white active:shadow-none active:outline-none",
        className
      )}
    />
  )
}

export default CommentForm
