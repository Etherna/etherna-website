interface SmoothScrollOptions {
  left?: number
  top?: number
  duration?: number
}

let supportsSmoothScrolling = false

if (typeof window !== "undefined") {
  document.body.style.scrollBehavior = "smooth"
  supportsSmoothScrolling = getComputedStyle(document.body).scrollBehavior === "smooth"
  document.body.style.scrollBehavior = ""
}

export const smoothScrollBy = (el: HTMLElement, opts: SmoothScrollOptions) => {
  if (supportsSmoothScrolling) {
    return el.scrollBy({
      left: opts.left,
      top: opts.top,
      behavior: "smooth",
    })
  }

  const requestAnimationFrame =
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame

  let currentFrame = 1

  const frames = (60 * (opts.duration ?? 1000)) / 1000
  const leftFrame = (opts.left ?? 0) / frames
  const topFrame = (opts.top ?? 0) / frames
  const leftTarget = el.scrollLeft + (opts.left ?? 0)
  const topTarget = el.scrollTop + (opts.top ?? 0)

  const elInitialLeft = el.scrollLeft
  const elInitialTop = el.scrollTop

  return new Promise<void>(res => {
    const step = () => {
      el.scrollTo({
        left: elInitialLeft + currentFrame * leftFrame,
        top: elInitialTop + currentFrame * topFrame,
        behavior: "smooth",
      })

      currentFrame++

      if (currentFrame <= frames) {
        requestAnimationFrame(step)
      } else {
        // fix eventual shifted position
        el.scrollTo({
          left: leftTarget,
          top: topTarget,
        })

        res()
      }
    }

    requestAnimationFrame(step)
  })
}
