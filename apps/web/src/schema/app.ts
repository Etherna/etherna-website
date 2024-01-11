import { z } from "zod"

import { langSchema } from "@/utils/lang"

export const allSlugsSchema = z.object({
  slug: z.string(),
  locale: langSchema,
})

export const astroImgSchema = z.object({
  blurhash: z.string(),
  attributes: z.record(z.any()),
})

export const userSchema = z.object({
  id: z.number().optional(),
  email: z.string(),
  avatar: astroImgSchema.nullable(),
  first_name: z.string(),
  last_name: z.string(),
})

export const categorySchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  slug: z.string(),
  color: z.string().nullable(),
  locale: langSchema,
  allSlugs: z.array(allSlugsSchema),
})

export const postSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string().nullable(),
  meta_description: z.string().nullable(),
  meta_keywords: z.string().nullable(),
  author: userSchema,
  category: categorySchema.nullable(),
  image: astroImgSchema.nullable(),
  locale: langSchema,
  allSlugs: z.array(allSlugsSchema),
  published_on: z.string(),
  updated_on: z.string().nullable(),
})

export const commentOwnerSchema = z.object({
  id: z.number().optional(),
  avatar: astroImgSchema.nullable(),
  name: z.string(),
  email: z.string(),
})

export interface Comment {
  id: number
  name: string
  email: string
  comment: string
  owner: CommentOwner | null
  replies: Comment[]
  locale: z.infer<typeof langSchema>
  created_on: string
}

export const commentSchema: z.ZodType<Comment> = z.late.object(() => ({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  comment: z.string(),
  owner: commentOwnerSchema.nullable(),
  replies: z.array(commentSchema),
  locale: langSchema,
  created_on: z.string(),
}))

export const projectSchema = z.object({
  id: z.number().optional(),
  locale: langSchema,
  title: z.string(),
  slug: z.string(),
  image: astroImgSchema.nullable(),
  content: z.string(),
  excerpt: z.string().nullable(),
  coming_soon: z.boolean(),
  github_link: z.string().nullable(),
  external_link: z.string().nullable(),
  meta_description: z.string().nullable(),
  meta_keywords: z.string().nullable(),
  allSlugs: z.array(allSlugsSchema),
})

export const pageSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string().nullable(),
  meta_description: z.string().nullable(),
  meta_keywords: z.string().nullable(),
  show_in_menu: z.boolean(),
  locale: langSchema,
  allSlugs: z.array(allSlugsSchema),
})

export const teamMemberSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  role: z.string(),
  bio: z.string().nullable(),
  photo: astroImgSchema.nullable(),
  locale: langSchema,
})

export const logoVariantSchema = z.object({
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
  image: astroImgSchema.nullable(),
})

export const logoSchema = z.object({
  name: z.string(),
  logo_variants: z.array(logoVariantSchema),
})

export const brandSchema = z.object({
  colors: z.array(z.any()),
  fonts: z.array(z.any()),
  logos: z.array(logoSchema),
})

export const awardSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.any().nullable(),
  link: z.string().optional(),
})

export const milestoneSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  image: astroImgSchema.nullable(),
  completion: z.enum(["done", "ongoing", "todo"]),
  completion_quarter: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  locale: langSchema,
})

// Types

export type AllSlugs = z.infer<typeof allSlugsSchema>
export type AstroImg = z.infer<typeof astroImgSchema>
export type User = z.infer<typeof userSchema>
export type Category = z.infer<typeof categorySchema>
export type Post = z.infer<typeof postSchema>
export type CommentOwner = z.infer<typeof commentOwnerSchema>
export type Project = z.infer<typeof projectSchema>
export type Page = z.infer<typeof pageSchema>
export type TeamMember = z.infer<typeof teamMemberSchema>
export type LogoVariant = z.infer<typeof logoVariantSchema>
export type Logo = z.infer<typeof logoSchema>
export type Brand = z.infer<typeof brandSchema>
export type Award = z.infer<typeof awardSchema>
export type Milestone = z.infer<typeof milestoneSchema>
