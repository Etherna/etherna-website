import type { ColorNode, FontNode } from "./sources"
import type { Lang } from "@/utils/lang"

export interface LocaleSlug {
  slug: string
  locale: Lang
}

export interface AstroImg {
  blurhash: string
  attributes: astroHTML.JSX.ImgHTMLAttributes
}

export interface Post {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string | null
  meta_description: string | null
  meta_keywords: string | null
  author: User
  category: Category | null
  image: AstroImg | null
  locale: Lang
  allSlugs: LocaleSlug[]
  published_on: string
  updated_on: string
}

export interface Category {
  id: number
  name: string
  slug: string
  color: string | null
  locale: Lang
  allSlugs: LocaleSlug[]
}

export interface Project {
  locale: Lang
  title: string
  slug: string
  image: AstroImg | null
  content: string
  excerpt: string | null
  coming_soon: boolean
  github_link: string | null
  external_link: string | null
  meta_description: string | null
  meta_keywords: string | null
  allSlugs: LocaleSlug[]
}

export interface Milestone {
  title: string
  subtitle: string
  description: string
  image: AstroImg | null
  completion: "done" | "ongoing" | "todo"
  completion_quarter: string
  latitude: number
  longitude: number
  locale: Lang
}

export interface Page {
  title: string
  slug: string
  content: string
  excerpt: string | null
  meta_description: string | null
  meta_keywords: string | null
  show_in_menu: boolean
  locale: Lang
  allSlugs: LocaleSlug[]
}

export interface TeamMember {
  name: string
  role: string
  bio: string | null
  photo: AstroImg | null
  locale: Lang
}

export interface CommentOwner {
  id: number
  avatar: string
  name: string
  email: string
}

export interface Comment {
  id: number
  name: string
  email: string
  comment: string
  owner: CommentOwner | null
  replies: Comment[]
  locale: Lang
  created_on: string
}

export interface User {
  first_name: string
  last_name: string
  email: string
  avatar: AstroImg | null
}

export interface Brand {
  colors: ColorNode[]
  fonts: FontNode[]
  logos: Logo[]
}

export interface Logo {
  name: string
  logo_variants: LogoVariant[]
}

export interface LogoVariant {
  style: "default" | "light" | "dark" | "monochrome" | "compact" | "compact-light" | "compact-dark"
  variant_name: string | null
  image: AstroImg
}
