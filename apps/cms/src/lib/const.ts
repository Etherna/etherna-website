export const PARENT_COLUMN_NAME = "parent"

export const BASE_LOCALE_PATH = {
  en: "/",
  it: "/it/",
} as const satisfies Record<string, `${string}/`>

export const RESERVED_PAGE_SLUGS = ["_preview", "_image", "_file", "blog"]

export const DEPLOY_WORKFLOW_ID = "deploy.yml"
