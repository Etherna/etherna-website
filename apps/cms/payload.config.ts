import path from "path"
import { fileURLToPath } from "url"
import { postgresAdapter } from "@payloadcms/db-postgres"
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder"
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs"
import { redirectsPlugin } from "@payloadcms/plugin-redirects"
import { seoPlugin } from "@payloadcms/plugin-seo"
import {
  BoldFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  StrikethroughFeature,
  UnderlineFeature,
} from "@payloadcms/richtext-lexical"
import { migrations } from "migrations"
import { buildConfig } from "payload"
import { Locales } from "payload.i18n"
import sharp from "sharp"

import { schedulerPlugin } from "../../packages/payload-plugin-scheduler/src/index" // PATCH for ERR_MODULE_NOT_FOUND

import { Categories } from "@/collections/categories"
import { triggerDeploy } from "@/collections/hooks/trigger-deploy"
import { Jobs } from "@/collections/jobs"
import { Media } from "@/collections/media"
import { Pages } from "@/collections/pages"
import { Posts } from "@/collections/posts"
import { Users } from "@/collections/users"
import { Company } from "@/globals/company"
import { Footer } from "@/globals/footer"
import { Header } from "@/globals/header"
import { deployIfNeeded } from "@/schedules/deploy-if-needed"
import { fetchWorkflow } from "@/server/endpoints/fetch-workflow"
import { runDeploy } from "@/server/endpoints/run-deploy"
import { submitForm } from "@/server/endpoints/submit-form"

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
      beforeDashboard: ["@/components/before-dashboard#BeforeDashboard"],
    },
    avatar: {
      Component: {
        path: "@/components/avatar#UserAvatar",
      },
    },
    autoLogin: {
      email: process.env.PAYLOAD_AUTOLOGIN_EMAIL,
      password: process.env.PAYLOAD_AUTOLOGIN_PASSWORD,
      prefillOnly: true,
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
        HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4", "h5", "h6"] }),
        BoldFeature(),
        ItalicFeature(),
        UnderlineFeature(),
        StrikethroughFeature(),
        HorizontalRuleFeature(),
        InlineToolbarFeature(),
        LinkFeature({
          enabledCollections: ["pages", "posts"],
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
    push: process.env.NODE_ENV === "development",
    migrationDir: "migrations",
    prodMigrations: migrations,
    idType: "uuid",
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
    locales: Locales,
  },
  collections: [Pages, Posts, Categories, Jobs, Media, Users],
  globals: [Header, Footer, Company],
  cors: ["*"],
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ""].filter(Boolean),
  endpoints: [fetchWorkflow, runDeploy, submitForm],
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
        country: false,
        state: false,
      },
      redirectRelationships: ["pages", "posts"],
      formOverrides: {
        fields: ({ defaultFields }) => {
          const fields = defaultFields.map((field) => {
            if ("name" in field) {
              if (field.name === "confirmationMessage") {
                return {
                  ...field,
                  localized: true,
                  editor: lexicalEditor({
                    features: ({ rootFeatures }) => {
                      return [
                        ...rootFeatures,
                        HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
                      ]
                    },
                  }),
                }
              }
            }
            return field
          })

          fields.push(
            {
              name: "event",
              type: "select",
              defaultValue: "submission",
              options: [
                {
                  value: "submission",
                  label: "Submission",
                },
                {
                  value: "registration",
                  label: "Registration",
                },
              ],
            },
            {
              name: "mailchimpList",
              type: "text",
              required: true,
              admin: {
                condition: ({ event }) => event === "registration",
                width: "50%",
              },
            },
            {
              name: "mailchimpTags",
              type: "text",
              admin: {
                condition: ({ event }) => event === "registration",
                placeholder: "comma (,) separated tags",
                width: "50%",
              },
            },
          )

          return fields
        },
      },
    }),
    schedulerPlugin({
      jobs: [
        {
          name: "triggerDeploy",
          // every minute
          cron: "*/1 * * * *",
          handler: deployIfNeeded({
            collections: ["pages", "posts"],
          }),
        },
      ],
    }),
  ],
  secret: process.env.PAYLOAD_SECRET ?? "",
  sharp,
  typescript: {
    autoGenerate: true,
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
})
