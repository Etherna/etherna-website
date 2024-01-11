import { z } from "zod"

import { langSchema } from "@/utils/lang"

export const imageThumbnailNodeSchema = z.object({
  key: z.string(),
  dimension: z.string(),
  url: z.string(),
})

export const fileNodeSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  filename_disk: z.string(),
  private_hash: z.string(),
  width: z.number(),
  height: z.number(),
  data: z.object({
    url: z.string(),
    full_url: z.string(),
    thumbnails: z.array(imageThumbnailNodeSchema),
  }),
})

export const localeNodeSchema = z.object({
  code: z.string(),
  name: z.string(),
  flag: fileNodeSchema,
})

export const userNodeSchema = z.object({
  id: z.number(),
  email: z.string(),
  avatar: fileNodeSchema.nullable(),
  first_name: z.string(),
  last_name: z.string(),
})

export const categoryLocalizedContentsNodeSchema = z.object({
  name: z.string(),
  slug: z.string(),
  locale: langSchema,
})

export const categoryNodeSchema = z.object({
  id: z.number(),
  color: z.string().nullable(),
  posts: z.array(z.any()).optional(),
  localized_contents: z.array(categoryLocalizedContentsNodeSchema),
})

export const postLocalizedContentsNodeSchema = z.object({
  locale: langSchema,
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string(),
  meta_description: z.string().nullable(),
  meta_keywords: z.string().nullable(),
})

export const postNodeSchema = z.object({
  id: z.number(),
  localized_contents: z.array(postLocalizedContentsNodeSchema),
  author: userNodeSchema,
  category: categoryNodeSchema.nullable(),
  image: fileNodeSchema.nullable(),
  published_on: z.string(),
  updated_on: z.string().nullable(),
})

export type CommentNode = {
  id: number
  name: string
  email: string
  comment: string
  status: string
  locale: z.infer<typeof langSchema>
  parent: number | CommentNode
  post: number | PostNode
  owner: UserNode | null
  created_on: string
}

export const commentNodeSchema: z.ZodType<CommentNode> = z.late.object(() => ({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  comment: z.string(),
  status: z.string(),
  locale: langSchema,
  parent: z.union([z.number(), commentNodeSchema]),
  post: z.union([z.number(), postNodeSchema]),
  owner: userNodeSchema.nullable(),
  created_on: z.string(),
}))

export const projectLocalizedContentsNodeSchema = z.object({
  locale: langSchema,
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string(),
  meta_description: z.string().nullable(),
  meta_keywords: z.string().nullable(),
})

export const projectNodeSchema = z.object({
  localized_contents: z.array(projectLocalizedContentsNodeSchema),
  coming_soon: z.boolean(),
  external_link: z.string().nullable(),
  github_link: z.string().nullable(),
  image: fileNodeSchema.nullable(),
})

export const pageLocalizedContentsNodeSchema = z.object({
  locale: langSchema,
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string().nullable(),
  meta_description: z.string().nullable(),
  meta_keywords: z.string().nullable(),
})

export const pageNodeSchema = z.object({
  localized_contents: z.array(pageLocalizedContentsNodeSchema),
  show_in_menu: z.boolean(),
})

export const teamMemberLocalizedContentsNodeSchema = z.object({
  locale: langSchema,
  bio: z.string(),
  role: z.string(),
})

export const teamMemberNodeSchema = z.object({
  name: z.string(),
  photo: fileNodeSchema,
  localized_contents: z.array(teamMemberLocalizedContentsNodeSchema),
})

export const colorNodeSchema = z.object({
  color: z.string(),
  name: z.string(),
})

export const fontNodeSchema = z.object({
  name: z.string(),
  font_family: z.string(),
  font_weight: z.array(z.string()),
  import_url: z.string().nullable(),
  font_link: z.string().nullable(),
})

export const logoVariantNodeSchema = z.object({
  style: z.enum([
    "default",
    "light",
    "dark",
    "monochrome",
    "compact",
    "compact-light",
    "compact-dark",
  ]),
  variant_name: z.string().nullable(),
  image: fileNodeSchema,
})

export const logoNodeSchema = z.object({
  name: z.string(),
  logo_variants: z.array(logoVariantNodeSchema),
})

export const brandNodeSchema = z.object({
  colors: z.array(colorNodeSchema),
  fonts: z.array(fontNodeSchema),
  logos: z.array(logoNodeSchema),
})

export const milestoneLocalizedContentsNodeSchema = z.object({
  locale: langSchema,
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
})

export const milestoneNodeSchema = z.object({
  localized_contents: z.array(milestoneLocalizedContentsNodeSchema),
  image: fileNodeSchema.nullable(),
  completion: z.enum(["done", "ongoing", "todo"]),
  completion_quarter: z.string(),
  latitude: z.number(),
  longitude: z.number(),
})

export const documentsNodeSchema = z.object({
  whitepaper: fileNodeSchema
    .omit({
      width: true,
      height: true,
      data: true,
    })
    .nullable(),
})

// Types

export type ImageThumbnailNode = z.infer<typeof imageThumbnailNodeSchema>
export type FileNode = z.infer<typeof fileNodeSchema>
export type LocaleNode = z.infer<typeof localeNodeSchema>
export type UserNode = z.infer<typeof userNodeSchema>
export type CategoryLocalizedContentsNode = z.infer<typeof categoryLocalizedContentsNodeSchema>
export type CategoryNode = z.infer<typeof categoryNodeSchema>
export type PostLocalizedContentsNode = z.infer<typeof postLocalizedContentsNodeSchema>
export type PostNode = z.infer<typeof postNodeSchema>
export type ProjectLocalizedContentsNode = z.infer<typeof projectLocalizedContentsNodeSchema>
export type ProjectNode = z.infer<typeof projectNodeSchema>
export type PageLocalizedContentsNode = z.infer<typeof pageLocalizedContentsNodeSchema>
export type PageNode = z.infer<typeof pageNodeSchema>
export type TeamMemberLocalizedContentsNode = z.infer<typeof teamMemberLocalizedContentsNodeSchema>
export type TeamMemberNode = z.infer<typeof teamMemberNodeSchema>
export type ColorNode = z.infer<typeof colorNodeSchema>
export type FontNode = z.infer<typeof fontNodeSchema>
export type LogoVariantNode = z.infer<typeof logoVariantNodeSchema>
export type LogoNode = z.infer<typeof logoNodeSchema>
export type BrandNode = z.infer<typeof brandNodeSchema>
export type MilestoneLocalizedContentsNode = z.infer<typeof milestoneLocalizedContentsNodeSchema>
export type MilestoneNode = z.infer<typeof milestoneNodeSchema>
export type DocumentsNode = z.infer<typeof documentsNodeSchema>
