import { cn } from "@/utils/classnames"

import type { PropsWithChildren } from "react"

type ProseProps = PropsWithChildren<{
  className?: string
}>

const Prose: React.FC<ProseProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "mt-4 pb-32",
        "[&_article]:prose [&_article]:lg:prose-lg [&_article]:mx-auto",
        "prose-h2:leading-tight prose-h3:leading-tight prose-h4:leading-tight prose-h5:leading-tight prose-h6:leading-tight",
        "prose-code:overflow-x-auto prose-code:rounded prose-code:bg-gray-300 prose-code:px-2 prose-code:py-1 prose-code:text-sm prose-code:text-gray-900",
        className
      )}
    >
      {children}
    </div>
  )
}

export default Prose
