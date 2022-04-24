import React, { useEffect, useRef } from "react"

type ViewportObserverProps = {
  children?: React.ReactNode
  childrenRef: React.RefObject<HTMLElement>
  viewportClassName?: string
  rootMargin?: string
  threshold?: number | number[]
  onEnterViewport?(): void
  onAnimationEnd?(): void
}

const ViewportObserver: React.FC<ViewportObserverProps> = ({
  children,
  childrenRef,
  viewportClassName,
  rootMargin,
  threshold,
  onEnterViewport,
  onAnimationEnd,
}) => {
  const intersectionObserver = useRef<IntersectionObserver>()

  useEffect(() => {
    if (typeof window === "undefined") return

    intersectionObserver.current = new IntersectionObserver(observerCallback, {
      rootMargin,
      threshold,
    })

    return () => {
      intersectionObserver.current?.disconnect()
      intersectionObserver.current = undefined
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!childrenRef.current) return

    if (childrenRef.current) {
      intersectionObserver.current?.observe(childrenRef.current)
    }

    return () => {
      intersectionObserver.current?.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childrenRef.current])

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0]
    if (entry.isIntersecting) {
      triggerEvent()
      intersectionObserver.current?.disconnect()
      intersectionObserver.current = undefined
    }
  }

  const triggerEvent = () => {
    onEnterViewport?.()

    if (typeof viewportClassName === "string" && childrenRef.current) {
      childrenRef.current.onanimationend = () => onAnimationEnd?.()
      childrenRef.current.ontransitionend = () => onAnimationEnd?.()
      childrenRef.current.classList.add(viewportClassName)
    }
  }

  return (
    <>
      {children}
    </>
  )
}

export default ViewportObserver
