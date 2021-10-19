export { }

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DIRECTUS_URL: string
      DIRECTUS_PROJECT: string
      DIRECTUS_TOKEN: string
      SITE_URL: string
    }
  }
}
