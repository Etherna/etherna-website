export {}
declare global {
  interface ImportMetaEnv {
    readonly PUBLIC_DIRECTUS_URL: string
    readonly DIRECTUS_PROJECT: string
    readonly DIRECTUS_TOKEN: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}
