import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields"

import { populatePublishedAt } from "./hooks/populate-published-at"
import { triggerDeploy } from "./hooks/trigger-deploy"
import { AwardsBlock } from "@/blocks/awards-block"
import { BentoBlock } from "@/blocks/bento-block"
import { BrandBlock } from "@/blocks/brand-block"
import { ClientsBlock } from "@/blocks/clients-block"
import { CtaBlock } from "@/blocks/cta-block"
import { FAQBlock } from "@/blocks/faq-block"
import { FeaturesBlock } from "@/blocks/features-block"
import { FormBlock } from "@/blocks/form-block"
import { RelatedPostsBlock } from "@/blocks/related-posts-block"
import { StatsBlock } from "@/blocks/stats-block"
import { TestimonialsBlock } from "@/blocks/testimonials-block"
import { TextBlock } from "@/blocks/text-block"
import { MilestonesBlock } from "@/blocks/timeline-block"
import { hero } from "@/fields/hero"
import { slugField } from "@/fields/slug"
import { someAccess } from "@/lib/access"
import { getParentsTree } from "@/lib/breadcrumb"
import { generatePreviewUrl } from "@/lib/preview"
import { admin } from "@/policies/admin"
import { authenticated } from "@/policies/authenticated"
import { published } from "@/policies/published"
import { webDesigner } from "@/policies/web-designer"

import type { CollectionConfig } from "payload"

export const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    admin: authenticated,
    create: someAccess(admin, webDesigner),
    delete: someAccess(admin, webDesigner),
    read: someAccess(authenticated, published),
    readVersions: someAccess(admin, webDesigner),
    update: someAccess(admin, webDesigner),
    unlock: someAccess(admin, webDesigner),
  },
  admin: {
    defaultColumns: ["title", "slug", "_status", "publishedAt", "updatedAt"],
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
      defaultValue: "Untitled Page",
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
              blocks: [
                TextBlock,
                CtaBlock,
                MilestonesBlock,
                ClientsBlock,
                FeaturesBlock,
                AwardsBlock,
                StatsBlock,
                BentoBlock,
                TestimonialsBlock,
                FAQBlock,
                RelatedPostsBlock,
                FormBlock,
                BrandBlock,
              ],
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
              overrides: { localized: true },
            }),
            MetaImageField({
              relationTo: "media",
              overrides: { localized: true },
            }),
            MetaDescriptionField({
              overrides: { localized: true },
            }),
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
    ...slugField(),
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
    afterChange: [triggerDeploy],
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 1000, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 20,
  },
}
