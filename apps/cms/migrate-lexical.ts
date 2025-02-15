import {
  convertSlateNodesToLexical,
  convertSlateToLexical,
  defaultSlateConverters,
} from "@payloadcms/richtext-lexical/migrate"
import ObjectID from "bson-objectid"
import { getPayload } from "payload"

import buildConfig from "./payload.config"

import type { Post } from "@payload-types"
import type {
  SerializedBlockNode,
  SerializedHorizontalRuleNode,
  SerializedTableCellNode,
  SerializedTableNode,
  SerializedTableRowNode,
  SerializedUploadNode,
  SlateNode,
} from "@payloadcms/richtext-lexical"

const payload = await getPayload({
  config: await buildConfig,
})

for (const locale of ["en", "it"] as const) {
  const posts = await payload.find({
    collection: "posts",
    locale,
  })

  for (const post of posts.docs) {
    if ("root" in post.content) {
      continue
    }

    console.log("Converting", post.title)

    const state = convertSlateToLexical({
      converters: [
        ...defaultSlateConverters,
        {
          converter({ slateNode }) {
            return {
              type: "upload",
              fields: {},
              format: "",
              relationTo: "media",
              value: slateNode.src || "",
              version: 2,
            } as const as SerializedUploadNode
          },
          nodeTypes: ["img"],
        },
        {
          converter({ slateNode, converters }) {
            return {
              type: "table",
              fields: {},
              format: "",
              direction: "ltr",
              indent: 0,
              children: convertSlateNodesToLexical({
                canContainParagraphs: false,
                converters,
                parentNodeType: "table",
                slateNodes: slateNode.children ?? [],
              }),
              version: 1,
            } as const as SerializedTableNode
          },
          nodeTypes: ["table"],
        },
        {
          converter({ slateNode, converters }) {
            return {
              type: "tablerow",
              fields: {},
              format: "",
              direction: "ltr",
              indent: 0,
              children: convertSlateNodesToLexical({
                canContainParagraphs: false,
                converters,
                parentNodeType: "tablerow",
                slateNodes: slateNode.children ?? [],
              }),
              version: 1,
            } as const as SerializedTableRowNode
          },
          nodeTypes: ["tr"],
        },
        {
          converter({ slateNode, converters }) {
            return {
              type: "tablecell",
              fields: {},
              format: "",
              direction: "ltr",
              indent: 0,
              headerState: slateNode.type === "th" ? 1 : 0,
              children: convertSlateNodesToLexical({
                canContainParagraphs: true,
                converters,
                parentNodeType: "tablecell",
                slateNodes: slateNode.children ?? [],
              }),
              version: 1,
            } as const as SerializedTableCellNode
          },
          nodeTypes: ["th", "td"],
        },
        {
          converter({ slateNode, converters }) {
            return {
              type: "block",
              fields: {
                id: new ObjectID().toHexString(),
                code: "let i = 0",
                language: "ts",
                blockName: "",
                blockType: "code",
              },
              format: "",
              direction: "ltr",
              version: 2,
            } as const as SerializedBlockNode
          },
          nodeTypes: ["code"],
        },
        {
          converter({ slateNode, converters }) {
            return {
              type: "horizontalrule",
              fields: {},
              format: "",
              direction: "ltr",
              version: 1,
            } as const as SerializedHorizontalRuleNode
          },
          nodeTypes: ["hr"],
        },
      ],
      slateData: post.content as unknown as SlateNode[],
    })

    await payload.update({
      collection: "posts",
      id: post.id,
      locale,
      data: {
        content: state as Post["content"],
      },
    })
  }
}

process.exit(0)
