import { SlateDescendant } from "@mattiaz9/slate-jsx"

import type { DirectusFile, DirectusUser } from "@directus/sdk"

declare global {
  interface DirectusSchema {
    languages: Language[]
    blog_articles: BlogArticle[]
    blog_articles_translations: BlogArticleTranslation[]
    blog_categories: BlogCategory[]
    blog_categories_translations: BlogCategoryTranslation[]
    brand: Brand
    brand_logos: BrandLogo[]
    brand_logos_variants: BrandLogoVariant[]
    company_info: CompanyInfo
    documents: Document[]
    milestones: Milestone[]
    milestones_translations: MilestoneTranslation[]
    pages: Page[]
    pages_translations: PageTranslation[]
    projects: Project[]
    projects_translations: ProjectTranslation[]
    team_members: TeamMember[]
    team_members_translations: TeamMemberTranslation[]
    directus_files: {}
    directus_users: {
      avatar: DirectusFile<DirectusSchema> | null
    }
  }

  type UUID = string

  type Locale = "en-US" | "it-IT"

  type Status = "published" | "draft" | "deleted"

  interface SEO {
    title?: string
    description?: string
  }

  interface Language {
    code: Locale
    name: string
    icon: DirectusFile<DirectusSchema> | null
  }

  interface BlogArticle {
    id: UUID
    primary_category_id: UUID | BlogCategory | null
    status: Status
    author_id: DirectusUser<DirectusSchema>
    translations: BlogArticleTranslation[]
    categories: BlogCategory[]
    published_at: string | null
    edited_at: string | null
    created_at: string
    updated_at: string
  }

  interface BlogArticleTranslation {
    id: UUID
    title: string
    slug: string
    excerpt: string | null
    content: SlateDescendant[] | null
    seo: SEO | null
    thumbnail: DirectusFile<DirectusSchema> | null
    article_id: UUID | BlogArticle
    locale: Locale
  }

  interface BlogCategory {
    id: UUID
    parent_id: UUID | BlogCategory | null
    color: string | null
    sort: number | null
    icon: DirectusFile<DirectusSchema> | null
    translations: BlogCategoryTranslation[]
    created_at: string
    updated_at: string
  }

  interface BlogCategoryTranslation {
    id: UUID
    name: string
    slug: string
    description: string | null
    category_id: UUID | BlogCategory
    locale: Locale
  }

  interface Page {
    id: UUID
    status: Status
    author_id: UUID | DirectusUser<DirectusSchema> | null
    show_in_menu: boolean
    parent_page_id: UUID | Page | null
    translations: PageTranslation[]
    created_at: string
    updated_at: string
  }

  interface PageTranslation {
    id: UUID
    title: string
    slug: string
    content: Record<string, unknown> | null
    content_text: string | null
    description: string | null
    seo: SEO | null
    page_id: UUID | Page
    locale: Locale
  }

  interface Project {
    id: UUID
    status: Status
    external_link: string | null
    github_link: string | null
    image: DirectusFile<DirectusSchema> | null
    coming_soon: boolean | null
    sort: number | null
    translations: ProjectTranslation[]
    created_at: string
    updated_at: string
  }

  interface ProjectTranslation {
    id: UUID
    title: string
    slug: string
    content: string | null
    seo: SEO | null
    project_id: UUID | Project
    locale: Locale
  }

  interface TeamMember {
    id: UUID
    status: Status
    name: string
    photo: UUID | DirectusFile<DirectusSchema> | null
    sort: number | null
    translations: TeamMemberTranslation[]
    created_at: string
    updated_at: string
  }

  interface TeamMemberTranslation {
    id: UUID
    role: string
    bio: string | null
    team_member_id: UUID | TeamMember
    locale: Locale
  }

  interface Brand {
    id: UUID
    colors: {
      name: string
      color: string
    }[]
    fonts: {
      name: string
      font_family: string
      font_weight: string[]
      import_url: string | null
      font_link: string | null
    }[]
    logos: BrandLogo[]
  }

  interface BrandLogo {
    id: UUID
    name: string
    sort: number | null
    brand_id: UUID | Brand
    variants: BrandLogoVariant[]
  }

  interface BrandLogoVariant {
    id: UUID
    variant_name: string
    image: DirectusFile<DirectusSchema> | null
    style:
      | "default"
      | "light"
      | "dark"
      | "monochrome"
      | "compact"
      | "compact-light"
      | "compact-dark"
    brand_logo_id: UUID | BrandLogo
  }

  interface Milestone {
    id: UUID
    image: DirectusFile<DirectusSchema> | null
    completion: "done" | "ongoing" | "todo" | "unscheduled" | null
    completion_quarter: string | null
    latitude: number | null
    longitude: number | null
    sort: number | null
    translations: MilestoneTranslation[]
    created_at: string
    updated_at: string
  }

  interface MilestoneTranslation {
    id: UUID
    title: string
    subtitle: string | null
    description: string | null
    milestone_id: UUID | Milestone
    locale: Locale
  }

  interface CompanyInfo {
    id: UUID
    company_name: string | null
    company_address_locality: string | null
    company_address_postal_code: string | null
    company_address_street: string | null
    company_address_country: string | null
    company_email: string | null
    company_keywords: string | null
    facebook_url: string | null
    instagram_url: string | null
    twitter_url: string | null
    linkedin_url: string | null
    discord_url: string | null
    telegram_url: string | null
    github_url: string | null
    company_founding_date: string | null
  }

  interface Document {
    id: UUID
    name: string | null
    code: "whitepaper" | "pitchdeck"
    file_id: DirectusFile<DirectusSchema> | null
    status: Status
    created_at: string
    updated_at: string
  }
}

export {}
