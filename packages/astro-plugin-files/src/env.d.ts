/* eslint-disable no-var */

import type { FileOptions, FileService } from "./service"

export {}

declare global {
  interface ImportMetaEnv {
    BASE_URL: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }

  var astroFile: {
    fileService?: FileService
    staticFiles?: Map<string, { url: string; filename: string }>
    addStaticFile?: (options: FileOptions) => string
  }
}
