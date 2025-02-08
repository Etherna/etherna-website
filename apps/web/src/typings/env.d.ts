export {}
declare global {
  interface ImportMetaEnv {
    readonly PUBLIC_DIRECTUS_URL: string
    readonly PUBLIC_SITE_URL: string
    readonly PUBLIC_MAILCHIMP_AUDIENCE_ID: string
    readonly PUBLIC_MAILCHIMP_PRODUCT_AUDIENCE_ID: string
    readonly PUBLIC_ANALYTICS_URL: string
    readonly PUBLIC_ANALYTICS_SITE_ID: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}
