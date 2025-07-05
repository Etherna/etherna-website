declare global {
  interface ImportMetaEnv {
    readonly PUBLIC_SITE_URL: string
    readonly PUBLIC_PAYLOAD_URL: string
    readonly ANALYTICS_URL: string
    readonly ANALYTICS_SITE_ID: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

export {}
