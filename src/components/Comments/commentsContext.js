import React, { useContext, createContext, useReducer } from "react"

import { parseComments } from "@utils/dataParser"

const CommentsContext = createContext()

/**
 * @typedef {object} CommentsState
 * @property {import("@directus/sdk-js").SDK} client Directus sdk client
 * @property {number} replyTo Id of the comment to reply to
 * @property {import("@utils/dataParser").CommentNode[]} commentNodes Comments node ungrouped list
 * @property {import("@utils/dataParser").Comment[]} comments Comments thread
 * @property {boolean} multiLang Comments are in multi languages
 *
 * @typedef {object} CommentsDispatchAction
 * @property {string} type Action type
 *
 * @param {CommentsState} state State
 * @param {CommentsDispatchAction} action Dispatch action
 */
const reducer = (state, action) => {
  switch (action.type) {
    case "REPLY_TO": {
      const replyTo = action.replyTo
      return {...state, replyTo}
    }
    case "ADD_COMMENT": {
      const commentNodes = [...state.commentNodes].concat([action.comment])
      const comments = parseComments(commentNodes)
      return {...state, commentNodes, comments}
    }
    case "REFRESH_COMMENTS": {
      const commentNodes = action.comments
      const multiLang = action.multiLang
      const comments = parseComments(commentNodes)
      return {...state, commentNodes, comments, multiLang}
    }
    default:
      return state
  }
}

/**
 * @typedef CommentsContextProviderProps
 * @property {object} children
 * @property {import("@directus/sdk-js").SDK} client
 * @property {number} postId
 * @property {import("@utils/dataParser").CommentNode[]} comments
 *
 * @param {CommentsContextProviderProps} param0
 */
export const CommentsContextProvider = ({ children, client, postId, comments }) => {
  const store = useReducer(reducer, {
    client,
    postId,
    commentNodes: comments,
    comments: comments && parseComments(comments),
    multiLang: false
  })
  return (
    <CommentsContext.Provider value={store}>
      {children}
    </CommentsContext.Provider>
  )
}

/**
 * Use comments hook
 *
 * @typedef {object} CommentsActions Comments actions
 * @property {(id: number = null) => void} setReplyTo Set reply to comment
 * @property {(comment: import("@utils/dataParser").CommentNode) => void} insertComment Insert a comment in the thread
 * @property {(comment: import("@utils/dataParser").CommentNode[], multiLang: boolean = false) => void} refreshComments Refresh all the comments with multi lang option
 *
 * @returns {[CommentsState, CommentsActions]} Comments hook utilities
 */
export const useCommentsContext = () => {
  const [state, dispatch] = useContext(CommentsContext)

  const setReplyTo = (id = null) => {
    dispatch({
      type: "REPLY_TO",
      replyTo: id
    })
  }

  const insertComment = comment => {
    dispatch({
      type: "ADD_COMMENT",
      comment
    })
  }

  const refreshComments = (comments, multiLang) => {
    dispatch({
      type: "REFRESH_COMMENTS",
      comments,
      multiLang
    })
  }

  const actions = {
    setReplyTo,
    insertComment,
    refreshComments
  }

  return [state, actions]
}
