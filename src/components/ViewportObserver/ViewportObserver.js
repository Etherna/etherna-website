import React, { useEffect } from "react"
import PropTypes from "prop-types"

const ViewportObserver = ({
  children,
  childrenRef,
  viewportClassName,
  offset,
  onEnterViewport
}) => {
  useEffect(() => {
    if (typeof window === "undefined") return

    window.addEventListener("resize", updateHandler)
    window.addEventListener("scroll", updateHandler, { passive: true })

    if (isRefInViewport()) {
      triggerEvent()
    }

    return () => {
      clearEvents()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    if (isRefInViewport()) {
      triggerEvent()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childrenRef.current])

  const clearEvents = () => {
    window.removeEventListener("resize", updateHandler)
    window.removeEventListener("scroll", updateHandler, { passive: true })
  }

  const updateHandler = () => {
    if (isRefInViewport()) {
      triggerEvent()
    }
  }

  const triggerEvent = () => {
    clearEvents()

    if (typeof onEnterViewport === "function") {
      onEnterViewport()
    }
    if (typeof viewportClassName === "string") {
      childrenRef.current.classList.add(viewportClassName)
    }
  }

  const isRefInViewport = () => {
    if (!childrenRef || !childrenRef.current) return

    const rect = childrenRef.current.getBoundingClientRect()
    const visible = (
      rect.top >= 0 &&
      rect.bottom <= document.documentElement.clientHeight + offset
    )

    if (visible) {
      clearEvents()
    }

    return visible
  }

  return (
    <>
      {children}
    </>
  )
}

ViewportObserver.propTypes = {
  children: PropTypes.node.isRequired,
  childrenRef: PropTypes.object.isRequired,
  viewportClassName: PropTypes.string,
  offset: PropTypes.number,
  onEnterViewport: PropTypes.func,
}

ViewportObserver.defaultProps = {
  offset: 0
}

export default ViewportObserver
