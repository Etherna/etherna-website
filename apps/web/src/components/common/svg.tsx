import React from "react"
import parse from "html-react-parser"

interface SvgProps extends React.ComponentProps<"svg"> {
  svg: string | React.ReactElement<{ children?: unknown }> | null | undefined
  defs?: React.ReactNode
}

type ReactElement = React.DetailedReactHTMLElement<React.HTMLAttributes<HTMLElement>, HTMLElement>

export function Svg({ svg, defs, ...props }: SvgProps) {
  if (!svg) return null

  if (typeof svg === "object") {
    return React.cloneElement(
      svg,
      {
        ...props,
        ...svg.props,
      },
      [
        defs ? React.createElement("defs", {}, defs) : null,
        ...((svg.props?.children ?? []) as ReactElement[]),
      ],
    )
  }

  return (
    <>
      {parse(svg, {
        transform(reactNode, domNode, index) {
          const nodeElement = reactNode as ReactElement
          if (reactNode && "name" in domNode && domNode.name === "svg") {
            return React.cloneElement(
              nodeElement,
              {
                ...nodeElement.props,
                ...(props as React.ComponentProps<"div">),
                key: index,
              },
              [
                defs ? React.createElement("defs", {}, defs) : null,
                ...(nodeElement.props.children as ReactElement[]),
              ],
            ) as ReactElement
          }
          return nodeElement
        },
      })}
    </>
  )
}
