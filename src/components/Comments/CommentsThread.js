import React, { useEffect } from "react"

import CommentsList from "./CommentsList"
import { useCommentsContext } from "./commentsContext"
import { useLocale } from "@utils/localizedPage"
import { useTranslations } from "@utils/useTranslations"

const CommentsThread = ({ fetchedComments, multiLang }) => {
  const [locale] = useLocale()
  const trans = useTranslations(locale, "blog")
  const [state, actions] = useCommentsContext()
  const { comments } = state
  const { refreshComments } = actions

  useEffect(() => {
    if (fetchedComments) {
      refreshComments(fetchedComments, multiLang)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedComments])

  return (
    <>
      {comments === null && (
        <p className="text-red-500">{trans("commentsFetchError")}</p>
      )}

      <ol className="comments-thread">
        <CommentsList comments={comments} multiLang={multiLang} />
      </ol>
    </>
  )
}

export default CommentsThread
