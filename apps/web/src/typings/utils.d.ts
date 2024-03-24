export {}

declare global {
  type ExtractGeneric<T> = Exclude<T, string>
}
