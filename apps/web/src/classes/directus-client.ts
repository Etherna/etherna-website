import { createDirectus, rest } from "@directus/sdk"

const directusClient = createDirectus(import.meta.env.PUBLIC_DIRECTUS_URL).with(rest())

export { directusClient }
