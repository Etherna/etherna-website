import { decode, encode, isBlurhashValid } from "blurhash"

import { getImagePixels } from "./image"

import type { TransformOptions } from "@astrojs/image/dist/loaders"

// Credit: https://gist.github.com/mattiaz9/53cb67040fa135cb395b1d015a200aff

export function blurHashToDataURL(hash: string | null | undefined): string {
  if (!hash || !isBlurhashValid(hash).result) {
    // fallback to random blur hash
    hash = "LEHV6nWB2yk8pyo0adR*.7kCMdnj"
  }

  const pixels = decode(hash, 32, 32)
  const dataURL = parsePixels(pixels, 32, 32)
  return dataURL
}

export async function serverImageToBlurhash(transform: TransformOptions) {
  const resp = await fetch(transform.src.toString())
  const image = await resp.arrayBuffer()
  const loader = globalThis.astroImage.defaultLoader
  const width = 50
  const height = Math.round(50 * ((transform.height ?? 100) / (transform.width ?? 100)))

  const { data } = await loader.transform(Buffer.from(image), {
    ...transform,
    width,
    height,
  })

  const pixels =
    (await getImagePixels(data, transform.format ?? "jpeg")) ??
    new Uint8ClampedArray(
      Array.from({ length: width * height * 4 }, () => {
        return Math.floor(155 + Math.random() * 100)
      })
    )

  return encode(pixels, width, height, 4, 4)
}

export async function clientImageToBlurhash(
  image: ArrayBuffer,
  imageWidth: number,
  imageHeight: number
) {
  const data = await getClientImageData(image, imageWidth, imageHeight)
  return encode(data, imageWidth, imageHeight, 4, 4)
}

function parsePixels(pixels: Uint8ClampedArray, width: number, height: number) {
  const pixelsString = [...pixels].map(byte => String.fromCharCode(byte)).join("")
  const pngString = generatePng(width, height, pixelsString)
  const dataURL =
    typeof Buffer !== "undefined"
      ? Buffer.from(getPngArray(pngString)).toString("base64")
      : window.btoa(pngString)
  return "data:image/png;base64," + dataURL
}

function getPngArray(pngString: string) {
  const pngArray = new Uint8Array(pngString.length)
  for (let i = 0; i < pngString.length; i++) {
    pngArray[i] = pngString.charCodeAt(i)
  }
  return pngArray
}

function generatePng(width: number, height: number, rgbaString: string) {
  const DEFLATE_METHOD = String.fromCharCode(0x78, 0x01)
  const CRC_TABLE: number[] = []
  const SIGNATURE = String.fromCharCode(137, 80, 78, 71, 13, 10, 26, 10)
  const NO_FILTER = String.fromCharCode(0)

  let n, c, k

  // make crc table
  for (n = 0; n < 256; n++) {
    c = n
    for (k = 0; k < 8; k++) {
      if (c & 1) {
        c = 0xedb88320 ^ (c >>> 1)
      } else {
        c = c >>> 1
      }
    }
    CRC_TABLE[n] = c
  }

  // Functions
  function inflateStore(data: string) {
    const MAX_STORE_LENGTH = 65535
    let storeBuffer = ""
    let remaining
    let blockType

    for (let i = 0; i < data.length; i += MAX_STORE_LENGTH) {
      remaining = data.length - i
      blockType = ""

      if (remaining <= MAX_STORE_LENGTH) {
        blockType = String.fromCharCode(0x01)
      } else {
        remaining = MAX_STORE_LENGTH
        blockType = String.fromCharCode(0x00)
      }
      // little-endian
      storeBuffer += blockType + String.fromCharCode(remaining & 0xff, (remaining & 0xff00) >>> 8)
      storeBuffer += String.fromCharCode(~remaining & 0xff, (~remaining & 0xff00) >>> 8)

      storeBuffer += data.substring(i, i + remaining)
    }

    return storeBuffer
  }

  function adler32(data: string) {
    let MOD_ADLER = 65521
    let a = 1
    let b = 0

    for (let i = 0; i < data.length; i++) {
      a = (a + data.charCodeAt(i)) % MOD_ADLER
      b = (b + a) % MOD_ADLER
    }

    return (b << 16) | a
  }

  function updateCrc(crc: number, buf: string) {
    let c = crc
    let b: number

    for (let n = 0; n < buf.length; n++) {
      b = buf.charCodeAt(n)
      c = CRC_TABLE[(c ^ b) & 0xff]! ^ (c >>> 8)
    }
    return c
  }

  function crc(buf: string) {
    return updateCrc(0xffffffff, buf) ^ 0xffffffff
  }

  function dwordAsString(dword: number) {
    return String.fromCharCode(
      (dword & 0xff000000) >>> 24,
      (dword & 0x00ff0000) >>> 16,
      (dword & 0x0000ff00) >>> 8,
      dword & 0x000000ff
    )
  }

  function createChunk(length: number, type: string, data: string) {
    const CRC = crc(type + data)

    return dwordAsString(length) + type + data + dwordAsString(CRC)
  }

  function createIHDR(width: number, height: number) {
    const IHDRdata =
      dwordAsString(width) +
      dwordAsString(height) +
      // bit depth
      String.fromCharCode(8) +
      // color type: 6=truecolor with alpha
      String.fromCharCode(6) +
      // compression method: 0=deflate, only allowed value
      String.fromCharCode(0) +
      // filtering: 0=adaptive, only allowed value
      String.fromCharCode(0) +
      // interlacing: 0=none
      String.fromCharCode(0)

    return createChunk(13, "IHDR", IHDRdata)
  }

  // PNG creations

  const IEND = createChunk(0, "IEND", "")
  const IHDR = createIHDR(width, height)

  let scanlines = ""
  let scanline: string

  for (let y = 0; y < rgbaString.length; y += width * 4) {
    scanline = NO_FILTER
    if (Array.isArray(rgbaString)) {
      for (let x = 0; x < width * 4; x++) {
        scanline += String.fromCharCode(+rgbaString[y + x]! & 0xff)
      }
    } else {
      scanline += rgbaString.substr(y, width * 4)
    }
    scanlines += scanline
  }

  const compressedScanlines =
    DEFLATE_METHOD + inflateStore(scanlines) + dwordAsString(adler32(scanlines))
  const IDAT = createChunk(compressedScanlines.length, "IDAT", compressedScanlines)

  const pngString = SIGNATURE + IHDR + IDAT + IEND
  return pngString
}

async function getClientImageData(imageData: ArrayBuffer, width: number, height: number) {
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")!
  const image = await loadImage(imageData)
  image && ctx.drawImage(image, 0, 0)
  return ctx.getImageData(0, 0, width, height).data
}

async function loadImage(data: ArrayBuffer) {
  return new Promise<HTMLImageElement | null>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(null)
    img.src = URL.createObjectURL(new Blob([data]))
  })
}
