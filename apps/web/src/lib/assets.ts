export const getDirectusAssetUrl = (fileId: string) => {
  return `${import.meta.env.PUBLIC_DIRECTUS_URL}/assets/${fileId}`
}
