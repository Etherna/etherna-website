import type { AuthorNode } from "./sources"

export interface LocaleSlug {
  slug: string
  locale: string
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
  author: AuthorNode
  category: Category | null
  image: AstroImg | null
  locale: string
  allSlugs: LocaleSlug[]
  published_on: string
  updated_on: string
}

export interface Category {
  name: string
  slug: string
  locale: string
  allSlugs: LocaleSlug[]
}

export interface Project {
  locale: string
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
  locale: string
}

export interface Page {
  title: string
  slug: string
  content: string
  excerpt: string | null
  meta_description: string | null
  meta_keywords: string | null
  show_in_menu: boolean
  locale: string
  allSlugs: LocaleSlug[]
}

export interface TeamMember {
  name: string
  role: string
  bio: string | null
  photo: AstroImg | null
  locale: string
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
  locale: string
  created_on: string
}

export interface CurrentUser {
  name: string
  email: string
  avatar: string
}
