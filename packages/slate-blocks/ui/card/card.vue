<script setup lang="ts">
import { ref } from "vue"

import BlockAdder from "../../components/block-adder.vue"
import BlockSettings from "../../components/block-settings.vue"
import { fixedSvgImport } from "../../utils/vue"
import previewDefault from "./preview-default.svg"

import type { CardBlock } from "."
import type { RenderElementProps } from "@mattiaz9/slate-jsx"

const props = defineProps<Omit<RenderElementProps<CardBlock>, "children">>()

const variants = ref([
  {
    id: "default",
    name: "Default",
    preview: fixedSvgImport(previewDefault),
  },
])
</script>

<template>
  <div
    :class="{
      'card-block': true,
      [`variant-${element.variant ?? 'default'}`]: true,
    }"
    :style="{
      ['--card-bg-start']: element.backgroundStart,
      ['--card-bg-end']: element.backgroundEnd,
    }"
    v-bind="attributes"
  >
    <div class="settings">
      <block-adder :editor="props.editor" :path="props.path" />
      <block-settings
        name="Card"
        :editor="props.editor"
        :element="props.element"
        :path="props.path"
        :variant="props.element.variant ?? 'default'"
        :variants="variants"
        has-extra-settings
      />
    </div>
    <div class="card-block-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.card-block {
  --card-bg-start: var(--background-subdued);
  --card-bg-end: var(--background-subdued);

  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-block-content {
  position: relative;
  display: grid;
  gap: 2rem;
  padding: 2rem;
  border-radius: calc(var(--theme--border-radius) * 2);
  background: linear-gradient(135deg, var(--card-bg-start), var(--card-bg-end));
}

.card-block.variant-default > .card-block-content {
  grid-template-areas:
    "title"
    "text"
    "cta";
}

:global(.card-block > .card-block-content > [data-section-id="title"]) {
  grid-area: title;
}
:global(.card-block > .card-block-content > [data-section-id="text"]) {
  grid-area: text;
}
:global(.card-block > .card-block-content > [data-section-id="cta"]) {
  grid-area: cta;
}
</style>
