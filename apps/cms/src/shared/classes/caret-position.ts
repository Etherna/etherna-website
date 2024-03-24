const baseRect = {
  x: 0,
  y: 0,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: 0,
  height: 0,
} as DOMRect

interface Options {
  target: HTMLElement
  keepLast?: boolean
}

export class CaretPosition {
  range: Range | null = null
  rect = baseRect
  observers: ((rect: DOMRect) => void)[] = []

  constructor(private options: Options) {
    this.updateRect()

    const update = () => {
      const selection = document.getSelection()

      this.range =
        selection && selection.rangeCount ? selection.getRangeAt(0) : null

      this.updateRect()
    }

    setTimeout(() => {
      options.target.addEventListener("mouseup", update)
      options.target.addEventListener("keydown", update)
      options.target.addEventListener("keyup", update)
      document
        .querySelector("#main-content")
        ?.addEventListener("scroll", update)
    }, 500)
  }

  updateRect() {
    if (this.range) {
      const newRect = this.range.getBoundingClientRect()
      const isEmptyRect = Object.values(
        JSON.parse(JSON.stringify(newRect)),
      ).every((value) => value === 0)

      if (this.options.keepLast && isEmptyRect) return

      this.rect = newRect
      this.rectChangedCallback(this.rect)
    } else if (!this.options.keepLast) {
      this.rect = baseRect
      this.rectChangedCallback(this.rect)
    }
  }

  addEventListener(type: "update", callback: (rect: DOMRect) => void) {
    this.observers.push(callback)
  }

  private rectChangedCallback(rect: DOMRect) {
    this.observers.forEach((callback) => callback(rect))
  }

  getBoundingClientRect() {
    return this.rect
  }

  get clientWidth() {
    return this.rect.width
  }

  get clientHeight() {
    return this.rect.height
  }
}
