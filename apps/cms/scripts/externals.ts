import fs from "node:fs"
import { API_SHARED_DEPS as DIRECTUS_SHARED_DEPS } from "@directus/extensions"

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf-8")) as {
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
}

export const API_SHARED_DEPS = [
  ...DIRECTUS_SHARED_DEPS,
  ...Object.keys(packageJson.dependencies),
].filter(
  (dep) => dep !== "@directus/extensions" && dep !== "@directus/extensions-sdk",
)
