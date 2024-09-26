import qs from "qs"

import type { Locale } from "@/lang/types"
import type { Where } from "payload"

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

interface PayloadRequest {
  method: Method
  path: string
  params?: {
    depth?: number
    locale?: Locale
    fallbackLocale?: Locale
    page?: number
    limit?: number
    where?: Where
  }
  body?: BodyInit
  accessToken?: string
}

export function getPayloadRequest(req: PayloadRequest) {
  const { method, path, params, body, accessToken } = req
  const url = `${import.meta.env.PUBLIC_PAYLOAD_URL}/api${path}${
    params ? "?" + qs.stringify(params) : ""
  }`
  const request = new Request(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body,
  })
  return request
}

const cache = new Map<string, unknown>()

export function fetchPayloadRequest<T>(req: PayloadRequest) {
  const cacheKey = req.method === "GET" ? JSON.stringify(req) : ""

  if (cache.has(cacheKey)) {
    return Promise.resolve(cache.get(cacheKey) as T)
  }

  const request = getPayloadRequest(req)
  const response = fetch(request).then((res) => res.json()) as Promise<T>

  if (req.method === "GET") {
    response.then((data) => cache.set(cacheKey, data))
  }

  return response
}
