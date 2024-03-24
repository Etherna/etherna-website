import { ComponentInternalInstance } from "vue"

export function findParentNodeWithName(
  instance: ComponentInternalInstance | null,
  name: string,
) {
  let parent = instance?.parent
  while (parent) {
    if (parent.type.__name === name) {
      return parent
    }
    parent = parent.parent
  }
  return null
}

export function fixedSvgImport(svg: string) {
  return svg.match(/^export default "(.+)"$/)?.[1] ?? svg
}

export function svgStringToHtmlElement(svg: string) {
  if (!svg) return svg
  const decoded = svg.replace("data:image/svg+xml,", "")
  return decodeURIComponent(decoded)
}
