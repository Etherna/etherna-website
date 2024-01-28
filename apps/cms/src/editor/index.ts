import { defineInterface, useStores } from "@directus/extensions-sdk"
import { findCollectionName, useUserLang } from "../shared/utils/system"
import { fixedSvgImport, svgStringToHtmlElement } from "../shared/utils/vue"
import InterfaceComponent from "./block-editor-input.vue"
import PreviewSVG from "./preview.svg"

import type { AppCollection } from "@directus/types"

export default defineInterface({
  id: "block-editor-input",
  name: "Block Editor",
  icon: "view_stream",
  description: "Blocks based content editor",
  preview: fixedSvgImport(svgStringToHtmlElement(PreviewSVG)),
  types: ["json"],
  group: "standard",
  component: InterfaceComponent,
  options: () => {
    const { useCollectionsStore } = useStores()
    const collectionsStore = useCollectionsStore()
    const userLang = useUserLang()

    const collections = collectionsStore.allCollections as AppCollection[]

    const choices = collections
      .filter((c) => c.type === "table")
      .map((collection) => ({
        text: findCollectionName(collection, userLang),
        value: collection.collection,
      }))

    return [
      {
        field: "linkCollections",
        type: "json",
        name: "Link collections",
        schema: {
          data_type: "json",
        },
        meta: {
          interface: "select-dropdown",
          options: {
            choices,
            multiple: true,
          },
        },
      },
    ]
  },
})
