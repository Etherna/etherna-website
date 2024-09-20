import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields"
import {
  BlockquoteFeature,
  BlocksFeature,
  ChecklistFeature,
  EXPERIMENTAL_TableFeature,
  IndentFeature,
  InlineCodeFeature,
  lexicalEditor,
  OrderedListFeature,
  ParagraphFeature,
  UnorderedListFeature,
  UploadFeature,
} from "@payloadcms/richtext-lexical"

import { populateAuthors } from "./hooks/populate-authors"
import { triggerDeploy } from "./hooks/trigger-deploy"
import { CodeBlock } from "@/blocks/code-block"
import { slugField } from "@/fields/slug"
import { someAccess } from "@/lib/access"
import { generatePreviewUrl } from "@/lib/preview"
import { admin } from "@/policies/admin"
import { authenticated } from "@/policies/authenticated"
import { postAuthor } from "@/policies/post-author"
import { postContributor } from "@/policies/post-contributor"
import { postEditor } from "@/policies/post-editor"
import { published } from "@/policies/published"

import type { CollectionConfig } from "payload"

export const Posts: CollectionConfig = {
  slug: "posts",
  access: {
    admin: authenticated,
    create: someAccess(admin, postEditor, postContributor),
    delete: someAccess(admin, postEditor),
    read: someAccess(authenticated, published),
    readVersions: someAccess(admin, postEditor),
    update: someAccess(admin, postEditor, postAuthor),
    unlock: someAccess(admin, postEditor),
  },
  admin: {
    defaultColumns: ["title", "slug", "updatedAt"],
    livePreview: {
      url: async ({ data, locale }) => {
        const path = "/blog/" + data.slug
        return generatePreviewUrl(path, locale.code)
      },
    },
    preview: async (data, { locale }) => {
      const path = "/blog/" + data.slug
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
          label: "Content",
          fields: [
            {
              name: "content",
              type: "richText",
              localized: true,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    InlineCodeFeature(),
                    BlockquoteFeature(),
                    IndentFeature(),
                    OrderedListFeature(),
                    UnorderedListFeature(),
                    EXPERIMENTAL_TableFeature(),
                    UploadFeature(),
                    ChecklistFeature(),
                    ParagraphFeature(),
                    BlocksFeature({ blocks: [CodeBlock] }),
                  ]
                },
              }),
              label: false,
              required: true,
            },
          ],
        },
        {
          label: "Meta",
          fields: [
            {
              name: "relatedPosts",
              type: "relationship",
              admin: {
                position: "sidebar",
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              relationTo: "posts",
            },
            {
              name: "categories",
              type: "relationship",
              admin: {
                position: "sidebar",
              },
              hasMany: true,
              relationTo: "categories",
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
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === "published" && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: "editedAt",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
    },
    {
      name: "thumbnail",
      label: "Thumbnail",
      type: "upload",
      localized: true,
      relationTo: "media",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "authors",
      type: "relationship",
      admin: {
        position: "sidebar",
      },
      hasMany: true,
      relationTo: "users",
    },
    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    {
      name: "populatedAuthors",
      type: "array",
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: "id",
          type: "text",
        },
        {
          name: "name",
          type: "text",
        },
      ],
    },
  ],
  hooks: {
    afterChange: [triggerDeploy],
    afterRead: [populateAuthors],
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
