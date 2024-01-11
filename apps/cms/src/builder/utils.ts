import {
  createEditor as createSlateEditor,
  initSlate,
} from "@mattiaz9/slate-jsx"
import {
  BaseOperation,
  Editor,
  Element,
  NodeEntry,
  Path,
  Transforms,
} from "slate"
import { h, hydrate } from "vue"
import { renderToString } from "vue/server-renderer"
import {
  CodeBlock,
  HeadingBlock,
  ImageBlock,
  Leaf,
  ListBlock,
  ListItemBlock,
  ParagraphBlock,
  QuoteBlock,
  TableBlock,
  TableCellBlock,
  TableRowBlock,
} from "../shared/blocks/textual"
import { ButtonBlock } from "./blocks/button"
import { CardBlock } from "./blocks/card"
import { ClientsBlock } from "./blocks/clients"
import { ClientBlock } from "./blocks/clients/client"
import { FeaturesBlock } from "./blocks/features"
import { FeatureBlock } from "./blocks/features/feature"
import { HeroBlock } from "./blocks/hero"
import { ListOfBlock } from "./blocks/list-of"
import { SectionBlock } from "./blocks/section"
import { LayoutProps, UiBlock } from "./blocks/ui-block"

import type {
  SlateBlock,
  SlateDescendant,
  SlateElement,
} from "@mattiaz9/slate-jsx"

export const emptyValue: SlateDescendant[] = [new HeroBlock().emptyBlock]

const enable_logging = true

const blocks = [
  new ParagraphBlock(),
  new HeadingBlock("h1"),
  new HeadingBlock("h2"),
  new HeadingBlock("h3"),
  new HeadingBlock("h4"),
  new HeadingBlock("h5"),
  new HeadingBlock("h6"),
  new ImageBlock(),
  new ListBlock("ul"),
  new ListBlock("ol"),
  new ListItemBlock(),
  new QuoteBlock(),
  new CodeBlock(),
  new TableBlock(),
  new TableRowBlock(),
  new TableCellBlock("td"),
  new TableCellBlock("th"),
  new SectionBlock(),
  new HeroBlock(),
  new ButtonBlock(),
  new ClientsBlock(),
  new ClientBlock(),
  new CardBlock(),
  new FeaturesBlock(),
  new FeatureBlock(),
] as const

export function fixInitialValue(
  initialValue: SlateDescendant[] | null,
): SlateDescendant[] {
  let children = JSON.parse(JSON.stringify(initialValue ?? emptyValue))

  const normalizer = createSlateEditor(blocks, new Leaf())
  normalizer.blocks = blocks
  normalizer.children = children

  // fix all node entries
  const nodes = Editor.nodes<SlateElement<any>>(normalizer, {
    at: [],
    mode: "all",
    match: (node) => Element.isElement(node),
  })

  let currentEntry = nodes.next()
  while (!currentEntry.done) {
    const [node, path] = currentEntry.value

    const block = blocks.find(
      (block) => "type" in node && block.id === node.type,
    )

    if (block && "layout" in block.options && block.options.layout?.length) {
      fixNodeLayout(normalizer, block.options.layout, path)
    }

    currentEntry = nodes.next()
  }

  children = JSON.parse(JSON.stringify(normalizer.children))

  return children
}

export function createEditor(
  element: HTMLElement,
  initialValue?: SlateDescendant[] | null,
) {
  const editor = initSlate(element, {
    defaultValue: JSON.parse(JSON.stringify(initialValue ?? emptyValue)),
    blocks,
    leaf: new Leaf(),
    renderToString,
    hydrate: hydrate,
    h: h as any,
  })
  editor.normalizeNode = normalize()
  editor.getElementBlock = (
    element: SlateElement<any>,
    nestedTree: SlateElement<any>[],
  ) => {
    if (ListOfBlock.assert(element)) {
      let sectionId: string | undefined = undefined
      const firstParent = nestedTree[0]
      const secondParent = nestedTree[1]

      if (SectionBlock.assert(firstParent)) {
        sectionId = firstParent.id
      }

      const mainParent = sectionId ? secondParent : firstParent
      const block = blocks.find((block) => block.id === mainParent?.type)

      if (block && block instanceof UiBlock) {
        let layout = block.options.layout

        if (sectionId) {
          const sectionBlock = block.options.layout?.find(
            (l) =>
              l.block instanceof SectionBlock &&
              l.block.sectionId === sectionId,
          )?.block as SectionBlock | undefined
          if (sectionBlock) {
            layout = sectionBlock.options.layout
          }
        }

        const listOfBLock = layout?.find((l) => l.block.id === element.type)
          ?.block
        return listOfBLock
      }
    }

    return blocks.find((block) => block.id === element.type)
  }

  return editor

  function normalize() {
    const callback = editor.normalizeNode

    return function (
      [node, path]: NodeEntry,
      options?: { operation?: BaseOperation | undefined } | undefined,
    ) {
      const block = editor.blocks.find(
        (block) => "type" in node && block.id === node.type,
      )

      if (block && "layout" in block.options && block.options.layout?.length) {
        // clearExtraNodes(editor, block.options.layout, path)
        // sortNodes(editor, block.options.layout, path)
        fixNodeLayout(editor, block.options.layout, path)
      }

      return callback([node, path])
    }
  }
}

function isNodeMatchingBlock(
  node: SlateElement<any, any>,
  block: SlateBlock<any, any> | null | undefined,
) {
  return (
    block &&
    node.type === block.id &&
    (block instanceof SectionBlock ? node.id === block.sectionId : true)
  )
}

function clearExtraNodes<T extends ReturnType<typeof createEditor>>(
  editor: T,
  layout: LayoutProps<any>[],
  path: Path,
) {
  Editor.withoutNormalizing(editor, () => {
    Transforms.removeNodes(editor, {
      at: path,
      match: (node) =>
        Element.isElement(node)
          ? !layout.some((b) => isNodeMatchingBlock(node, b.block))
          : true,
    })
  })
}

function sortNodes<T extends ReturnType<typeof createEditor>>(
  editor: T,
  layout: LayoutProps<any>[],
  path: Path,
) {
  Editor.withoutNormalizing(editor, () => {
    const nodes = [...Editor.nodes(editor, { at: path })]

    const sortedNodes = nodes.sort((a, b) => {
      const aIndex = layout.findIndex((l) =>
        isNodeMatchingBlock(a[0] as SlateElement<any>, l.block),
      )
      const bIndex = layout.findIndex((l) =>
        isNodeMatchingBlock(b[0] as SlateElement<any>, l.block),
      )

      return aIndex - bIndex
    })

    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i]![1].length !== sortedNodes[i]![1].length) {
        Transforms.moveNodes(editor, {
          at: sortedNodes[i]![1],
          to: nodes[i]![1],
        })
      }
    }
  })
}

function fixNodeLayout<T extends ReturnType<typeof createEditor>>(
  editor: T,
  layout: LayoutProps<any>[],
  path: Path,
) {
  let currentBlockCount = 0

  const logger = {
    log(...args: any[]) {
      if (enable_logging) console.log(...args)
    },
    group(label: string, ...args: any[]) {
      if (enable_logging) console.group(label, ...args)
    },
    groupEnd() {
      if (enable_logging) console.groupEnd()
    },
  }

  const nextBlockGenerator = function* () {
    for (const b of layout) {
      currentBlockCount = 0
      yield b
    }
  }

  const layoutGenerator = nextBlockGenerator()
  let next = layoutGenerator.next()
  let nextBlock = next.value
  let childIndex = 0

  const normalizeCurrentBlock = () => {
    if (
      nextBlock &&
      nextBlock.block instanceof SectionBlock &&
      nextBlock.block.options.layout?.length
    ) {
      fixNodeLayout(editor, nextBlock.block.options.layout, [
        ...path,
        childIndex,
      ])
    }
  }

  const goNext = () => {
    next = layoutGenerator.next()
    nextBlock = next.value
  }

  Editor.withoutNormalizing(editor, () => {
    while (nextBlock) {
      const childPath = [...path, childIndex] as Path

      logger.group("normalizeNode", childPath, nextBlock)

      if (childIndex > 10) {
        logger.groupEnd()
        break
      }

      if (!Editor.hasPath(editor, childPath)) {
        if (next.done) {
          logger.groupEnd()
          break
        }
        if (nextBlock.multiple && currentBlockCount > 0) {
          logger.groupEnd()
          goNext()
          continue
        }

        logger.log("inserting missing node")

        Transforms.insertNodes(
          editor,
          {
            ...nextBlock!.block.emptyBlock,
            ...nextBlock!.props,
          },
          {
            at: childPath,
          },
        )

        goNext()
        childIndex++
        currentBlockCount++
        logger.groupEnd()
        break
      }

      if (next.done) {
        logger.log("removing extra node")
        logger.groupEnd()
        Transforms.removeNodes(editor, { at: childPath })
        continue
      }

      const node = Editor.node(editor, childPath)[0] as SlateElement<any>

      if (nextBlock.multiple) {
        if (isNodeMatchingBlock(node, nextBlock.block)) {
          logger.log("matching multiple block")
          logger.groupEnd()

          normalizeCurrentBlock()

          childIndex++
          currentBlockCount++
          continue
        } else if (currentBlockCount > 0) {
          logger.log("stop multiple node", node, nextBlock.block)
          goNext()
        }
      }

      if (!nextBlock) continue

      if (!isNodeMatchingBlock(node, nextBlock.block)) {
        logger.log("inserting new node", {
          ...nextBlock!.block.emptyBlock,
          ...nextBlock!.props,
        })

        if (!layout.some((b) => isNodeMatchingBlock(node, b.block))) {
          Transforms.removeNodes(editor, { at: childPath })
        }

        Transforms.insertNodes(
          editor,
          {
            ...nextBlock!.block.emptyBlock,
            ...nextBlock!.props,
          },
          {
            at: childPath,
          },
        )

        if (nextBlock.multiple) {
          currentBlockCount++
        }
      }

      if (!nextBlock?.multiple) {
        logger.log("next node")
        normalizeCurrentBlock()
        goNext()
      }

      logger.groupEnd()

      childIndex++
    }
  })
}

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
