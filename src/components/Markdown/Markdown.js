import React from "react"
import PropTypes from "prop-types"

import microdownEnhanced from "@utils/microdown"

const Markdown = ({
  as: As = "div",
  role,
  className,
  style,
  rawMarkdown,
  forceNewLine = false,
  onClick,
}) => {
  const safeMarkdown = rawMarkdown ?? ""
  const formattedMarkdown = forceNewLine
    ? safeMarkdown.replace(/\n/g, "<br />")
    : safeMarkdown
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
