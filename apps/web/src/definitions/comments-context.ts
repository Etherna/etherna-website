import type { Comment } from "./app"
import type { Dispatch } from "react"
import type DirectusClient from "@/classes/directus-client"
import type { CommentsContextActions } from "@/context/comments-context"

export type CommentsContextValue = [
  state: CommentsState,
  dispatch: Dispatch<CommentsContextActions>,
]

export interface CommentsState {
  /// Id of the post
  postId: number
  /// Directus sdk client
  client: DirectusClient
  /// Id of the comment to reply to
  replyTo?: Comment
  /// Comments thread
  comments: Comment[]
  /// Comments are in multi languages
  multiLang: boolean
}
