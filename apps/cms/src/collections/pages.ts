import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields"

import { AwardsBlock } from "@/blocks/awards-block"
import { BentoBlock } from "@/blocks/bento-block"
import { BrandBlock } from "@/blocks/brand-block"
import { ClientsBlock } from "@/blocks/clients-block"
import { CtaBlock } from "@/blocks/cta-block"
import { FAQBlock } from "@/blocks/faq-block"
import { FeaturesBlock } from "@/blocks/features-block"
import { FormBlock } from "@/blocks/form-block"
import { GridBlock } from "@/blocks/grid-block"
import { JobsBlock } from "@/blocks/jobs-block"
import { MilestonesBlock } from "@/blocks/milestones-block"
import { ProseBlock } from "@/blocks/prose-block"
import { RelatedPostsBlock } from "@/blocks/related-posts-block"
import { StatsBlock } from "@/blocks/stats-block"
import { TeamBlock } from "@/blocks/team-block"
import { TestimonialsBlock } from "@/blocks/testimonials-block"
import { TextBlock } from "@/blocks/text-block"
import { hero } from "@/fields/hero"
import { slugField } from "@/fields/slug"
import { populatePublishedAt } from "@/hooks/populate-published-at"
import { triggerDeploy } from "@/hooks/trigger-deploy"
import { getParentsTree } from "@/lib/breadcrumb"
import { generatePreviewUrl } from "@/lib/preview"
import { authenticated } from "@/policies/authenticated"
import { published } from "@/policies/published"
import { webDesigner } from "@/policies/web-designer"

import type { CollectionConfig } from "payload"

export const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    admin: authenticated,
    create: webDesigner,
    delete: webDesigner,
    read: published,
    readVersions: webDesigner,
    update: webDesigner,
    unlock: webDesigner,
  },
  admin: {
    defaultColumns: ["title", "slug", "_status", "publishedAt", "updatedAt"],
    livePreview: {
      url: async ({ data, locale, payload }) => {
        const parents = await getParentsTree(data, "pages", payload)
        const path = "/" + parents.map((parent) => parent.slug).join("/")
        return generatePreviewUrl({
          id: data.id,
          path,
          locale: locale.code,
        })
      },
    },
    preview: async (data, { locale, req }) => {
      const parents = await getParentsTree(data, "pages", req.payload)
      const path = "/" + parents.map((parent) => parent.slug).join("/")
      return generatePreviewUrl({
        id: data.id as string,
        path,
        locale,
      })
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
          label: "Hero",
          fields: [hero],
        },
        {
          label: "Content",
          fields: [
            {
              name: "layout",
              type: "blocks",
              defaultValue: [],
              required: false,
              blocks: [
                TextBlock,
                ProseBlock,
                CtaBlock,
                MilestonesBlock,
                ClientsBlock,
                FeaturesBlock,
                AwardsBlock,
                StatsBlock,
                GridBlock,
                BentoBlock,
                TestimonialsBlock,
                FAQBlock,
                TeamBlock,
                RelatedPostsBlock,
                FormBlock,
                BrandBlock,
                JobsBlock,
              ],
            },
          ],
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
