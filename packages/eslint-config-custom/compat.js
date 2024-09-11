import path from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const flatCompat = new FlatCompat({
  baseDirectory: __dirname,
})
