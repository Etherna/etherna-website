import React from "react"

import { CodeBlock } from "../blocks/code-block"
import { Document } from "../common/document"
import { Image } from "../common/image"
import {
  IS_BOLD,
  IS_CODE,
  IS_HIGHLIGHT,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from "@/lib/lexical"

import type { BundledUploadFields } from "@/lib/bundle"
import type { NodeType } from "@/lib/lexical"

interface RichTextProps {
  nodes: {
    type: string
    version: number
    [k: string]: unknown
  }[]
  highlightStyles?: React.CSSProperties
}

export function RichText({ nodes, highlightStyles }: RichTextProps) {
  return (
    <>
      {(nodes as NodeType[]).map((node, index) => {
        if (node == null) {
          return null
        }

        if (node.type === "text") {
          let text = <React.Fragment key={index}>{node.text}</React.Fragment>

          if (node.format & IS_BOLD) {
            text = <strong key={index}>{text}</strong>
          }
          if (node.format & IS_ITALIC) {
            text = <em key={index}>{text}</em>
          }
          if (node.format & IS_STRIKETHROUGH) {
            text = (
              <span key={index} style={{ textDecoration: "line-through" }}>
                {text}
              </span>
            )
          }
          if (node.format & IS_UNDERLINE) {
            text = (
              <span key={index} style={{ textDecoration: "underline" }}>
                {text}
              </span>
            )
          }
          if (node.format & IS_CODE) {
            text = <code key={index}>{node.text}</code>
          }
          if (node.format & IS_SUBSCRIPT) {
            text = <sub key={index}>{text}</sub>
          }
          if (node.format & IS_SUPERSCRIPT) {
            text = <sup key={index}>{text}</sup>
          }
          if (node.format & IS_HIGHLIGHT) {
            text = (
              <mark key={index} style={highlightStyles}>
                {text}
              </mark>
            )
          }

          return text
        }

        if (node.type === "block") {
          const block = node.fields

          const blockType = block?.blockType

          if (!block || !blockType) {
            return null
          }

          switch (blockType) {
            case "code":
              return <CodeBlock key={index} {...block} />
            default:
              return null
          }
        }

        switch (node.type) {
          case "linebreak": {
            return <br key={index} />
          }
          case "paragraph": {
            return (
              <p key={index}>
                <RichText nodes={node.children} highlightStyles={highlightStyles} />
              </p>
            )
          }
          case "heading": {
            const Tag = node?.tag
            return (
              <Tag key={index}>
                <RichText nodes={node.children} highlightStyles={highlightStyles} />
              </Tag>
            )
          }
          case "list": {
            const Tag = node?.tag
            return (
              <Tag key={index}>
                <RichText nodes={node.children} highlightStyles={highlightStyles} />
              </Tag>
            )
          }
          case "listitem": {
            if (node?.checked != null) {
              return (
                <li
                  key={index}
                  aria-checked={node.checked ? "true" : "false"}
                  className={` ${node.checked ? "" : ""}`}
                  role="checkbox"
                  tabIndex={-1}
                  value={node?.value}
                >
                  <RichText nodes={node.children} highlightStyles={highlightStyles} />
                </li>
              )
            } else {
              return (
                <li key={index} value={node?.value}>
                  <RichText nodes={node.children} highlightStyles={highlightStyles} />
                </li>
              )
            }
          }
          case "quote": {
            return (
              <blockquote key={index}>
                <RichText nodes={node.children} highlightStyles={highlightStyles} />
              </blockquote>
            )
          }
          case "link": {
            const fields = node.fields

            return (
              <a key={index} href={fields.url} target={fields.newTab ? "_blank" : undefined}>
                <RichText nodes={node.children} highlightStyles={highlightStyles} />
              </a>
            )
          }
          case "upload": {
            const fields = node.fields as BundledUploadFields

            if (fields.image) {
              return <Image image={fields.image} />
            } else if (fields.file) {
              return <Document file={fields.file} />
            }

            return null
          }

          default:
            return null
        }
      })}
    </>
  )
}
