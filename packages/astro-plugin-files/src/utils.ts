/* eslint-disable no-bitwise */
import { deterministicString } from "deterministic-object-hash"
import mime from "mime"

import type { FileOptions } from "./service"

export async function loadRemoteFile(url: string) {
  try {
    const res = await fetch(url)

    if (!res.ok) {
      return undefined
    }

    return {
      data: Buffer.from(await res.arrayBuffer()),
      type: res.headers.get("content-type"),
    }
  } catch (err) {
    return undefined
  }
}

export function etag(payload: string, weak = false) {
  const prefix = weak ? 'W/"' : '"'
  return `${prefix + fnv1a52(payload).toString(36) + payload.length.toString(36)}"`
}

export function fnv1a52(str: string) {
  const len = str.length
  let i = 0,
    t0 = 0,
    v0 = 0x2325,
    t1 = 0,
    v1 = 0x8422,
    t2 = 0,
    v2 = 0x9ce4,
    t3 = 0,
    v3 = 0xcbf2

  while (i < len) {
    v0 ^= str.charCodeAt(i++)
    t0 = v0 * 435
    t1 = v1 * 435
    t2 = v2 * 435
    t3 = v3 * 435
    t2 += v0 << 8
    t3 += v1 << 8
    t1 += t0 >>> 16
    v0 = t0 & 65535
    t2 += t1 >>> 16
    v1 = t1 & 65535
    v3 = (t3 + (t2 >>> 16)) & 65535
    v2 = t2 & 65535
  }

  return (
    (v3 & 15) * 281474976710656 +
    v2 * 4294967296 +
    v1 * 65536 +
    (v0 ^ (v3 >> 4))
  )
}

export function joinPaths(...paths: string[]) {
  return paths.join("/").replace(/\/+/g, "/")
}

export function hashFileName(options: FileOptions) {
  const { src, filename, type } = options

  const ext = type ? mime.getExtension(type) ?? "" : ""
  const filenameWithoutExt =
    ext && filename.endsWith(ext)
      ? filename.slice(0, -(ext.length + 1))
      : filename
  return `${slugify(filenameWithoutExt)}_${shorthash(deterministicString(src))}.${ext}`
}

function slugify(str: string, connector = "-") {
  return str
    .toLowerCase()
    .replace(/ +/g, connector)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(new RegExp(`[^a-z0-9${connector}]`, "g"), "")
    .replace(new RegExp(`${connector}+`, "g"), connector)
    .replace(new RegExp(`^${connector}|${connector}$`, "g"), "")
}

function bitwise(str: string) {
  let hash = 0
  if (str.length === 0) return hash
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i)
    hash = (hash << 5) - hash + ch
    hash = hash & hash // Convert to 32bit integer
  }
  return hash
}

export function shorthash(text: string) {
  const dictionary =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY"
  const binary = dictionary.length

  let num: number
  let result = ""

  let integer = bitwise(text)
  const sign = integer < 0 ? "Z" : "" // If it's negative, start with Z, which isn't in the dictionary

  integer = Math.abs(integer)

  while (integer >= binary) {
    num = integer % binary
    integer = Math.floor(integer / binary)
    result = dictionary[num] + result
  }

  if (integer > 0) {
    result = dictionary[integer] + result
  }

  return sign + result
}
