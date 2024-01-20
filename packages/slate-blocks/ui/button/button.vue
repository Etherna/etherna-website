<script setup lang="ts">
import { ref } from "vue"

import BlockSettings from "../../components/block-settings.vue"
import { fixedSvgImport } from "../../utils/vue"
import previewDefault from "./preview-default.svg"
import previewGhost from "./preview-ghost.svg"
import previewOutline from "./preview-outline.svg"

import type { ButtonBlock } from "."
import type { RenderElementProps } from "@mattiaz9/slate-jsx"

const props = defineProps<Omit<RenderElementProps<ButtonBlock>, "children">>()

const variants = ref([
  {
    id: "default",
    name: "Default",
    preview: fixedSvgImport(previewDefault),
  },
  {
    id: "ghost",
    name: "Ghost",
    preview: fixedSvgImport(previewGhost),
  },
  {
    id: "outline",
    name: "Outline",
    preview: fixedSvgImport(previewOutline),
  },
])
</script>

<template>
  <div
    :class="{
      'button-block': true,
      [`variant-${element.variant ?? 'default'}`]: true,
    }"
    v-bind="attributes"
  >
    <block-settings
      name="Button"
      :editor="props.editor"
      :element="props.element"
      :path="props.path"
      :variant="props.element.variant ?? 'default'"
      :variants="variants"
      has-extra-settings
    />
    <div class="button">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.button-block > .button {
  position: relative;
  display: inline-block;
  text-align: center;
  border-radius: var(--theme--border-radius);
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  margin-top: 0.25rem;
}
.button-block.variant-default > .button {
  background-color: var(--theme--primary);
  color: var(--theme--foreground);
}
.button-block.variant-outline > .button {
  background-color: transparent;
  color: var(--theme--primary);
  border: 1px solid var(--theme--primary);
}
.button-block.variant-ghost > .button {
  background-color: color-mix(
    in srgb,
    var(--background-subdued),
    var(--background-inverted) 5%
  );
  color: var(--theme--foreground);
}
</style>
