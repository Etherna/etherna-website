<script setup lang="ts">
import { DirectusFile } from "@directus/sdk"
import { BaseEditor, Transforms } from "slate"
import { ImageElement, imageSelectionPath } from "slate-blocks/textual"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const props = defineProps<{
  editor: BaseEditor | null
}>()

function handleFile(file: DirectusFile<any> | null) {
  if (file) {
    Transforms.setNodes<ImageElement>(
      props.editor!,
      {
        src: file.id,
      },
      {
        at: imageSelectionPath.value!,
      },
    )
  }
  imageSelectionPath.value = undefined
}
</script>

<template>
  <v-drawer
    :model-value="imageSelectionPath?.values"
    icon="image"
    :title="t('upload_from_device')"
    cancelable
    @update:model-value="handleFile(null)"
    @cancel="handleFile(null)"
  >
    <div class="uploader-drawer-content">
      <v-upload :multiple="false" from-library from-url @input="handleFile" />
    </div>
  </v-drawer>
</template>

<style scoped>
.uploader-drawer-content {
  padding: var(--content-padding);
  padding-top: 0;
  padding-bottom: var(--content-padding);
}
</style>
