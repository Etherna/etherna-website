import { defineInterface, useStores } from "@directus/extensions-sdk"
import { findCollectionName, useUserLang } from "../shared/utils/system"
import { fixedSvgImport, svgStringToHtmlElement } from "../shared/utils/vue"
import PreviewSVG from "./preview.svg"
import InterfaceComponent from "./visual-builder-input.vue"

import type { AppCollection } from "@directus/types"

export default defineInterface({
  id: "visual-builder-input",
  name: "Visual builder",
  icon: "view_compact_alt",
  description: "Blocks based ui visual builder",
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
