import { createContext, Reducer } from "react"

import { parseComments } from "@utils/dataParser"
import { CommentsContextValue, CommentsState } from "@definitions/comments-context"
import { CommentNode } from "@definitions/sources"

export const CommentsContext = createContext<CommentsContextValue | undefined>(undefined)

export type CommentsContextActions = {
  type: "REPLY_TO"
  replyTo: CommentNode | undefined
} | {
  type: "ADD_COMMENT"
  comment: CommentNode
} | {
  type: "REFRESH_COMMENTS"
  comments: CommentNode[]
  multiLang: boolean
}

export const reducer: Reducer<CommentsState, CommentsContextActions> = (state, action) => {
  switch (action.type) {
    case "REPLY_TO": {
      const replyTo = action.replyTo
      return { ...state, replyTo }
    }
    case "ADD_COMMENT": {
      const commentNodes = [...state.commentNodes].concat([action.comment])
      const comments = parseComments(commentNodes)
      return { ...state, commentNodes, comments } as CommentsState
    }
    case "REFRESH_COMMENTS": {
      const commentNodes = action.comments
      const multiLang = action.multiLang
      const comments = parseComments(commentNodes)
      return { ...state, commentNodes, comments, multiLang } as CommentsState
    }
    default: return state
  }
}
