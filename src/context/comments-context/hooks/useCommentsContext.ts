import { useContext } from "react"

import { CommentsContext } from "@/context/comments-context"

import type { Comment } from "@/schema/app"

/**
 * Use comments hook
 *
 * @returns Comments hook utilities
 */
export default function useCommentsContext() {
  const context = useContext(CommentsContext)
  const [state, dispatch] = context ?? []

  const setReplyTo = (node?: Comment) => {
    dispatch?.({
      type: "REPLY_TO",
      replyTo: node,
    })
  }

  const insertComment = (comment: Comment) => {
    dispatch?.({
      type: "ADD_COMMENT",
      comment,
    })
  }

  const refreshComments = (comments: Comment[], multiLang = false) => {
    dispatch?.({
      type: "REFRESH_COMMENTS",
      comments,
      multiLang,
    })
  }

  const actions = {
    setReplyTo,
    insertComment,
    refreshComments,
  }

  return [state, actions] as const
}
