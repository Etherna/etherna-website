/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { cloneElement } from "react"
import parse from "html-react-parser"

import type { SVGAttributes } from "react"

interface SvgProps extends SVGAttributes<SVGSVGElement> {
  svgCode: string
}

export function Svg({ svgCode, ...props }: SvgProps) {
  if (!svgCode) return null

  return (
    <>
      {parse(svgCode, {
        transform(reactNode, domNode, index) {
          if ("name" in domNode && domNode.name === "svg") {
            return cloneElement(reactNode as any, {
              ...(reactNode as any).props,
              ...props,
              key: index,
            }) as any
          }
          return reactNode as any
        },
      })}
    </>
  )
}
