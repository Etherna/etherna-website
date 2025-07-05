type KeyValuePair<K extends keyof unknown = string, V = string> = Record<K, V>

declare module "tailwindcss/lib/util/flattenColorPalette" {
  export default function flattenColorPalette(colors: unknown): KeyValuePair<string, string>
}
