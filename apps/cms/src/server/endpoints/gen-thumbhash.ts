import { getThumbhash } from "@/lib/thumbhash"

import type { Endpoint } from "payload"

export const generateThumbhash: Endpoint = {
  method: "post",
  path: "/thumbhash/:id",
  handler: async (req) => {
    if (!req.user) {
      return new Response("Unauthorized", { status: 401 })
    }
    if (
      !req.user.policies.some((policy) => policy === "administrator" || policy === "postsEditor")
    ) {
      return new Response("Forbidden", { status: 403 })
    }

    const { id } = req.routeParams ?? {}
    const payload = req.payload

    const result = await payload.find({
      collection: "media",
      limit: 1,
      pagination: false,
      select: {
        filename: true,
        width: true,
        height: true,
      },
      where: {
        id: {
          equals: id,
        },
      },
    })

    if (!result.docs[0]) {
      return new Response("Not found", { status: 404 })
    }

    const url = `${req.origin}/api/media/file/${result.docs[0].filename}`

    const resp = await fetch(url)

    if (!resp.ok) {
      return new Response("Failed to fetch media file", { status: 500 })
    }

    const imageData = await resp.arrayBuffer()
    const thumbhash = await getThumbhash(
      imageData,
      result.docs[0].width ?? 100,
      result.docs[0].height ?? 100,
    )

    return new Response(
      JSON.stringify({
        thumbhash,
      }),
      { status: 200 },
    )
  },
}
