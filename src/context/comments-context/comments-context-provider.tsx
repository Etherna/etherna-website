// @ts-nocheck

import React, { useReducer } from "react"

import { CommentsContext, reducer } from "."
import { parseComments } from "@/utils/dataParser"

import type { CommentsState } from "@definitions/comments-context"
import type { CommentNode } from "@definitions/sources"
import type { SDK as DirectusSDK } from "@directus/sdk-js"

type CommentsContextProviderProps = {
  children?: React.ReactNode
  postId: number
  client: DirectusSDK
  comments: CommentNode[]
}

const CommentsContextProvider: React.FC<CommentsContextProviderProps> = ({
  children,
  postId,
  client,
  comments,
}) => {
  const initialState: CommentsState = {
    postId,
    client,
    commentNodes: comments,
    comments: comments ? parseComments(comments) : [],
    multiLang: false,
  }
  const store = useReducer(reducer, initialState)

  return <CommentsContext.Provider value={store}>{children}</CommentsContext.Provider>
}

export default CommentsContextProvider
