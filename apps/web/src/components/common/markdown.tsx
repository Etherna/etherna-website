import microdownEnhanced from "@/utils/microdown"

interface MarkdownProps {
  rawMarkdown: string | null | undefined
  as?: React.ElementType
  role?: string
  className?: string
  style?: React.CSSProperties
  forceNewLine?: boolean
  onClick?: () => void
}

export function Markdown({
  as: As = "div",
  role,
  className,
  style,
  rawMarkdown,
  forceNewLine = false,
  onClick,
}: MarkdownProps) {
  const safeMarkdown = rawMarkdown ?? ""
  const formattedMarkdown = forceNewLine ? safeMarkdown.replace(/\n/g, "<br />") : safeMarkdown
  const markdown = microdownEnhanced(formattedMarkdown)

  return (
    <As
      className={className}
      style={style}
      role={role}
      dangerouslySetInnerHTML={{ __html: markdown }}
      onClick={onClick}
    />
  )
}
