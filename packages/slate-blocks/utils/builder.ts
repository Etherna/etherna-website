export function getElementExtraSettings(type: string): {
  type: "link" | "string" | "boolean" | "number" | "color"
  id: string
  name: string
}[] {
  switch (type) {
    case "button":
      return [
        {
          type: "color",
          id: "background",
          name: "Background",
        },
        {
          type: "link",
          id: "link",
          name: "Link",
        },
      ]
    case "client":
      return [
        {
          type: "link",
          id: "link",
          name: "Link",
        },
      ]
    case "card":
      return [
        {
          type: "color",
          id: "backgroundStart",
          name: "Background start",
        },
        {
          type: "color",
          id: "backgroundEnd",
          name: "Background end",
        },
      ]
    default:
      return []
  }
}
