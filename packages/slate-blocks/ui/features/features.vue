<script setup lang="ts">
import { ref } from "vue"

import BlockAdder from "../../components/block-adder.vue"
import BlockSettings from "../../components/block-settings.vue"
import { fixedSvgImport } from "../../utils/vue"
import previewDefault from "./preview-default.svg"

import type { FeaturesBlock } from "."
import type { RenderElementProps } from "@mattiaz9/slate-jsx"

const props = defineProps<Omit<RenderElementProps<FeaturesBlock>, "children">>()

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
      'features-block': true,
      [`variant-${element.variant ?? 'default'}`]: true,
    }"
    v-bind="attributes"
  >
    <div class="settings">
      <block-adder :editor="props.editor" :path="props.path" />
      <block-settings
        name="Features"
        :editor="props.editor"
        :element="props.element"
        :path="props.path"
        :variant="props.element.variant ?? 'default'"
        :variants="variants"
        has-extra-settings
      />
    </div>
    <div class="features-block-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.features-block {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.features-block-content {
  position: relative;
  display: grid;
}

.features-block.variant-default > .features-block-content {
  grid-template-areas:
    "title"
    "text"
    "features";
}

:global(.features-block > .features-block-content > [data-section-id="title"]) {
  grid-area: title;
  text-align: center;
}
:global(.features-block > .features-block-content > [data-section-id="text"]) {
  grid-area: text;
  text-align: center;
}
:global(
    .features-block > .features-block-content > [data-section-id="features"]
  ) {
  grid-area: features;
  margin-top: 2rem;
}
:global(
    .features-block > .features-block-content > [data-section-id="features"]
  ) {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 1rem;
}
</style>
