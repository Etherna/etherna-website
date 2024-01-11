import { ComponentInternalInstance, h, isVNode } from "vue"

type Child = string | JSX.Element | null
type Children = Child | Child[]

export function vueJsxCompat(
  tag: string,
  props: Record<string, unknown> | null = null,
  children: Children = null,
) {
  if (arguments.length > 3 || isVNode(children)) {
    children = Array.prototype.slice.call(arguments, 2) as any
  }
  return h(tag, props, children as any) as JSX.Element
}

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
