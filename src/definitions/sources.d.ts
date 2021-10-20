import { IGatsbyImageData } from "gatsby-plugin-image"

export interface ImageNode {
  localFile: {
    childImageSharp: {
      gatsbyImageData: GatsbyImageData
    }
  }
}

export interface SvgNode {
  localFile: {
    publicURL: string
  }
}

export type GatsbyImageData = IGatsbyImageData

export interface PublicImageNode {
  localFile: {
    publicURL: string
  }
}

export interface PostNode {
  localized_contents: PostLocalizedContentsNode[]
  author: AuthorNode
  category: CategoryNode
  directusId: number
  image: ImageNode | null
  published_on: string
  updated_on: string
}

export interface PostLocalizedContentsNode {
  locale: string
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
  locale: string
}

export interface AuthorNode {
  first_name: string
  last_name: string
  avatar: number
}

export interface ProjectNode {
  localized_contents: ProjectLocalizedContentsNode[]
  coming_soon: boolean
  github_link: string | null
  image: PublicImageNode
}

export interface ProjectLocalizedContentsNode {
  title: string
  slug: string
  content: string
  excerpt: string | null
  meta_description: string | null
  meta_keywords: string | null
  locale: string
}

export interface PageNode {
  localized_contents: PageLocalizedContentsNode[]
}

export interface PageLocalizedContentsNode {
  title: string
  slug: string
  content: string
  excerpt: string | null
  meta_description: string | null
  meta_keywords: string | null
  locale: string
}

export interface TeamMemberNode {
  name: string
  photo: ImageNode
  localized_contents: TeamMemberLocalizedContentsNode[]
}

export interface TeamMemberLocalizedContentsNode {
  bio: string
  role: string
  locale: string
}

export interface FileNode {
  title: string
  filename_disk: string
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
  locale: string | { code: string }
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
  style: "default" | "light" | "dark" | "monochrome" | "compact"
  variant_name: string | null
  image: SvgNode
}
