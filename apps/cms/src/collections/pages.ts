import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields"

import { populatePublishedAt } from "./hooks/populate-published-at"
import { triggerDeploy } from "./hooks/trigger-deploy"
import { authenticated } from "@/access/authenticated"
import { authenticatedOrPublished } from "@/access/authenticated-or-published"
import { hero } from "@/fields/hero"
import { slugField } from "@/fields/slug"
import { getParentsTree } from "@/lib/breadcrumb"
import { generatePreviewUrl } from "@/lib/preview"

import type { CollectionConfig } from "payload"

export const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["title", "slug", "updatedAt"],
    livePreview: {
      url: async ({ data, locale, payload }) => {
        const parents = await getParentsTree(data, "pages", payload)
        const path = "/" + parents.map((parent) => parent.slug).join("/")
        return generatePreviewUrl(path, locale.code)
      },
    },
    preview: async (data, { locale, req }) => {
      const parents = await getParentsTree(data, "pages", req.payload)
      const path = "/" + parents.map((parent) => parent.slug).join("/")
      return generatePreviewUrl(path, locale)
    },
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          fields: [
            hero,
            {
              name: "layout",
              type: "blocks",
              blocks: [],
              defaultValue: [],
              localized: true,
              required: false,
            },
          ],
          label: "Content",
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: "media",
            }),
            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,
              // field paths to match the target field for data
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
        },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [triggerDeploy],
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 20,
  },
}
