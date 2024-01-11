import { createContext } from "react"

import type { Reducer } from "react"
import type { CommentsContextValue, CommentsState } from "@/definitions/comments-context"
import type { Comment } from "@/schema/app"

export const CommentsContext = createContext<CommentsContextValue | undefined>(undefined)

export type CommentsContextActions =
  | {
      type: "REPLY_TO"
      replyTo: Comment | undefined
    }
  | {
      type: "ADD_COMMENT"
      comment: Comment
    }
  | {
      type: "REFRESH_COMMENTS"
      comments: Comment[]
      multiLang: boolean
    }

export const reducer: Reducer<CommentsState, CommentsContextActions> = (state, action) => {
  switch (action.type) {
    case "REPLY_TO": {
      const replyTo = action.replyTo
      return { ...state, replyTo }
    }
    case "ADD_COMMENT": {
      const comments = [...state.comments, action.comment]
      return { ...state, comments } as CommentsState
    }
    case "REFRESH_COMMENTS": {
      const comments = action.comments
      const multiLang = action.multiLang
      return { ...state, comments, multiLang } as CommentsState
    }
    default:
      return state
  }
}
