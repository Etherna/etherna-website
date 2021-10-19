import React, { useEffect } from "react"

type ViewportObserverProps = {
  childrenRef: React.RefObject<HTMLElement>
  viewportClassName: string
  offset?: number
  onEnterViewport?(): void
}

const ViewportObserver: React.FC<ViewportObserverProps> = ({
  children,
  childrenRef,
  viewportClassName,
  offset = 0,
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
    window.removeEventListener("scroll", updateHandler)
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
      childrenRef.current?.classList.add(viewportClassName)
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

export default ViewportObserver
