import React, { useMemo } from "react"
import PropTypes from "prop-types"
import snarkdown from "snarkdown"

const Markdown = ({
  as: As = "p",
  role,
  className,
  style,
  rawMarkdown,
  forceNewLine = false,
  onClick,
}) => {
  const markdown = useMemo(() => {
    const safeMarkdown = rawMarkdown ?? ""
    const formattedMarkdown = forceNewLine
      ? safeMarkdown.replace(/\n/g, "<br />")
      : safeMarkdown
    return snarkdown(formattedMarkdown)
  }, [rawMarkdown, forceNewLine])

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

Markdown.propTypes = {
  as: PropTypes.string,
  role: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  rawMarkdown: PropTypes.string.isRequired,
  forceNewLine: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Markdown
