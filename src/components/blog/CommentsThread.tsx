import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"

import CommentsList from "./CommentsList"
import useCommentsContext from "@/context/comments-context/hooks/useCommentsContext"

import type { Comment } from "@/schema/app"
import type { Lang } from "@/utils/lang"

type CommentsThreadProps = {
  fetchedComments: Comment[]
  multiLang?: boolean
  lang: Lang
}

const CommentsThread: React.FC<CommentsThreadProps> = ({
  fetchedComments,
  multiLang = false,
  lang,
}) => {
  const { t } = useTranslation("blog")
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
        <ol className="">
          <CommentsList comments={comments} multiLang={multiLang} lang={lang} />
        </ol>
      )}

      {comments === null && <p className="text-red-500">{t("commentsFetchError")}</p>}

      {comments && comments.length === 0 && (
        <div className="py-8 text-gray-600">
          <h5>
            {t("noComments")}{" "}
            <span role="img" aria-label="up here">
              👆
            </span>
          </h5>
        </div>
      )}
    </>
  )
}

export default CommentsThread
