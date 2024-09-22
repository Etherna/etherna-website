import "@total-typescript/ts-reset"

declare global {
  interface Window {}

  interface Navigator {}

  type Prettify<T> = {
    [K in keyof T]: T[K]
  } & {}

  type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
}
