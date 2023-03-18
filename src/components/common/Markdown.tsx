import microdownEnhanced from "@/utils/microdown"

type MarkdownProps = {
  rawMarkdown: string
  as?: React.ElementType
  role?: string
  className?: string
  style?: React.CSSProperties
  forceNewLine?: boolean
  onClick?(): void
}

const Markdown: React.FC<MarkdownProps> = ({
  as: As = "div",
  role,
  className,
  style,
  rawMarkdown,
  forceNewLine = false,
  onClick,
}) => {
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

export default Markdown
