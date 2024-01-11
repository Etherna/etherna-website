import { defineInterface, useStores } from "@directus/extensions-sdk"
import { Field } from "@directus/types"
import { fixedSvgImport, svgStringToHtmlElement } from "../shared/utils/vue"
import PreviewSVG from "./preview.svg"
import InterfaceComponent from "./seo-input.vue"

export default defineInterface({
  id: "seo-input",
  name: "SEO",
  icon: "checklist",
  description: "SEO metadata editor",
  preview: fixedSvgImport(svgStringToHtmlElement(PreviewSVG)),
  types: ["json"],
  group: "standard",
  component: InterfaceComponent,
  options: ({ collection }) => {
    const { useFieldsStore } = useStores()
    const fieldsStore = useFieldsStore()
    const fields = fieldsStore.getFieldsForCollection(collection) as Field[]

    return [
      {
        field: "titleField",
        name: "Title field",
        type: "json",
        schema: {
          data_type: "json",
        },
        meta: {
          interface: "select-dropdown",
          note: "The default value used when no title is specified.",
          options: {
            choices: fields.map((field) => ({
              text: field.name,
              value: field.field,
            })),
          },
        },
      },
      {
        field: "descriptionField",
        name: "Description field",
        type: "json",
        schema: {
          data_type: "json",
        },
        meta: {
          interface: "select-dropdown",
          note: "The default value used when no description is specified.",
          options: {
            choices: fields.map((field) => ({
              text: field.name,
              value: field.field,
            })),
          },
        },
      },
      {
        field: "slugField",
        name: "Slug field",
        type: "json",
        schema: {
          data_type: "json",
        },
        meta: {
          interface: "select-dropdown",
          note: "The default value used to preview the url.",
          options: {
            choices: fields.map((field) => ({
              text: field.name,
              value: field.field,
            })),
          },
        },
      },
      {
        field: "separator",
        name: "Separator character",
        type: "string",
        schema: {
          default_value: "|",
        },
        meta: {
          interface: "input",
          options: {
            softLength: 1,
            max: 1,
          },
        },
      },
    ]
  },
})
