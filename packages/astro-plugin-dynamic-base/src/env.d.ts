declare global {
  interface ImportMetaEnv {
    BASE_URL: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

declare module "*.html" {
  const content: string
  export default content
}
