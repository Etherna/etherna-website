import type { Comment } from "./app"
import type { CommentNode } from "./sources"
import type { Dispatch } from "react"
import type { CommentsContextActions } from "@/context/comments-context"

export type CommentsContextValue = [
  state: CommentsState,
  dispatch: Dispatch<CommentsContextActions>
]

export interface CommentsState {
  /// Id of the post
  postId: number
  /// Directus sdk client
  client: any
  /// Id of the comment to reply to
  replyTo?: CommentNode
  /// Comments node ungrouped list
  commentNodes: CommentNode[]
  /// Comments thread
  comments: Comment[]
  /// Comments are in multi languages
  multiLang: boolean
}
