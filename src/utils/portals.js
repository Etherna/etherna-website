import ReactDOM from "react-dom"

export const createPortal = (children, selector) => {
  if (typeof window === "undefined") {
    return null
  }
  const el = document.querySelector(selector)
  return ReactDOM.createPortal(children, el)
}
