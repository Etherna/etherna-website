const BLOCK_MARKDOWN = /^(#{1,6}\s|>\s|[-*+]\s|\d+\.\s|---\s*$)/m
const INLINE_MARKDOWN =
  /(\*\*.+\*\*|__.+__|\*[^*\n]+\*|_[^_\n]+_|~~.+~~|\[[^\]]+\]\([^)]+\)|`[^`\n]+`)/

export function looksLikeMarkdown(text: string): boolean {
  const trimmed = text.trim()

  if (!trimmed) {
    return false
  }

  if (BLOCK_MARKDOWN.test(trimmed)) {
    return true
  }

  const lines = trimmed.split("\n")

  if (lines.length > 1 && INLINE_MARKDOWN.test(trimmed)) {
    return true
  }

  return INLINE_MARKDOWN.test(trimmed)
}
