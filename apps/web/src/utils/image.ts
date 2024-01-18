/* eslint-disable no-bitwise */

import ndarray from "ndarray"

import type { ImageOutputFormat } from "astro"

// Credit to: https://github.com/scijs/get-pixels

export function getImagePixels(imageData: ArrayBuffer, format: ImageOutputFormat) {
  switch (format) {
    case "png":
      return getPNGPixels(imageData)
    case "jpg":
    case "jpeg":
      return getJPEGPixels(imageData)
    // case "svg":
    //   return getSVGPixels(imageData)
    default:
      return null
  }
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
