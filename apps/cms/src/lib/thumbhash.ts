import sharp from "sharp"
import { rgbaToThumbHash } from "thumbhash"

export async function getThumbhash(
  data: Buffer | ArrayBuffer | Uint8Array | Uint8ClampedArray,
  width: number,
  height: number,
) {
  const aspectRatio = (width ?? 100) / (height ?? 100)
  const w = aspectRatio >= 1 ? 100 : Math.floor(100 * aspectRatio)
  const h = Math.round(w / aspectRatio)
  const resizedImage = await sharp(data)
    .resize(w, h, { fit: "inside" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const thumbhash = rgbaToThumbHash(
    resizedImage.info.width,
    resizedImage.info.height,
    resizedImage.data,
  )

  return Buffer.from(thumbhash).toString("base64")
}
