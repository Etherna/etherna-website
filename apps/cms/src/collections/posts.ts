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
import { DEFAULT_LOCALE } from "payload.i18n"

import { CodeBlock } from "@/blocks/code-block"
import { deleteLocaleField } from "@/fields/delete-locale"
import { slugField } from "@/fields/slug"
import { populateAuthors } from "@/hooks/populate-authors"
import { populatePublishedAt } from "@/hooks/populate-published-at"
import { triggerDeploy } from "@/hooks/trigger-deploy"
import { someAccess } from "@/lib/access"
import { generatePreviewUrl } from "@/lib/preview"
import { authenticated } from "@/policies/authenticated"
import { postAuthorOrEditor } from "@/policies/post-author-or-editor"
import { postContributor } from "@/policies/post-contributor"
import { postEditor } from "@/policies/post-editor"
import { manuallyPublished } from "@/policies/published"

import type { CollectionConfig } from "payload"

export const Posts: CollectionConfig = {
  slug: "posts",
  access: {
    admin: authenticated,
    create: postContributor,
    delete: postEditor,
    read: someAccess(authenticated, manuallyPublished),
    readVersions: postEditor,
    update: postAuthorOrEditor,
    unlock: postEditor,
  },
  admin: {
    defaultColumns: ["title", "slug", "_status", "publishedAt", "updatedAt"],
    livePreview: {
      url: async ({ data, locale }) => {
        const path = "/blog/" + data.slug
        return generatePreviewUrl({
          id: data.id,
          path,
          locale: locale.code,
        })
      },
    },
    preview: async (data, { locale }) => {
      const path = "/blog/" + data.slug
      return generatePreviewUrl({
        id: data.id as string,
        path,
        locale: locale,
      })
    },
    useAsTitle: "title",
    components: {
      edit: {
        beforeDocumentControls: [
          {
            path: "@/components/ai.tsx",
          },
        ],
      },
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      defaultValue: "Untitled Post",
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
              label: false,
              required: true,
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
              defaultValue: [],
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
    deleteLocaleField(),
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
        {
          name: "role",
          type: "text",
        },
        {
          name: "avatar",
          type: "relationship",
          relationTo: "media",
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [triggerDeploy],
    afterRead: [populateAuthors],
    beforeRead: [
      ({ doc, req }) => {
        let locale = req.locale ?? DEFAULT_LOCALE

        if (!(locale in (doc.slug ?? {}))) {
          locale = DEFAULT_LOCALE
        }

        doc.locale = locale

        return doc
      },
    ],
  },
  versions: {
    drafts: {
      autosave: false,
      schedulePublish: true,
    },
    maxPerDoc: 20,
  },
}
