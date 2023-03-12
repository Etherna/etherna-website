import type { Lang } from "@/utils/lang"

export interface LocaleNode {
  code: string
  name: string
  flag: FileNode
}

export interface SvgNode {
  localFile: {
    publicURL: string
  }
}

export interface PostNode {
  localized_contents: PostLocalizedContentsNode[]
  author: AuthorNode
  category: CategoryNode
  directusId: number
  image: FileNode | null
  published_on: string
  updated_on: string
}

export interface PostLocalizedContentsNode {
  locale: Lang
  title: string
  slug: string
  content: string
  excerpt: string
  meta_description: string | null
  meta_keywords: string | null
}

export interface CategoryNode {
  localized_contents: CategoryLocalizedContentsNode[]
}

export interface CategoryLocalizedContentsNode {
  name: string
  slug: string
  locale: Lang
}

export interface AuthorNode {
  first_name: string
  last_name: string
  avatar: number
}

export interface ProjectNode {
  localized_contents: ProjectLocalizedContentsNode[]
  coming_soon: boolean
  external_link: string | null
  github_link: string | null
  image: FileNode
}

export interface ProjectLocalizedContentsNode {
  title: string
  slug: string
  content: string
  excerpt: string | null
  meta_description: string | null
  meta_keywords: string | null
  locale: Lang
}

export interface PageNode {
  localized_contents: PageLocalizedContentsNode[]
  show_in_menu: boolean
}

export interface PageLocalizedContentsNode {
  title: string
  slug: string
  content: string
  excerpt: string | null
  meta_description: string | null
  meta_keywords: string | null
  locale: Lang
}

export interface TeamMemberNode {
  name: string
  photo: FileNode
  localized_contents: TeamMemberLocalizedContentsNode[]
}

export interface TeamMemberLocalizedContentsNode {
  bio: string
  role: string
  locale: Lang
}

export interface FileNode {
  title: string
  description: string
  filename_disk: string
  private_hash: string
  width: number
  height: number
  data: {
    url: string
    full_url: string
    thumbnails: ImageThumbnailNode[]
  }
}

export interface ImageThumbnailNode {
  key: string
  dimension: string
  url: string
}

export interface UserNode {
  id: number
  avatar?: FileNode | number
  first_name: string
  last_name: string
  email: string
}

export interface CommentNode {
  id: number
  name: string
  email: string
  comment: string
  status: string
  locale: Lang | { code: string }
  parent?: CommentNode | number
  post: PostNode | number
  owner?: UserNode | null
  created_on: string
}

export interface ColorNode {
  color: string
  name: string
}

export interface FontNode {
  name: string
  font_family: string
  font_weight: string[]
  import_url: string | null
  font_link: string | null
}

export interface LogoNode {
  name: string
  logo_variants: LogoVariantNode[]
}

export interface LogoVariantNode {
  style: "default" | "light" | "dark" | "monochrome" | "compact" | "compact-light" | "compact-dark"
  variant_name: string | null
  image: SvgNode
}

export interface MilestoneNode {
  localized_contents: MilestoneLocalizedContentsNode[]
  image: FileNode | null
  completion: "done" | "ongoing" | "todo"
  completion_quarter: string
  latitude: number
  longitude: number
}

export interface MilestoneLocalizedContentsNode {
  title: string
  subtitle: string
  description: string
  locale: Lang
}
