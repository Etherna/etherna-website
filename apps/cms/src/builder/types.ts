import type { createEditor } from "./utils"
import type { RenderElementProps, SlateBlock } from "@mattiaz9/slate-jsx"

export type BlockEditor = ReturnType<typeof createEditor>

export type UiBlockProps<T extends SlateBlock<any, any>> = Omit<
  RenderElementProps<T>,
  "children"
>
