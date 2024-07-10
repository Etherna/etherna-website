/* eslint-disable no-bitwise */

import ndarray from "ndarray"

import type { ImageOutputFormat } from "astro"

// Credit to: https://github.com/scijs/get-pixels

export function getImagePixels(imageData: ArrayBuffer) {
  const format = detectImageFormat(imageData)
  switch (format) {
    case "png":
      return getPNGPixels(imageData).catch(() => getJPEGPixels(imageData).catch(() => null))
    case "jpg":
    case "jpeg":
      return getJPEGPixels(imageData).catch(() => getPNGPixels(imageData).catch(() => null))
    // case "svg":
    //   return getSVGPixels(imageData)
    default:
      return null
  }
}

function detectImageFormat(imageData: ArrayBuffer): ImageOutputFormat {
  const formats = {
    jpeg: [0xff, 0xd8, 0xff],
    png: [0x89, 0x50, 0x4e, 0x47],
    gif: [0x47, 0x49, 0x46, 0x38],
    avif: [0x00, 0x00, 0x00, 0x18, 0x61, 0x76, 0x69, 0x66],
    webp: [0x52, 0x49, 0x46, 0x46],
    svg: [0x3c, 0x73, 0x76, 0x67],
  } as const

  const header = new Uint8Array(imageData, 0, 8)
  const headerArray = Array.from(header)

  for (const [format, magic] of Object.entries(formats)) {
    if (magic.every((v, i) => v === headerArray[i])) {
      return format as ImageOutputFormat
    }
  }

  return "png"
}

async function getJPEGPixels(imageData: ArrayBuffer) {
  const { decode } = await import("jpeg-js")
  const jpegData = decode(imageData)
  const nshape = [jpegData.height, jpegData.width, 4]
  const result = ndarray(jpegData.data, nshape)
  return new Uint8ClampedArray(result.data)
}

// async function getSVGPixels(imageData: ArrayBuffer) {
//   const svgToPgn = (await import("svg2img")).default
//   const svgString = new TextDecoder().decode(imageData)
//   const pngData = await new Promise<Buffer>((resolve, reject) => {
//     svgToPgn(svgString, {}, (err, buffer) => {
//       if (err) return reject(err)
//       resolve(buffer)
//     })
//   })
//   return await getPNGPixels(pngData.buffer)
// }

async function getPNGPixels(imageData: ArrayBuffer) {
  const { PNG } = await import("pngjs")
  const png = new PNG()
  const pixels = await new Promise<Uint8ClampedArray>((resolve, reject) => {
    png.parse(Buffer.from(imageData), (err: Error | undefined, pngOutput) => {
      if (err) return reject(err)
      const result = ndarray(
        new Uint8Array(pngOutput.data),
        [pngOutput.width | 0, pngOutput.height | 0, 4],
        [4, (4 * pngOutput.width) | 0, 1],
        0
      )
      resolve(new Uint8ClampedArray(result.data))
    })
  })
  return pixels
}
