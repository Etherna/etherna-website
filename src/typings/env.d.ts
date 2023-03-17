export {}
declare global {
  interface ImportMetaEnv {
    readonly PUBLIC_DIRECTUS_URL: string
    readonly PUBLIC_DIRECTUS_PROJECT: string
    readonly DIRECTUS_TOKEN: string
    readonly SITE_URL: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}
