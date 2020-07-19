import React, { useContext, createContext, useReducer } from "react"

const CommentsContext = createContext()

/**
 * @typedef {object} CommentsState
 * @property {import("@directus/sdk-js").SDK} client Directus sdk client
 * @property {number} replyTo Id of the comment to reply to
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
    default:
      return state
  }
}

/**
 * @typedef CommentsContextProviderProps
 * @property {object} children
 * @property {import("@directus/sdk-js").SDK} client
 * @property {number} postId
 *
 * @param {CommentsContextProviderProps} param0
 */
export const CommentsContextProvider = ({ children, client, postId }) => {
  const store = useReducer(reducer, {
    client,
    postId
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

  const actions = {
    setReplyTo
  }

  return [state, actions]
}
