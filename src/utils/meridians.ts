/**
 * Normalize a longitude from 0 to 360 (from left to right relative to the map)
 *
 * @param longitude Longitude to normalize
 * @returns Normalized positive longitude
 */
export const positiveLongitude = (longitude: number) => {
  return 180 + longitude
}

/**
 * Normalize a longitude from 0 to 360 (starting from meridian 0)
 *
 * @param longitude Longitude to normalize
 * @returns Normalized extended longitude
 */
export const extendedLongitude = (longitude: number) => {
  return longitude < 0 ? 180 + longitude + 180 : longitude
}

/**
 * Normalize a longitude to follow the sun rotation from a start point
 *
 * @param longitude Longitude to normalize
 * @param startLongitude Start point longitude
 * @returns Normalized longitude
 */
export const normalizedLongitudeFromStart = (longitude: number, startLongitude: number) => {
  const posLongitude = positiveLongitude(longitude)
  const posStartLongitude = positiveLongitude(startLongitude)
  return posLongitude <= posStartLongitude
    ? posStartLongitude - posLongitude
    : posStartLongitude + 360 - posLongitude
}

/**
 * Calc the world scroll relative to a longitude and a start point
 *
 * @param longitude Longitude to which the map should be centered
 * @param startLongitude Start point longitude
 * @param size World map size
 * @returns The scroll amount
 */
export const solarLongitudeScroll = (longitude: number, startLongitude: number, size: number) => {
  const worldRatio = 2
  const worldSize = size * worldRatio
  const centerSize = worldSize / 2 - size / 2

  const normalizedLongitude = normalizedLongitudeFromStart(longitude, startLongitude)

  const longitudePercent = normalizedLongitude / 360
  const startLongitudePercent = extendedLongitude(startLongitude) / 360

  const startScrollX = -centerSize - worldSize * startLongitudePercent
  const fixedScrollX = startScrollX + longitudePercent * worldSize

  return fixedScrollX
}
