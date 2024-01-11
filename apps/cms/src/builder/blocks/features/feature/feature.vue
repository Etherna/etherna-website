<script setup lang="ts">
import { ref } from "vue"
import { fixedSvgImport } from "../../../../shared/utils/vue"
import BlockSettings from "../../block-settings.vue"
import previewDefault from "./preview-default.svg"

import type { FeatureBlock } from "."
import type { RenderElementProps } from "@mattiaz9/slate-jsx"

const props = defineProps<Omit<RenderElementProps<FeatureBlock>, "children">>()

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
      'feature-block': true,
      [`variant-${element.variant ?? 'default'}`]: true,
    }"
    v-bind="attributes"
  >
    <block-settings
      name="Feature"
      :editor="props.editor"
      :element="props.element"
      :path="props.path"
      :variant="props.element.variant ?? 'default'"
      :variants="variants"
      has-extra-settings
    />

    <slot />
  </div>
</template>

<style scoped>
.feature-block {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
