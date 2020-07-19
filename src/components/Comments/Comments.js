import React, { useRef, useState, useEffect } from "react"
import PropTypes from "prop-types"
import DirectusClient from "@directus/sdk-js"

import SpinnerIcon from "!svg-react-loader!@images/animated/spinner.svg"
import { CommentsContextProvider } from "./commentsContext"
import CommentsList from "./CommentsList"
import CommentForm from "./CommentForm"
import ViewportObserver from "@components/ViewportObserver"
import { useLocale } from "@utils/localizedPage"
import { useTranslations } from "@utils/useTranslations"
import { parseComments } from "@utils/dataParser"

import "./comments.scss"

const directusClient = new DirectusClient({
  url: process.env.DIRECTUS_URL,
  project: process.env.DIRECTUS_PROJECT,
})

const Comments = ({ postId }) => {
  const containerRef = useRef()
  const [locale] = useLocale()
  const trans = useTranslations(locale, "blog")
  const [comments, setComments] = useState([])
  const [inViewport, setInViewport] = useState(false)
  const [showAllLang, setShowAllLang] = useState(false)
  const [isLoadingComments, setIsLoadingComments] = useState()

  useEffect(() => {
    if (inViewport) {
      fetchComments()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inViewport])

  const onEnterViewport = () => {
    setInViewport(true)
  }

  const fetchComments = async () => {
    setIsLoadingComments(true)
    try {
      const localeFilter = !showAllLang && {locale: {eq: locale}}
      const resp = await directusClient.getItems("comments", {
        limit: -1,
        filter: {
          post: {eq: postId},
          ...localeFilter
        }
      })

      const comments = parseComments(resp.data)
      setComments(comments)
    } catch (error) {
      setComments(null)
    }
    setIsLoadingComments(false)
  }

  return (
    <ViewportObserver
      childrenRef={containerRef}
      onEnterViewport={onEnterViewport}
    >
      <CommentsContextProvider client={directusClient} postId={postId}>
        <div className="comments" ref={containerRef}>
          <div className="flex items-center my-4">
            <h4 className="mr-3 my-0">{trans("comments")}</h4>
            <button className="ml-auto text-sm" onClick={() => setShowAllLang(!showAllLang)}>
              {trans("showAllLangs")}
            </button>
          </div>

          <CommentForm inViewport={inViewport} />

          {isLoadingComments && (
            <SpinnerIcon width="24" />
          )}

          {comments === null && (
            <p className="text-red-500">{trans("commentsFetchError")}</p>
          )}

          <ol className="comments-thread">
            <CommentsList comments={comments} />
          </ol>
        </div>
      </CommentsContextProvider>
    </ViewportObserver>
  )
}

Comments.propTypes = {
  postId: PropTypes.number.isRequired,
}

export default Comments
