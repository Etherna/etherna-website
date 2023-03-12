import { z } from "zod"

export const milestoneSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  image: z.any().nullable(),
  completion: z.enum(["done", "ongoing", "todo"]),
  completion_quarter: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  locale: z.string(),
})

export type Milestone = z.infer<typeof milestoneSchema>
