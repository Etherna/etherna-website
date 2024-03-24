export const quadraticBezier = (
  v: number,
  x1: number,
  y1: number,
  qx: number,
  qy: number,
  x2: number,
  y2: number
) => {
  const xyCalc = (a: number, q: number, b: number) => {
    return Math.pow(1 - v, 2) * a + 2 * v * (1 - v) * q + Math.pow(v, 2) * b
  }

  const x = xyCalc(x1, qx, x2)
  const y = xyCalc(y1, qy, y2)

  return { x, y }
}
