"use client"

import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import {
  Banner,
  Button,
  Modal,
  Select,
  useConfig,
  useField,
  useModal,
  usePayloadAPI,
} from "@payloadcms/ui"

import { FilePenLineIcon, SparklesIcon, StopCircleIcon } from "lucide-react"

import { env } from "@/env"
import { aiModel } from "@/lib/ai"
import { plainTextToLexicalState } from "@/lib/lexical"

import type { Prompt } from "@payload-types"
import type { Option } from "@payloadcms/ui/elements/ReactSelect"
import type { Attachment } from "ai"

const modalSlug = "ai-writer-modal"

export default function AIWriter() {
  const titleField = useField({
    path: "title",
  })
  const contentField = useField({
    path: "content",
  })
  const modal = useModal()
  const {
    config: {
      routes: { api },
      serverURL,
    },
  } = useConfig()
  const [model, setModel] = useState<Option>()
  const [tokenUsed, setTokenUsed] = useState<{ input: number; output: number }>({
    input: 0,
    output: 0,
  })
  const [{ data }] = usePayloadAPI(`${serverURL}${api}/globals/prompts`)

  const { messages, status, error, stop, setMessages, handleInputChange, handleSubmit } = useChat({
    api: `${serverURL}${api}/ai-generate?variant=${model?.value}`,
    onFinish(message, options) {
      setTokenUsed((prev) => ({
        input: prev.input + options.usage.promptTokens,
        output: prev.output + options.usage.completionTokens,
      }))
    },
  })

  const title = (titleField.value as string) || "Untitled Article"
  const promptConfig = data as Prompt | undefined

  const generate = () => {
    const attachments = (promptConfig?.variants?.find((v) => v.id === model?.value)?.context || [])
      .map(
        (attachment) =>
          ({
            contentType: "",
            url:
              attachment.type === "url"
                ? (attachment.url ?? "")
                : attachment.attachment
                  ? `${env.NEXT_PUBLIC_SERVER_URL}/api/media/file/${typeof attachment.attachment === "object" ? attachment.attachment.id : (attachment.attachment ?? "")}`
                  : "",
          }) satisfies Attachment,
      )
      .filter((a) => !!a.url)

    setMessages(
      attachments.length
        ? [
            {
              id: crypto.randomUUID(),
              role: "user",
              content: "Read and understand the following context before writing the article.",
              experimental_attachments: attachments,
            },
          ]
        : [],
    )

    const message = `Write an short paragraph about Etherna SA`
    // const message = `Write an article based on the following title: ${title}`

    handleInputChange({
      target: {
        value: message,
      },
    } as React.ChangeEvent<HTMLInputElement>)

    setTimeout(handleSubmit, 100)
  }

  const insertArticle = async () => {
    const article = messages
      .filter((msg) => msg.role === "assistant")
      .map((msg) => msg.content)
      .join("\n\n")
    const editorState = await plainTextToLexicalState(article)
    contentField.setValue(editorState)
  }

  const isGenerating = status === "streaming" || status === "submitted"
  const isDone = status === "ready" && messages.some((msg) => msg.role === "assistant")
  const totalTokenUsed = tokenUsed.input + tokenUsed.output

  return (
    <>
      <Button buttonStyle="subtle" onClick={() => modal.openModal(modalSlug)}>
        <SparklesIcon className="mr-2 size-5" />
        AI
      </Button>

      <Modal slug={modalSlug}>
        <div className="fixed left-1/2 top-1/2 flex w-[95%] max-w-[512px] -translate-x-1/2 -translate-y-1/2 flex-col gap-8 bg-[var(--theme-bg)] p-8">
          <h3>AI Writer</h3>

          <div className="flex flex-col gap-6">
            <div>
              <h4>{title}</h4>
            </div>

            <div className="space-y-2">
              <h4>Writer model</h4>
              <Select
                value={model}
                onChange={(val) => setModel(Array.isArray(val) ? val[0] : val)}
                options={(promptConfig?.variants ?? [])?.map((variant) => ({
                  value: variant.id,
                  label: variant.name,
                }))}
              />
            </div>

            {totalTokenUsed > 0 && (
              <div>
                <p>
                  Token used: <span className="font-semibold">{totalTokenUsed}</span>
                </p>
                <p>
                  Estimated cost:{" "}
                  <span className="font-semibold">
                    ${aiModel.calcPrice(tokenUsed.input, tokenUsed.output)}
                  </span>
                </p>
              </div>
            )}

            {status === "error" && (
              <Banner type="error">
                {error?.message || "An error occurred while generating the article."}
              </Banner>
            )}

            <div className="flex items-center justify-between">
              <Button
                buttonStyle="secondary"
                disabled={isGenerating}
                onClick={() => modal.closeModal(modalSlug)}
              >
                Cancel
              </Button>
              {isGenerating && (
                <Button type="button" buttonStyle="secondary" onClick={() => stop()}>
                  <StopCircleIcon className="mr-2 size-5" />
                  Stop
                </Button>
              )}
              {isDone ? (
                <Button type="button" onClick={() => insertArticle()}>
                  <FilePenLineIcon className="mr-2 size-5" />
                  Insert article
                </Button>
              ) : (
                <Button type="button" disabled={isGenerating || !model} onClick={() => generate()}>
                  <SparklesIcon className="mr-2 size-5" />
                  Generate
                </Button>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
