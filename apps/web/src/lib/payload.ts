import qs from "qs"

import type { Locale } from "@/i18n/types"
import type { SelectType, Where } from "payload"

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
    select?: SelectType
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

const cache = new Map<string, Promise<unknown>>()

export function fetchPayloadRequest<T>(req: PayloadRequest) {
  const cacheKey = req.method === "GET" ? JSON.stringify(req) : ""

  let resolver: (value: T) => void
  let rejecter: (reason?: unknown) => void
  const promise = new Promise<T>((res, rej) => {
    resolver = res
    rejecter = rej
  })

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) as Promise<T>
  }

  cache.set(cacheKey, promise)

  const request = getPayloadRequest(req)
  const response = fetch(request)
    .then((res) => res.json() as Promise<T>)
    .then((data) => {
      resolver(data)
      cache.delete(cacheKey)
      return data
    })
    .catch((err) => {
      rejecter(err)
      cache.delete(cacheKey)
      throw err
    })

  return response
}
