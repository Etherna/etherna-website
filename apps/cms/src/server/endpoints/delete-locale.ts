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

    console.dir(req.user, { depth: null })

    const { collection, id, locale } = req.routeParams ?? {}
    const payload = req.payload

    await payload.delete({
      id: id as string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      collection: `${collection}_locales` as any,
      locale: locale as "it" | "en",
    })

    return new Response(JSON.stringify(req.routeParams), { status: 200 })
  },
}
