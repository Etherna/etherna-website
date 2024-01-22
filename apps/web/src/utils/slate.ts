import { Element, Text } from "slate"

import { getWordsCount } from "./string"

import type { SlateDescendant } from "@mattiaz9/slate-jsx"

export const getSlateWordsCount = (children: SlateDescendant[]) => {
  let count = 0

  const walkChildren = (blockChildren: SlateDescendant[]) => {
    if (Text.isText(blockChildren)) {
      count += getWordsCount(blockChildren.text)
    }
    if (Element.isElement(blockChildren)) {
      walkChildren(blockChildren.children as SlateDescendant[])
    }
  }

  walkChildren(children)

  return count
}
