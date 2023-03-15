import ndarray from "ndarray"

import type { OutputFormat } from "@astrojs/image/dist/loaders"

// Credit to: https://github.com/scijs/get-pixels

export async function getImagePixels(imageData: ArrayBuffer, format: OutputFormat) {
  switch (format) {
    case "png":
      return await getPNGPixels(imageData)
    case "jpg":
    case "jpeg":
      return await getJPEGPixels(imageData)
    default:
      throw new Error("Unsupported file type: " + format)
  }
}

async function getJPEGPixels(imageData: ArrayBuffer) {
  const { decode } = await import("jpeg-js")
  const jpegData = decode(imageData)
  if (!jpegData) {
    throw new Error("Error decoding jpeg")
  }
  var nshape = [jpegData.height, jpegData.width, 4]
  var result = ndarray(jpegData.data, nshape)
  return new Uint8ClampedArray(result.data)
}

async function getPNGPixels(imageData: ArrayBuffer) {
  const { PNG } = await import("pngjs")
  const png = new PNG()
  const pixels = await new Promise<Uint8ClampedArray>((resolve, reject) => {
    png.parse(Buffer.from(imageData), (err, png) => {
      if (err) return reject(err)
      const result = ndarray(
        new Uint8Array(png.data),
        [png.width | 0, png.height | 0, 4],
        [4, (4 * png.width) | 0, 1],
        0
      )
      resolve(new Uint8ClampedArray(result.data))
    })
  })
  return pixels
}
