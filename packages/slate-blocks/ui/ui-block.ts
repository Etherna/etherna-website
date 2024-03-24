import { SlateBlock } from "@mattiaz9/slate-jsx"
import { shallowRef } from "vue"

import type { SlateBlockOptions, SlateElement } from "@mattiaz9/slate-jsx"
import type { Path } from "slate"

export interface LayoutProps<Id extends string, Props = unknown> {
  block: SlateBlock<Id, Props>
  props?: Partial<Props>
  multiple?: boolean
}

export interface UiBlockOptions<Id extends string, Props>
  extends SlateBlockOptions<Id, Props> {
  layout?: LayoutProps<any>[]
}

export const settingsElement = shallowRef<{
  element: SlateElement<any, any> | undefined
  path: Path | undefined
}>()

export abstract class UiBlock<Id extends string, Props> extends SlateBlock<
  Id,
  Props
> {
  constructor(
    public id: Id,
    public options: UiBlockOptions<Id, Props>
  ) {
    super(id, options)
  }
}
