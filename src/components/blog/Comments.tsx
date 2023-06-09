import React, { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

import { ReactComponent as SpinnerIcon } from "@/assets/animated/spinner.svg"

import CommentForm from "./CommentForm"
import CommentsThread from "./CommentsThread"
import DirectusClient from "@/classes/DirectusClient"
import ViewportObserver from "@/components/layout/ViewportObserver"
import CommentsContextProvider from "@/context/comments-context/comments-context-provider"
import { parseComments } from "@/utils/dataParser"

import type { Comment } from "@/schema/app"
import type { CommentNode } from "@/schema/cms"
import type { Lang } from "@/utils/lang"

const directusClient = new DirectusClient()

type CommentsProps = {
  postId: number
  lang: Lang
}

const Comments: React.FC<CommentsProps> = ({ postId, lang }) => {
  const [comments, setComments] = useState<Comment[] | null>([])
  const [inViewport, setInViewport] = useState(false)
  const [showAllLang, setShowAllLang] = useState(false)
  const [isLoadingComments, setIsLoadingComments] = useState<boolean>()
  const containerRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation("blog")

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
      const localeFilter = !showAllLang && { locale: { eq: lang } }
      directusClient.token = undefined
      const { data: comments } = await directusClient.getItems<CommentNode>("comments", {
        limit: -1,
        filter: {
          post: { eq: postId },
          ...localeFilter,
        },
        fields: ["*", "owner.*.*"],
      })

      const parsedComments = await parseComments(comments)

      setComments(parsedComments)
    } catch (error) {
      setComments(null)
    }
    setIsLoadingComments(false)
  }

  return (
    <ViewportObserver childrenRef={containerRef} onEnterViewport={onEnterViewport}>
      <CommentsContextProvider postId={postId} client={directusClient} comments={comments ?? []}>
        <div className="mt-24" ref={containerRef}>
          <div className="my-4 flex items-center">
            <h4 className="!my-0 mr-3">{t`comments`}</h4>
            <button
              className="ml-auto text-sm text-gray-700"
              onClick={() => setShowAllLang(!showAllLang)}
            >
              {showAllLang ? t("onlyShowLang") : t("showAllLangs")}
            </button>
          </div>

          <CommentForm inViewport={inViewport} lang={lang} />

          {isLoadingComments && <SpinnerIcon width="24" />}

          <CommentsThread fetchedComments={comments ?? []} multiLang={showAllLang} lang={lang} />
        </div>
      </CommentsContextProvider>
    </ViewportObserver>
  )
}

export default Comments
