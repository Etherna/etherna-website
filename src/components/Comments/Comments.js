import React, { useRef, useState, useEffect } from "react"
import PropTypes from "prop-types"
import DirectusClient from "@directus/sdk-js"

import SpinnerIcon from "!svg-react-loader!@images/animated/spinner.svg"
import CommentsThread from "./CommentsThread"
import CommentForm from "./CommentForm"
import { CommentsContextProvider } from "./commentsContext"
import ViewportObserver from "@components/ViewportObserver"
import { useLocale } from "@utils/localizedPage"
import { useTranslations } from "@utils/useTranslations"

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
  }, [inViewport, showAllLang])

  const onEnterViewport = () => {
    setInViewport(true)
  }

  const fetchComments = async () => {
    setIsLoadingComments(true)
    try {
      const localeFilter = !showAllLang && {locale: {eq: locale}}
      directusClient.config.token = null
      const resp = await directusClient.getItems("comments", {
        limit: -1,
        filter: {
          post: {eq: postId},
          ...localeFilter
        },
        fields: ["*", "owner.*.*"]
      })

      setComments(resp.data)
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
      <CommentsContextProvider
        client={directusClient}
        postId={postId}
        comments={comments}
      >
        <div className="comments" ref={containerRef}>
          <div className="flex items-center my-4">
            <h4 className="comments-heading">{trans("comments")}</h4>
            <button className="ml-auto text-sm text-gray-700" onClick={() => setShowAllLang(!showAllLang)}>
              {showAllLang ? trans("onlyShowLang") : trans("showAllLangs")}
            </button>
          </div>

          <CommentForm inViewport={inViewport} />

          {isLoadingComments && (
            <SpinnerIcon width="24" />
          )}

          <CommentsThread fetchedComments={comments} multiLang={showAllLang} />
        </div>
      </CommentsContextProvider>
    </ViewportObserver>
  )
}

Comments.propTypes = {
  postId: PropTypes.number.isRequired,
}

export default Comments
