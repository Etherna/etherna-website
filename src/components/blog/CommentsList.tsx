import CommentThreadMessage from "./CommentThreadMessage"
import classNames from "@/utils/classnames"

import type { Comment } from "@/schema/app"
import type { Lang } from "@/utils/lang"

type CommentsListProps = {
  comments: Comment[]
  depth?: number
  multiLang: boolean
  lang: Lang
}

const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  depth = 1,
  multiLang = false,
  lang,
}) => {
  return (
    <>
      {comments.map((msg, i) => (
        <CommentThreadMessage
          comment={msg}
          lang={lang}
          showLocale={multiLang}
          depth={depth}
          key={i}
        >
          <ol className={classNames("pl-4 md:pl-8", `depth-${depth}`)} data-depth={depth}>
            <CommentsList
              comments={msg.replies}
              depth={depth + 1}
              multiLang={multiLang}
              lang={lang}
            />
          </ol>
        </CommentThreadMessage>
      ))}
    </>
  )
}

export default CommentsList
