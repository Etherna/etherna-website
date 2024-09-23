import type { Locale } from "@/lang/types"

export const PAGINATION_LIMIT = import.meta.env.DEV ? 2 : 20

export const StaticPaths = [
  // home
  { params: { locale: "en", path: "/" } },
  { params: { locale: "it", path: "/" } },
  // about
  { params: { locale: "en", path: "/about" } },
  { params: { locale: "it", path: "/chi-siamo" } },
  // brand kit
  { params: { locale: "en", path: "/brand-kit" } },
  { params: { locale: "it", path: "/brand-kit" } },
] as { params: { locale: Locale; path: string } }[]

export async function fetchPaths(locales: Locale[]) {
  return [] as { params: { locale: Locale; path: string } }[]
}
