import path from "path"
import { fileURLToPath } from "url"
import { postgresAdapter } from "@payloadcms/db-postgres"
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder"
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs"
import { redirectsPlugin } from "@payloadcms/plugin-redirects"
import { seoPlugin } from "@payloadcms/plugin-seo"
import {
  BoldFeature,
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  UnderlineFeature,
} from "@payloadcms/richtext-lexical"
import { buildConfig } from "payload"
import sharp from "sharp"

import { Categories } from "@/collections/categories"
import { triggerDeploy } from "@/collections/hooks/trigger-deploy"
import { Media } from "@/collections/media"
import { Pages } from "@/collections/pages"
import { Posts } from "@/collections/posts"
import { Users } from "@/collections/users"

import type { Field } from "payload"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      // beforeLogin: ["@/components/BeforeLogin"],
      // // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      // beforeDashboard: ["@/components/BeforeDashboard"],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 375,
          height: 667,
        },
        {
          label: "Tablet",
          name: "tablet",
          width: 768,
          height: 1024,
        },
        {
          label: "Desktop",
          name: "desktop",
          width: 1280,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: lexicalEditor({
    features: () => {
      return [
        UnderlineFeature(),
        BoldFeature(),
        ItalicFeature(),
        EXPERIMENTAL_TableFeature(),
        LinkFeature({
          // enabledCollections: ["pages", "posts"],
          fields: ({ defaultFields }) => {
            const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
              if ("name" in field && field.name === "url") return false
              return true
            })

            return [
              ...defaultFieldsWithoutUrl,
              {
                name: "url",
                type: "text",
                admin: {
                  condition: ({ linkType }) => linkType !== "internal",
                },
                label: ({ t }) => t("fields:enterURL"),
                required: true,
              },
            ]
          },
        }),
      ]
    },
  }),
  db: postgresAdapter({
    pool: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? "5432"),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
  }),
  localization: {
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        label: "English",
      },
      {
        code: "it",
        label: "Italian",
      },
    ],
  },
  collections: [Pages, Posts, Categories, Media, Users],
  globals: [],
  cors: ["*"],
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ""].filter(Boolean),
  endpoints: [],
  plugins: [
    redirectsPlugin({
      collections: ["pages", "posts"],
      overrides: {
        fields: ({ defaultFields }) => {
          return defaultFields.map((field) => {
            if ("name" in field && field.name === "from") {
              return {
                ...field,
                admin: {
                  description: "You will need to rebuild the website when changing this field.",
                },
              } as Field
            }
            return field
          })
        },
        hooks: {
          afterChange: [triggerDeploy],
        },
      },
    }),
    nestedDocsPlugin({
      collections: ["pages"],
      generateURL: (docs) => "/" + docs.map((doc) => doc.slug).join("/"),
    }),
    seoPlugin({
      generateTitle: ({ doc }) => {
        return doc?.title ? `${doc.title} | Etherna` : "Etherna"
      },
      generateURL: ({ doc }) => {
        return doc?.slug
          ? `${process.env.NEXT_PUBLIC_SERVER_URL ?? ""}/${doc.slug}`
          : (process.env.NEXT_PUBLIC_SERVER_URL ?? "")
      },
    }),
    formBuilderPlugin({
      fields: {
        payment: false,
      },
      formOverrides: {
        fields: ({ defaultFields }) => {
          return defaultFields.map((field) => {
            if ("name" in field) {
              if (field.name === "confirmationMessage") {
                return {
                  ...field,
                  localized: true,
                  editor: lexicalEditor({
                    features: ({ rootFeatures }) => {
                      return [
                        ...rootFeatures,
                        FixedToolbarFeature(),
                        HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
                      ]
                    },
                  }),
                }
              }
            }
            return field
          })
        },
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET ?? "",
  sharp,
  typescript: {
    autoGenerate: true,
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
})
