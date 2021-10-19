import { Dispatch } from "react"
import { SDK as DirectusSDK } from "@directus/sdk-js"

import { Comment } from "./app"
import { CommentNode } from "./sources"
import { CommentsContextActions } from "@context/comments-context"

export type CommentsContextValue = [state: CommentsState, dispatch: Dispatch<CommentsContextActions>]

export interface CommentsState {
  /// Id of the post
  postId: number
  /// Directus sdk client
  client: DirectusSDK
  /// Id of the comment to reply to
  replyTo?: CommentNode
  /// Comments node ungrouped list
  commentNodes: CommentNode[]
  /// Comments thread
  comments: Comment[]
  /// Comments are in multi languages
  multiLang: boolean
}
