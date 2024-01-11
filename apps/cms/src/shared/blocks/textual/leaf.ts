import { SlateLeaf, slateRangeToDOMRange } from "@mattiaz9/slate-jsx"
import { Range, Text } from "slate"
import { CSSProperties } from "vue"
import { vueJsxCompat } from "../../utils/vue"

import type { inferLeafElement, RenderLeafProps } from "@mattiaz9/slate-jsx"

export type LeafElement = inferLeafElement<Leaf>
export interface LeafProps {
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
  subscript?: boolean
  superscript?: boolean
  href?: string
  to?: {
    id: string
    type: string
  }
  target?: "_blank"
}

export class Leaf extends SlateLeaf<LeafProps> {
  protected _assert = (node: unknown) => {
    return Text.isText(node)
  }

  render(props: RenderLeafProps<Leaf>) {
    const isLink: boolean =
      props.leaf.href !== undefined || props.leaf.to !== undefined
    const style: CSSProperties = {
      whiteSpace: "pre-wrap",
      fontWeight: props.leaf.bold ? "bold" : undefined,
      fontStyle: props.leaf.italic ? "italic" : undefined,
      textDecoration:
        props.leaf.underline || isLink
          ? "underline"
          : props.leaf.strikethrough
            ? "line-through"
            : undefined,
      fontFamily: props.leaf.code ? "monospace" : undefined,
      backgroundColor: props.leaf.code ? "hsl(0 0% 50% / 0.2)" : undefined,
      borderRadius: props.leaf.code ? "0.2em" : undefined,
      color: isLink ? "var(--theme--primary)" : undefined,
      textUnderlineOffset: isLink ? "0.2em" : undefined,
    }
    const onClick = (e: MouseEvent) => {
      const isDoubleClick = e.detail === 2 || e.detail === 3
      const selection = window.getSelection()

      if (!isLink || isDoubleClick || !selection) return

      const editorSelection: Range = {
        anchor: {
          path: props.path,
          offset: 0,
        },
        focus: {
          path: props.path,
          offset: props.leaf.text.length,
        },
      }

      const range = slateRangeToDOMRange(editorSelection, props.editor.element)

      if (range) {
        selection.removeAllRanges()
        selection.addRange(range)
      }
    }

    if (props.leaf.bold) {
      return vueJsxCompat(
        "strong",
        {
          ...props.attributes,
          onClick,
          style: {
            ...style,
            fontWeight: "bold",
          },
        },
        props.children,
      )
    }
    if (props.leaf.italic) {
      return vueJsxCompat(
        "em",
        {
          ...props.attributes,
          onClick,
          style,
        },
        props.children,
      )
    }
    if (props.leaf.underline) {
      return vueJsxCompat(
        "u",
        {
          ...props.attributes,
          onClick,
          style,
        },
        props.children,
      )
    }
    if (props.leaf.strikethrough) {
      return vueJsxCompat(
        "s",
        {
          ...props.attributes,
          onClick,
          style,
        },
        props.children,
      )
    }
    if (props.leaf.code) {
      return vueJsxCompat(
        "code",
        {
          ...props.attributes,
          onClick,
          style,
        },
        props.children,
      )
    }
    if (props.leaf.subscript) {
      return vueJsxCompat(
        "sub",
        {
          ...props.attributes,
          onClick,
          style,
        },
        props.children,
      )
    }
    if (props.leaf.superscript) {
      return vueJsxCompat(
        "sup",
        {
          ...props.attributes,
          onClick,
          style,
        },
        props.children,
      )
    }
    return vueJsxCompat(
      "span",
      {
        ...props.attributes,
        onClick,
        style,
      },
      props.children,
    )
  }
}
