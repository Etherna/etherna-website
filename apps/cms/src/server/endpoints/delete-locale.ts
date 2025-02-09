import type { Endpoint } from "payload"

export const deleteLocale: Endpoint = {
  method: "post",
  path: "/delete-locale/:collection/:id/:locale",
  handler: async (req) => {
    if (!req.user) {
      return new Response("Unauthorized", { status: 401 })
    }
    if (
      !req.user.policies.some((policy) => policy === "administrator" || policy === "postsEditor")
    ) {
      return new Response("Forbidden", { status: 403 })
    }

    const { collection, id, locale } = req.routeParams ?? {}
    const payload = req.payload

    await payload.db.drizzle.execute(
      `DELETE FROM ${collection}_locales
      WHERE _parent_id = '${id}' AND _locale = '${locale}'`,
    )
    await payload.db.drizzle.execute(
      `DELETE FROM _${collection}_v_locales
      WHERE _parent_id IN (SELECT id FROM _${collection}_v WHERE parent_id = '${id}') AND _locale = '${locale}'`,
    )

    return new Response(JSON.stringify(req.routeParams), { status: 200 })
  },
}
