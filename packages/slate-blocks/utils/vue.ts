/* eslint-disable prefer-rest-params */
/* eslint-disable no-param-reassign */

import { h, isVNode } from "vue"

import type { JSX } from "vue/jsx-runtime"

type Child = string | JSX.Element | null
type Children = Child | Child[]

export function vueJsxCompat(
  tag: string,
  props: Record<string, unknown> | null = null,
  children: Children = null
) {
  if (arguments.length > 3 || isVNode(children)) {
    children = Array.prototype.slice.call(arguments, 2) as any
  }
  return h(tag, props, children as any) as any
}

export function fixedSvgImport(svg: string) {
  // eslint-disable-next-line prefer-named-capture-group
  return /^export default "(.+)"$/.exec(svg)?.[1] ?? svg
}

export function svgStringToHtmlElement(svg: string) {
  if (!svg) return svg
  const decoded = svg.replace("data:image/svg+xml,", "")
  return decodeURIComponent(decoded)
}
