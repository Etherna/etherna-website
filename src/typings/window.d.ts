declare global {
  interface Window {
    webkitRequestAnimationFrame?: typeof window.requestAnimationFrame
    mozRequestAnimationFrame?: typeof window.requestAnimationFrame
    msRequestAnimationFrame?: typeof window.requestAnimationFrame
  }
}

export { }
