import { createDirectus, rest } from "@directus/sdk"

const directusClient = createDirectus<DirectusSchema>(import.meta.env.PUBLIC_DIRECTUS_URL).with(
  rest()
)

export { directusClient }
