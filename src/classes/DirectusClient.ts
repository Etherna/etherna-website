import axios from "axios"
import { setupCache } from "axios-cache-interceptor"

import type { UserNode } from "@/schema/cms"
import type { AxiosCacheInstance } from "axios-cache-interceptor"

type DirectusGetRequest<S extends boolean> = {
  fields?: string[]
  limit?: number
  offset?: number
  single?: S
  sort?: { key: string; order?: "asc" | "desc" }[]
  filter?: Record<string, unknown>
  query?: string
  meta?: ("filter_count" | "result_count" | "total_count" | "status_count")[]
}

type DirectusGetSingleRequest = {
  fields?: string[]
}

type DirectusGetRequestMeta = {
  filter_count: number
  result_count: number
  total_count: number
  status_count: Record<string, number>
}

export default class DirectusClient {
  public url = import.meta.env.PUBLIC_DIRECTUS_URL
  public project = import.meta.env.PUBLIC_DIRECTUS_PROJECT
  public token = import.meta.env.DIRECTUS_TOKEN || undefined
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

  async getItems<T = unknown>(
    collection: string,
    opts: DirectusGetRequest<true> & { single: true }
  ): Promise<{ data: T; meta: DirectusGetRequestMeta }>
  async getItems<T = unknown>(
    collection: string,
    opts?: DirectusGetRequest<false>
  ): Promise<{ data: T[]; meta: DirectusGetRequestMeta }>
  async getItems<T = unknown>(
    collection: string,
    opts: DirectusGetRequest<boolean> = {}
  ): Promise<{ data: T | T[]; meta: DirectusGetRequestMeta }> {
    const { data } = await this.http.get<{ data: T[]; meta: DirectusGetRequestMeta }>(
      `/items/${collection}`,
      {
        params: {
          fields: opts.fields,
          limit: opts.limit,
          offset: opts.offset,
          single: opts.single,
          sort: opts.sort?.map(s => (s.order === "desc" ? `-${s.key}` : s.key)).join(","),
          filter: opts.filter,
          q: opts.query,
          meta: opts.meta?.join(","),
        },
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        httpsAgent: await this.getHttpsAgent(),
        cache: {
          ttl: this.cacheTtl,
        },
      }
    )

    return data
  }

  async getItem<T = unknown>(collection: string, id: number, opts: DirectusGetSingleRequest = {}) {
    const { data } = await this.http.get<{ data: T }>(`/items/${collection}/${id}`, {
      params: {
        fields: opts.fields,
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

  async createItem<T = unknown>(collection: string, input: Record<string, any>) {
    const { data } = await this.http.post<{ data: T }>(`/items/${collection}`, input, {
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

  async getUser(id: number, opts: DirectusGetSingleRequest = {}) {
    const { data } = await this.http.get<{ data: UserNode }>(`/users/${id}`, {
      params: {
        fields: opts.fields,
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

  async getMe(opts: DirectusGetSingleRequest = {}) {
    const { data } = await this.http.get<{ data: UserNode & { token: string | undefined } }>(
      `/users/me`,
      {
        params: {
          fields: opts.fields,
        },
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        httpsAgent: await this.getHttpsAgent(),
        cache: false,
      }
    )
    return data.data
  }

  async isLoggedIn() {
    try {
      await this.getMe()
      return true
    } catch {
      return false
    }
  }

  async login(email: string, password: string, mode: "jwt" | "cookie" = "jwt") {
    const { data } = await this.http.post<{ data: { token: string } }>(`/auth/authenticate`, {
      email,
      password,
      mode,
    })
    this.token = data.data.token
    return this.token
  }

  async logout() {
    await this.http.post(`/auth/logout`)
    this.token = undefined
  }

  getFileUrl(privateHash: string) {
    return `${this.url}/${this.project}/assets/${privateHash}`
  }
}
