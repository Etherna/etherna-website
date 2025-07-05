declare global {
  interface Window {
    _paq?: [string, ...unknown[]][]
    webkitRequestAnimationFrame?: typeof window.requestAnimationFrame
    mozRequestAnimationFrame?: typeof window.requestAnimationFrame
    msRequestAnimationFrame?: typeof window.requestAnimationFrame
  }

  interface Navigator {
    browserLanguage?: string
    systemLanguage?: string
  }
}

export {}
