import React, { useRef, useState, useEffect } from "react"
import PropTypes from "prop-types"
import DirectusClient from "@directus/sdk-js"

import classes from "@styles/components/blog/Comments.module.scss"
import { ReactComponent as SpinnerIcon } from "@images/animated/spinner.svg"

import CommentsThread from "./CommentsThread"
import CommentForm from "./CommentForm"
import CommentsContextProvider from "@context/comments-context/comments-context-provider"
import ViewportObserver from "@components/layout/ViewportObserver"
import useLocale from "@context/locale-context/hooks/useLocale"
import { useTranslations } from "@hooks/useTranslations"
import { CommentNode } from "@definitions/sources"

const directusClient = new DirectusClient({
  url: process.env.DIRECTUS_URL,
  project: process.env.DIRECTUS_PROJECT,
  mode: "jwt"
})

type CommentsProps = {
  postId: number
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const [locale] = useLocale()
  const [comments, setComments] = useState<CommentNode[] | null>([])
  const [inViewport, setInViewport] = useState(false)
  const [showAllLang, setShowAllLang] = useState(false)
  const [isLoadingComments, setIsLoadingComments] = useState<boolean>()
  const containerRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslations(locale, "blog")

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
      const localeFilter = !showAllLang && { locale: { eq: locale } }
      directusClient.config.token = undefined
      const resp = await directusClient.getItems("comments", {
        limit: -1,
        filter: {
          post: { eq: postId },
          ...localeFilter
        },
        fields: ["*", "owner.*.*"]
      })

      setComments(resp.data as CommentNode[])
    } catch (error) {
      setComments(null)
    }
    setIsLoadingComments(false)
  }

  return (
    <ViewportObserver childrenRef={containerRef} onEnterViewport={onEnterViewport}>
      <CommentsContextProvider postId={postId} client={directusClient} comments={comments ?? []}>
        <div className={classes.comments} ref={containerRef}>
          <div className="flex items-center my-4">
            <h4 className={classes.commentsHeading}>{t`comments`}</h4>
            <button className="ml-auto text-sm text-gray-700" onClick={() => setShowAllLang(!showAllLang)}>
              {showAllLang ? t`onlyShowLang` : t`showAllLangs`}
            </button>
          </div>

          <CommentForm inViewport={inViewport} />

          {isLoadingComments && (
            <SpinnerIcon width="24" />
          )}

          <CommentsThread fetchedComments={comments ?? []} multiLang={showAllLang} />
        </div>
      </CommentsContextProvider>
    </ViewportObserver>
  )
}

Comments.propTypes = {
  postId: PropTypes.number.isRequired,
}

export default Comments
