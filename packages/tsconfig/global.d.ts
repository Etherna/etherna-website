import "@total-typescript/ts-reset"

declare global {
  interface Window {}

  interface Navigator {}

  type Prettify<T> = {
    [K in keyof T]: T[K]
  } & {}

  type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

  type UnionToTuple<T> =
    PickOne<T> extends infer U
      ? Exclude<T, U> extends never
        ? [T]
        : [...UnionToTuple<Exclude<T, U>>, U]
      : never

  type ArrayToUnion<T extends unknown[]> = T[number]

  type ArrayToTuple<T extends unknown[]> = UnionToTuple<ArrayToUnion<T>>
}
