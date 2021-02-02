import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

import { useLocale } from "@utils/localizedPage"
import { useTranslations } from "@utils/useTranslations"

/**
 * @param {object} param0
 * @param {import("@utils/dataParser").Milestone} param0.milestone
 * @param {string} param0.className
 * @param {React.CSSProperties} param0.style
 * @param {boolean} param0.showClose
 * @param {() => void} param0.onClick
 * @param {() => void} param0.onClose
 */
const RoadmapItem = ({ milestone, className, style, showClose, onClick, onClose }) => {
  const [locale] = useLocale()
  const trans = useTranslations(locale, "roadmap")
  const [staticClass, setStaticClass] = useState()

  useEffect(() => {
    setTimeout(() => {
      setStaticClass(className)
    }, 1)
  }, [className])

  return (
    <button
      className={classnames("roadmap-item", staticClass, {
        "roadmap-item-done": milestone.completion === "done",
        "roadmap-item-ongoing": milestone.completion === "ongoing",
        "roadmap-item-todo": milestone.completion === "todo",
      })}
      style={style}
      onClick={onClick}
    >
      <img className="roadmap-item-image" src={milestone.image.localFile.publicURL} alt={milestone.title} />
      <h3 className="roadmap-item-title">{milestone.title}</h3>
      <p className="roadmap-item-subtitle">{milestone.subtitle}</p>
      <p className="roadmap-item-description" dangerouslySetInnerHTML={{ __html: milestone.description }} />
      <span className={classnames("roadmap-item-status", `roadmap-item-status-${milestone.completion}`)}>
        {trans(milestone.completion)}
      </span>

      {showClose && (
        <span
          className="roadmap-item-close"
          role="button"
          tabIndex={0}
          aria-label="Close Modal"
          onClick={onClose}
          onKeyDown={() => {}}
        />
      )}
    </button>
  )
}

RoadmapItem.propTypes = {
  milestone: PropTypes.object.isRequired,
  className: PropTypes.string,
  showClose: PropTypes.bool,
  style: PropTypes.object,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
}

export default RoadmapItem
