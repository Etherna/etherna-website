<script setup lang="ts">
import { Transforms } from "slate"
import { ref, watch } from "vue"
import { fixedSvgImport, svgStringToHtmlElement } from "../utils/vue"
import tableHeaderBottomSelected from "./assets/table-header-bottom.svg"
import tableHeaderLeftSelected from "./assets/table-header-left.svg"
import tableHeaderRightSelected from "./assets/table-header-right.svg"
import tableHeaderTopSelected from "./assets/table-header-top.svg"
import tableHeadersBase from "./assets/table-headers.svg"

import type { BaseEditor, Path } from "slate"
import type { TableElement } from "slate-blocks/textual"

const props = defineProps<{
  editor: BaseEditor
  element: TableElement
  path: Path
}>()

const rows = ref(props.element.rows || 1)
const columns = ref(props.element.columns || 1)
const headers = ref(props.element.headers ?? [])
const headersDef = ref([
  {
    value: "top",
    text: "Top",
  },
  {
    value: "bottom",
    text: "Bottom",
  },
  {
    value: "left",
    text: "Left",
  },
  {
    value: "right",
    text: "Right",
  },
])

watch(
  () => props.element,
  (element) => {
    rows.value = element.rows || 1
    columns.value = element.columns || 1
    headers.value = element.headers ?? []
  },
  { immediate: true },
)

function setNumberProp(key: "rows" | "columns", value: number) {
  if (!props.editor.selection) return

  value = parseInt(value.toString())

  if (isNaN(value)) return

  const headerKey = key === "rows" ? "top" : "left"
  const footerKey = key === "rows" ? "bottom" : "right"

  const plusHeader = headers.value.includes(headerKey) ? 1 : 0
  const plusFooter = headers.value.includes(footerKey) ? 1 : 0
  const min = Math.min(1, plusHeader + plusFooter)

  const currentValueRef = key === "rows" ? rows : columns

  if (value >= min && value !== currentValueRef.value) {
    Transforms.setNodes<TableElement>(
      props.editor,
      { [key]: value },
      { at: props.path },
    )

    currentValueRef.value = value
  }
}

function setHeaders(value: TableElement["headers"]) {
  if (!props.editor.selection) return

  Transforms.setNodes<TableElement>(
    props.editor,
    { headers: value },
    { at: props.path },
  )
  headers.value = value ?? []
}
</script>

<template>
  <label for="table-rows-count">Rows</label>
  <interface-input
    id="table-rows-count"
    type="integer"
    :min="1"
    :step="1"
    :value="rows"
    @input="setNumberProp('rows', $event)"
  />

  <label for="table-cols-count">Columns</label>
  <interface-input
    id="table-cols-count"
    type="integer"
    :min="1"
    :step="1"
    :value="columns"
    @input="setNumberProp('columns', $event)"
  />

  <label for="table-headers">Headers</label>
  <v-select
    id="table-headers"
    :items="headersDef"
    :model-value="headers"
    @update:model-value="setHeaders"
    multiple
  >
    <template #prepend>
      <div class="headers-selection">
        <span
          v-html="fixedSvgImport(svgStringToHtmlElement(tableHeadersBase))"
        />
        <span
          v-if="headers.includes('top')"
          v-html="
            fixedSvgImport(svgStringToHtmlElement(tableHeaderTopSelected))
          "
        />
        <span
          v-if="headers.includes('bottom')"
          v-html="
            fixedSvgImport(svgStringToHtmlElement(tableHeaderBottomSelected))
          "
        />
        <span
          v-if="headers.includes('left')"
          v-html="
            fixedSvgImport(svgStringToHtmlElement(tableHeaderLeftSelected))
          "
        />
        <span
          v-if="headers.includes('right')"
          v-html="
            fixedSvgImport(svgStringToHtmlElement(tableHeaderRightSelected))
          "
        />
      </div>
    </template>
  </v-select>
</template>

<style scoped>
label {
  font-size: 12px;
}

.headers-selection {
  display: grid;
  grid-template-columns: 24px;
  grid-template-rows: 24px;
}
.headers-selection > * {
  grid-row-start: 1;
  grid-column-start: 1;
}
</style>
