import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

import { aiModel } from "@/lib/ai"

import type { Endpoint } from "payload"

export const aiGenerate: Endpoint = {
  method: "post",
  path: "/ai-generate",
  handler: async (req) => {
    if (!req.user) {
      return new Response("Unauthorized", { status: 401 })
    }
    if (
      !req.user.policies.some((policy) => policy === "administrator" || policy === "postsEditor")
    ) {
      return new Response("Forbidden", { status: 403 })
    }

    const variantId = req.query.variant as string | undefined

    if (!variantId) {
      return new Response("Variant ID is required", { status: 400 })
    }

    const promptConfig = await req.payload.findGlobal({
      slug: "prompts",
    })

    if (!promptConfig) {
      return new Response("Prompt configuration not found", { status: 404 })
    }

    const variant = promptConfig.variants?.find((v) => v.id === variantId)
    const prompt = `${promptConfig?.articlePrompt}\n\n${variant?.prompt}`

    const data = (await req.json?.()) as { messages: [] } | undefined
    const result = streamText({
      model: openai(aiModel.name),
      system: prompt,
      messages: data?.messages,
    })

    return result.toDataStreamResponse()
  },
}
