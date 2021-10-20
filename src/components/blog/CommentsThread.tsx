import React, { useEffect } from "react"

import threadClasses from "@styles/components/blog/CommentsList.module.scss"

import CommentsList from "./CommentsList"
import useCommentsContext from "@context/comments-context/hooks/useCommentsContext"
import useLocale from "@context/locale-context/hooks/useLocale"
import { CommentNode } from "@definitions/sources"
import { useTranslations } from "@hooks/useTranslations"

type CommentsThreadProps = {
  fetchedComments: CommentNode[]
  multiLang?: boolean
}

const CommentsThread: React.FC<CommentsThreadProps> = ({ fetchedComments, multiLang = false }) => {
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "blog")
  const [state, actions] = useCommentsContext()
  const { comments } = state ?? {}
  const { refreshComments } = actions

  useEffect(() => {
    if (fetchedComments) {
      refreshComments(fetchedComments, multiLang)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedComments])

  return (
    <>
      {comments && (
        <ol className={threadClasses.threadMessage}>
          <CommentsList comments={comments} multiLang={multiLang} />
        </ol>
      )}

      {comments === null && (
        <p className="text-red-500">{t`commentsFetchError`}</p>
      )}

      {comments && comments.length === 0 && (
        <div className="py-8 text-gray-600">
          <h5>{t`noComments`} <span role="img" aria-label="up here">👆</span></h5>
        </div>
      )}
    </>
  )
}

export default CommentsThread
