"use client"

import React from "react"
import {
  createClientFeature,
  toolbarFormatGroupWithItems,
} from "@payloadcms/richtext-lexical/client"

import { ListCollapseIcon } from "lucide-react"

import type { ToolbarGroup } from "@payloadcms/richtext-lexical"

const toolbarGroups: ToolbarGroup[] = [
  toolbarFormatGroupWithItems([
    {
      ChildComponent: () =>
        React.createElement(ListCollapseIcon, {
          size: 14,
          style: {
            color: "var(--theme-elevation-600)",
          },
        }),
      isActive: ({ selection }) => {
        // --
        return false
      },
      key: "collapsible",
      onSelect: ({ editor }) => {
        // editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight")
      },
      // order: 3,
    },
  ]),
]

export const CollapsibleFeatureClient = createClientFeature({
  toolbarFixed: {
    groups: toolbarGroups,
  },
  toolbarInline: {
    groups: toolbarGroups,
  },
})
