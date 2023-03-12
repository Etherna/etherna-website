import axios from "axios"
import { setupCache } from "axios-cache-interceptor"

import type { AxiosCacheInstance } from "axios-cache-interceptor"

interface DirectusGetRequest {
  fields?: string[]
}

export default class DirectusClient {
  url = import.meta.env.PUBLIC_DIRECTUS_URL
  project = import.meta.env.DIRECTUS_PROJECT
  token = import.meta.env.DIRECTUS_TOKEN
  private http: AxiosCacheInstance
  private cacheTtl = 1000 * 60 // 1 minute.

  constructor() {
    this.http = setupCache(
      axios.create({
        baseURL: `${this.url}/${this.project}`,
      })
    )
  }

  async getHttpsAgent() {
    if (typeof window !== "undefined") return undefined
    const https = await import("https")
    return new https.Agent({
      rejectUnauthorized: false,
    })
  }

  async getItems<T = unknown>(collection: string, opts?: DirectusGetRequest) {
    const { data } = await this.http.get<{ data: T[] }>(`/items/${collection}`, {
      params: {
        fields: opts?.fields,
      },
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      httpsAgent: await this.getHttpsAgent(),
      cache: {
        ttl: this.cacheTtl,
      },
    })
    return data.data
  }

  async getItem<T = unknown>(collection: string, id: string, opts?: DirectusGetRequest) {
    const { data } = await this.http.get<{ data: T }>(`/items/${collection}/${id}`, {
      params: {
        fields: opts?.fields,
      },
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      httpsAgent: await this.getHttpsAgent(),
      cache: {
        ttl: this.cacheTtl,
      },
    })
    return data.data
  }

  getFileUrl(filename: string) {
    return `${this.url}/${this.project}/assets/${filename}`
  }
}
