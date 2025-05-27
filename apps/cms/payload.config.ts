import path from "path"
import { fileURLToPath } from "url"
import { postgresAdapter } from "@payloadcms/db-postgres"
import { nodemailerAdapter } from "@payloadcms/email-nodemailer"
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
import nodemailerSendgrid from "nodemailer-sendgrid"
import { buildConfig } from "payload"
import { DEFAULT_LOCALE, Locales } from "payload.i18n"
import sharp from "sharp"

import { Categories } from "@/collections/categories"
import { Jobs } from "@/collections/jobs"
import { Media } from "@/collections/media"
import { Pages } from "@/collections/pages"
import { Posts } from "@/collections/posts"
import { Users } from "@/collections/users"
import { Company } from "@/globals/company"
import { Footer } from "@/globals/footer"
import { Header } from "@/globals/header"
import { HighlightFeature } from "@/lexical/highlight/highlight-feature.server"
import { plugins } from "@/plugins"
import { deleteLocale } from "@/server/endpoints/delete-locale"
import { fetchWorkflow } from "@/server/endpoints/fetch-workflow"
import { generateThumbhash } from "@/server/endpoints/gen-thumbhash"
import { runDeploy } from "@/server/endpoints/run-deploy"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      beforeDashboard: ["@/components/before-dashboard#BeforeDashboard"],
    },
    avatar: {
      Component: {
        path: "@/components/avatar#UserAvatar",
      },
    },
    autoLogin:
      process.env.NODE_ENV === "development"
        ? {
            email: process.env.PAYLOAD_AUTOLOGIN_EMAIL,
            password: process.env.PAYLOAD_AUTOLOGIN_PASSWORD,
          }
        : undefined,
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
  email: process.env.SENDGRID_TOKEN
    ? nodemailerAdapter({
        defaultFromAddress: process.env.PAYLOAD_EMAIL_FROM || "no-reply@etherna.io",
        defaultFromName: "Etherna Website",
        transportOptions: nodemailerSendgrid({
          apiKey: process.env.SENDGRID_TOKEN,
        }),
      })
    : undefined,
  // This config helps us configure global or default features that the other editors can inherit
  editor: lexicalEditor({
    features: () => {
      return [
        HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4", "h5", "h6"] }),
        BoldFeature(),
        ItalicFeature(),
        UnderlineFeature(),
        StrikethroughFeature(),
        HighlightFeature(),
        HorizontalRuleFeature(),
        InlineToolbarFeature(),
        // CollapsibleFeature(),
        LinkFeature({
          enabledCollections: ["pages", "posts", "redirects"],
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
                  condition: (_, { linkType }) => linkType !== "internal",
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
    push: false,
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
    beforeSchemaInit: [
      ({ schema, adapter }) => {
        for (const tableName in adapter.rawTables) {
          const table = adapter.rawTables[tableName]

          if (!table) continue

          for (const fieldName in table.columns) {
            const column = table.columns[fieldName]

            if (column && column.type === "enum") {
              column.type = "varchar" as unknown as "enum"
            }
          }
        }
        return schema
      },
    ],
  }),
  localization: {
    defaultLocale: DEFAULT_LOCALE,
    locales: Locales,
    fallback: true,
  },
  collections: [Pages, Posts, Categories, Jobs, Media, Users],
  globals: [Header, Footer, Company],
  cors: [process.env.PAYLOAD_PUBLIC_FRONTEND_URL || ""].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ""].filter(Boolean),
  endpoints: [fetchWorkflow, runDeploy, deleteLocale, generateThumbhash],
  plugins,
  jobs: {
    access: {
      run: ({ req }) => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get("authorization")
        return authHeader === `Bearer ${process.env.PAYLOAD_CRON_SECRET}`
      },
    },
    autoRun: [
      {
        queue: "default", // schedulePublish task run on default queue
        cron: "* * * * *", // Every minute
        limit: 1,
      },
    ],
    shouldAutoRun: () => {
      return true
    },
  },
  secret: process.env.PAYLOAD_SECRET ?? "",
  sharp,
  typescript: {
    autoGenerate: true,
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
})
