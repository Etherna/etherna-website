import { fileService } from "./service"
import { etag, loadRemoteFile } from "./utils"

import type { APIRoute } from "astro"

export const GET: APIRoute = async ({ request }) => {
  const parsedUrl = fileService.parseUrl(request.url)
  const fileResponse = await loadRemoteFile(parsedUrl.href)

  if (!fileResponse) {
    return new Response("Not Found", { status: 404 })
  }

  const { data, type } = fileResponse

  const filename =
    parsedUrl.filename ?? parsedUrl.href.split("/").pop() ?? "unknown"

  return new Response(data, {
    status: 200,
    headers: {
      "Content-Type": type ?? `application/octet-stream`,
      "Cache-Control": "public, max-age=31536000",
      "Content-Disposition": `inline; filename="${filename}"`,
      ETag: etag(data.toString()),
      Date: new Date().toUTCString(),
    },
  })
}
