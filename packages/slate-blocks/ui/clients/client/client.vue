<script setup lang="ts">
import { ref } from "vue"

import BlockSettings from "../../../components/block-settings.vue"
import { fixedSvgImport } from "../../../utils/vue"
import previewDefault from "./preview-default.svg"

import type { ClientBlock } from "."
import type { RenderElementProps } from "@mattiaz9/slate-jsx"

const props = defineProps<Omit<RenderElementProps<ClientBlock>, "children">>()

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
      'client-block': true,
      [`variant-${element.variant ?? 'default'}`]: true,
    }"
    v-bind="attributes"
  >
    <div class="settings">
      <block-settings
        name="Client"
        :editor="props.editor"
        :element="props.element"
        :path="props.path"
        :variant="props.element.variant ?? 'default'"
        :variants="variants"
        has-extra-settings
      />
    </div>
    <slot />
  </div>
</template>

<style scoped>
.client-block {
  position: relative;
}
</style>
