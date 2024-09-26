export function omitUndefines<
  T extends Record<string, unknown>,
  R = { [P in keyof T]-?: Exclude<T[P], undefined> },
>(obj: T): R {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined)) as R
}
