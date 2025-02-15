import { lexicalEditor } from "@payloadcms/richtext-lexical"

import { populatePublishedAt } from "./hooks/populate-published-at"
import { triggerDeploy } from "./hooks/trigger-deploy"
import { someAccess } from "@/lib/access"
import { authenticated } from "@/policies/authenticated"
import { published } from "@/policies/published"
import { webDesigner } from "@/policies/web-designer"

import type { CollectionConfig } from "payload"

export const Jobs: CollectionConfig = {
  slug: "jobs",
  access: {
    admin: authenticated,
    create: webDesigner,
    delete: webDesigner,
    read: someAccess(authenticated, published),
    readVersions: webDesigner,
    update: webDesigner,
    unlock: webDesigner,
  },
  admin: {
    defaultColumns: ["name", "location", "salary", "type", "createdAt", "_status"],
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "location",
      type: "text",
    },
    {
      name: "salary",
      type: "text",
    },
    {
      name: "type",
      type: "select",
      options: [
        { label: "Full-time", value: "full-time" },
        { label: "Part-time", value: "part-time" },
        { label: "Contract", value: "contract" },
        { label: "Freelance", value: "freelance" },
        { label: "Internship", value: "internship" },
      ],
    },
    {
      name: "description",
      type: "richText",
      localized: true,
      required: false,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures]
        },
      }),
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
    },
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [triggerDeploy],
  },
  versions: {
    drafts: {
      autosave: false,
    },
    maxPerDoc: 1,
  },
}
