import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).catch("development"),
    DB_HOST: z.string(),
    DB_PORT: z.string(),
    DB_DATABASE: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    PAYLOAD_SECRET: z.string(),
    PAYLOAD_AUTOLOGIN_EMAIL: z.string().optional(),
    PAYLOAD_AUTOLOGIN_PASSWORD: z.string().optional(),
    PAYLOAD_EMAIL_FROM: z.string().email(),
    PAYLOAD_EMAIL_DEFAULT_RECEIVER: z.string().email().optional(),
    PAYLOAD_CRON_SECRET: z.string(),
    GITHUB_TOKEN: z.string(),
    SENDGRID_TOKEN: z.string(),
    MAILCHIMP_TOKEN: z.string(),
    MAILCHIMP_SERVER: z.string(),
    OPENAI_API_KEY: z.string().optional(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_SERVER_URL: z.string(),
    NEXT_PUBLIC_FRONTEND_URL: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    PAYLOAD_AUTOLOGIN_EMAIL: process.env.PAYLOAD_AUTOLOGIN_EMAIL,
    PAYLOAD_AUTOLOGIN_PASSWORD: process.env.PAYLOAD_AUTOLOGIN_PASSWORD,
    PAYLOAD_EMAIL_FROM: process.env.PAYLOAD_EMAIL_FROM,
    PAYLOAD_EMAIL_DEFAULT_RECEIVER: process.env.PAYLOAD_EMAIL_DEFAULT_RECEIVER,
    PAYLOAD_CRON_SECRET: process.env.PAYLOAD_CRON_SECRET,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    SENDGRID_TOKEN: process.env.SENDGRID_TOKEN,
    MAILCHIMP_TOKEN: process.env.MAILCHIMP_TOKEN,
    MAILCHIMP_SERVER: process.env.MAILCHIMP_SERVER,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: true,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
})
