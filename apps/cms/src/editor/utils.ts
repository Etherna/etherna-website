import { initSlate } from "@mattiaz9/slate-jsx"
import markdown from "remark-parse"
import slate from "remark-slate"
import { Editor, Element, Text, Transforms } from "slate"
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
} from "slate-blocks/textual"
import { unified } from "unified"
import { h, hydrate } from "vue"
import { renderToString } from "vue/server-renderer"

import type { SlateDescendant } from "@mattiaz9/slate-jsx"
import type { AxiosInstance } from "axios"
import type { InputNodeTypes } from "remark-slate"
import type { BaseEditor } from "slate"
import type { ImageElement } from "slate-blocks/textual"

const markdownNodeType: InputNodeTypes = {
  heading: {
    "1": "h1",
    "2": "h2",
    "3": "h3",
    "4": "h4",
    "5": "h5",
    "6": "h6",
  },
  block_quote: "blockquote",
  code_block: "code",
  image: "img",
  link: "a",
  ol_list: "ol",
  ul_list: "ul",
  listItem: "li",
  paragraph: "p",
  delete_mark: "strikethrough",
  strong_mark: "bold",
  inline_code_mark: "code",
  emphasis_mark: "italic",
  thematic_break: "hr",
}

export const emptyValue: SlateDescendant[] = [
  {
    type: "p",
    children: [{ text: "" }],
  },
]

export function createEditor(
  element: HTMLElement,
  initialValue?: SlateDescendant[] | null,
) {
  const editor = initSlate(element, {
    defaultValue: JSON.parse(JSON.stringify(initialValue ?? emptyValue)),
    blocks: [
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
    ],
    leaf: new Leaf(),
    renderToString,
    hydrate: hydrate,
    h: h as any,
  })

  return editor
}

export async function importPastedMarkdown(options: {
  event: ClipboardEvent
  editor: BaseEditor
  api: AxiosInstance
  insuccessCallback?: (event: ClipboardEvent) => void
}) {
  const { event, editor, api, insuccessCallback } = options

  event.preventDefault()
  event.stopImmediatePropagation()

  const text = event.clipboardData?.getData("text/plain")
  const content = await markdownToSlate(text || "")
  const isMd = content.some((node) => {
    const isElement = Element.isElement(node)
    if (!isElement) return false

    // if is an Element and something else than a paragraph, some markdown has parsed
    if (!ParagraphBlock.assert(node)) return true

    // if is a Paragraph, check if it has some marked text
    if (
      ParagraphBlock.assert(node) &&
      node.children.some(
        (n) => Leaf.assert(n) && Object.keys(n).some((mark) => mark !== "text"),
      )
    ) {
      return true
    }

    return false
  })

  if (isMd) {
    editor.insertFragment(content, {
      at: [editor.selection?.anchor.path?.[0] ?? 0],
    })

    // get images with src
    type ImportedImage = {
      type: "img"
      link: string
      children: SlateDescendant[]
    }
    const isImportedImg = (node: any): node is ImportedImage => {
      return (
        node &&
        typeof node === "object" &&
        node.type === "img" &&
        node.link &&
        !node.src
      )
    }

    const nodesGenerator = Editor.nodes<ImportedImage>(editor, {
      at: [],
      mode: "all",
      match(node, path) {
        return isImportedImg(node)
      },
    })

    let imgNodeValue = nodesGenerator.next()

    while (!imgNodeValue.done) {
      const id = await importImage(imgNodeValue.value[0].link, api)

      Transforms.setNodes<ImageElement & { link?: string }>(
        editor,
        {
          src: id || imgNodeValue.value[0].link,
          link: undefined,
        },
        {
          at: imgNodeValue.value[1],
        },
      )

      imgNodeValue = nodesGenerator.next()
    }
  } else {
    insuccessCallback?.(event)
  }
}

export async function markdownToSlate(
  markdownText: string,
): Promise<SlateDescendant[]> {
  let value: SlateDescendant[] = []

  // const lines = markdownText.split("\n")

  // for (const line of lines) {
  //   const lineResult = await unified()
  //     .use(markdown)
  //     .use(slate, { nodeTypes: markdownNodeType })
  //     .process(line)
  //   value = [...value, ...(lineResult.result as any)]
  // }

  value = (
    await unified()
      .use(markdown)
      .use(slate, { nodeTypes: markdownNodeType })
      .process(markdownText)
  ).result as SlateDescendant[]

  console.log("pre", JSON.parse(JSON.stringify(value)))

  value = value.flatMap((node) => {
    node = normalizeCodeBlock(node)

    return normalizeLineBreaks(node)
  })

  value = value.map((node) => {
    if (ListBlock.assert(node)) {
      node = normalizeList(node)
    }

    if (ParagraphBlock.assert(node)) {
      node = normalizeImageParagraph(node)
    }

    node = normalizeLinks(node)

    return node
  })

  console.group("markdown importing result")
  console.info(value)
  console.groupEnd()

  return value
}

function normalizeLineBreaks(node: SlateDescendant): SlateDescendant[] {
  if (Element.isElement(node)) {
    let splitNodes: SlateDescendant[] = []

    for (const childNode of node.children) {
      if (Text.isText(childNode) && childNode.text.includes("\n")) {
        const lines = childNode.text.split("\n")
        for (const line of lines) {
          splitNodes.push({
            ...node,
            children: [{ text: line }],
          })
        }
      }
    }

    if (splitNodes.length > 0) {
      return splitNodes
    }
  }

  return [node]
}

function normalizeList(node: SlateDescendant, level = 0) {
  if (ListBlock.assert(node)) {
    node.children = node.children.map((child) => {
      return {
        type: "li",
        level,
        children: [{ text: getNodetext(child) }],
      }
    })
  }

  return node
}

function normalizeCodeBlock(node: SlateDescendant) {
  if (CodeBlock.assert(node)) {
    if (node.children.length === 1 && Text.isText(node.children[0])) {
      const lines = node.children[0].text.split("\n")
      node.children = lines.map((line) => {
        return {
          type: "p",
          children: [{ text: line }],
        }
      })
    }
  }

  return node
}

function normalizeLinks(node: SlateDescendant): SlateDescendant {
  if (!Element.isElement(node)) return node
  if (!("type" in node)) return node
  if (typeof node.type !== "string") return node

  if (node.type === "a") {
    const text = Text.isText(node.children[0]) ? node.children[0].text : "link"
    const href = "link" in node ? node.link : ""
    return {
      text,
      href,
    }
  }

  return {
    ...node,
    children: node.children.map(normalizeLinks),
  }
}

function normalizeImageParagraph(
  node: SlateDescendant,
  level = 0,
): SlateDescendant {
  if (ParagraphBlock.assert(node)) {
    if (node.children.length === 1 && ImageBlock.assert(node.children[0])) {
      return node.children[0] as SlateDescendant
    }
  }

  return node
}

function getNodetext(node: unknown): string {
  if (Element.isElement(node)) {
    return node.children
      .map((child) => {
        if (Text.isText(child)) return child.text
        return getNodetext(child)
      })
      .join(" ")
  }
  return ""
}

async function importImage(
  url: string,
  api: AxiosInstance,
): Promise<string | null> {
  try {
    const resp = await fetch(url)

    if (!resp.ok) throw new Error("Image not found")

    const data = await resp.blob()

    const formData = new FormData()
    resp.headers.has("Content-Disposition") &&
      formData.append("file_1_title", resp.headers.get("Content-Disposition")!)
    formData.append("file", data)

    const uploadResp = await api.post<{ data: { id: string } }>(
      "/files",
      formData,
      {
        headers: {
          "Content-Type": resp.headers.get("Content-Type") || "",
        },
      },
    )

    console.log(uploadResp.data)

    return uploadResp.data.data.id
  } catch (error) {
    return null
  }
}
