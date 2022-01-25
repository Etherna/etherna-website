declare global {
  interface Window {
    mozRequestAnimationFrame?: typeof window.requestAnimationFrame
    msRequestAnimationFrame?: typeof window.requestAnimationFrame
  }
  interface Navigator {
    browserLanguage?: string
    systemLanguage?: string
  }
}

export { }
