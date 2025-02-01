"use client"

import React from "react"
import {
  createClientFeature,
  toolbarFormatGroupWithItems,
} from "@payloadcms/richtext-lexical/client"
import { $isRangeSelection, FORMAT_TEXT_COMMAND } from "@payloadcms/richtext-lexical/lexical"

import { HighlighterIcon } from "lucide-react"

import type { ToolbarGroup } from "@payloadcms/richtext-lexical"

const toolbarGroups: ToolbarGroup[] = [
  toolbarFormatGroupWithItems([
    {
      ChildComponent: () =>
        React.createElement(HighlighterIcon, {
          size: 14,
          style: {
            color: "var(--theme-elevation-600)",
          },
        }),
      isActive: ({ selection }) => {
        if ($isRangeSelection(selection)) {
          return selection.hasFormat("highlight")
        }
        return false
      },
      key: "highlight",
      onSelect: ({ editor }) => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight")
      },
      order: 3,
    },
  ]),
]

export const HighlightFeatureClient = createClientFeature({
  toolbarFixed: {
    groups: toolbarGroups,
  },
  toolbarInline: {
    groups: toolbarGroups,
  },
})
