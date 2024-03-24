<script setup lang="ts">
import { useStores } from "@directus/extensions-sdk"
import { computed, reactive, ref, watch } from "vue"
import { findCollectionName, useUserLang } from "../utils/system"

import type { useApi } from "@directus/extensions-sdk"

const { useCollectionsStore } = useStores()
const collectionsStore = useCollectionsStore()
const userLang = useUserLang()

const props = defineProps<{
  to: { id: string; type: string } | undefined
  href: string | undefined
  target: string | undefined
  linkCollections?: string[]
  api: ReturnType<typeof useApi>
}>()

const currentValue = reactive({
  to: props.to,
  href: props.href,
  target: props.target,
})

const hrefInput = ref<HTMLInputElement | null>(null)
const linkDrawerOpen = ref(false)
const linkToItems = ref<{ text: string; value: string; slug: string }[]>([])
const linkMenuType = ref<("entity" | "url")[]>(
  props.href ? ["url"] : ["entity"],
)

const linkToType = computed(() => {
  return currentValue.to?.type
})
const linkToTypeName = computed(() => {
  return linkToType.value
    ? getCollectionName(linkToType.value).toLowerCase()
    : linkToType.value
})
const linkToId = computed(() => {
  return currentValue?.to?.id
})
const linkToSlug = computed(() => {
  return (
    linkToItems.value.find((item) => item.value === linkToId.value)?.slug ??
    linkToId.value
  )
})
const linkToTypes = computed(() => {
  return (props.linkCollections ?? []).map((collectionKey) => {
    return {
      text: getCollectionName(collectionKey),
      value: collectionKey,
    }
  })
})

const emit = defineEmits(["update:to", "update:href", "update:target"])

watch(
  () => props.to,
  () => {
    currentValue.to = props.to
  },
)
watch(
  () => props.href,
  () => {
    currentValue.href = props.href
    linkMenuType.value = props.href ? ["url"] : ["entity"]
  },
)
watch(
  () => props.target,
  () => {
    currentValue.target = props.target
  },
)
watch(
  () => hrefInput.value,
  (value) => {
    if (value && "$el" in value) {
      const wrapper = value.$el as HTMLElement
      const input = wrapper.querySelector("input")
      input?.addEventListener("blur", (e) => handleHrefBlurEnter(e))
      input?.addEventListener("keydown", (e) => handleHrefBlurEnter(e))
    }
  },
)
watch(
  () => props.to,
  async (value) => {
    if (value) {
      const response = await props.api.get<{
        data: {
          id: string
          translations: { title: string; slug: string; locale: string }[]
        }[]
      }>(`/items/${value.type}`, {
        params: {
          fields: "id,translations.title,translations.slug,translations.locale",
        },
      })
      linkToItems.value = response.data.data.map((item) => {
        const translations =
          item.translations.find((t) => t.locale === userLang.split("-")[0]) ??
          item.translations[0]
        return {
          text: translations?.title ?? item.id,
          value: item.id,
          slug: translations?.slug ?? item.id,
        }
      })
    }
  },
)

function getCollectionName(collectionKey: string) {
  const collection = collectionsStore.getCollection(collectionKey)
  return findCollectionName(collection as any, userLang)
}

function updateLink(link: string | { id: string; type: string } | undefined) {
  if (link === undefined) {
    emit("update:to", undefined)
    emit("update:href", undefined)
    emit("update:target", undefined)
  } else if (typeof link === "string") {
    emit("update:to", undefined)
    emit("update:href", link)
  } else {
    emit("update:to", link)
    emit("update:href", undefined)
  }
}

function resetLink() {
  updateLink("")
  linkDrawerOpen.value = false
}

function updateHref(e: InputEvent) {
  currentValue.href = (e.target as HTMLInputElement).value
}

function handleHrefBlurEnter(event: KeyboardEvent | FocusEvent) {
  if ("key" in event) {
    if (event.key === "Enter") {
      event.preventDefault()
      event.stopPropagation()

      updateLink(currentValue.href)
    }
  } else {
    updateLink(currentValue.href)
  }
}

function toggleTarget() {
  const isActive = currentValue.target === "_blank"
  emit("update:target", isActive ? undefined : "_blank")
}
</script>

<template>
  <div class="block-link-editor">
    <v-tabs class="tabs" v-model="linkMenuType" small>
      <v-tab class="tabs-item" value="entity">Page</v-tab>
      <v-tab class="tabs-item" value="url">Url</v-tab>
    </v-tabs>
    <div class="link-to-content" v-if="linkMenuType[0] === 'entity'">
      <v-button
        class="link-to-button"
        align="left"
        secondary
        small
        fullWidth
        @click="linkDrawerOpen = true"
      >
        <span>{{ linkToTypeName ?? "--" }}</span>
        <span>/</span>
        <span>{{ linkToSlug ?? "--" }}</span>
        <v-icon name="open_in_new" style="margin-left: auto" small />
      </v-button>
    </div>
    <div v-if="linkMenuType[0] === 'url'">
      <v-input ref="hrefInput" :model-value="href" @input="updateHref" small />
    </div>
    <div>
      <v-checkbox
        label="Open in new tab"
        :model-value="target === '_blank'"
        @update:model-value="toggleTarget()"
      />
    </div>
  </div>

  <v-drawer
    v-model="linkDrawerOpen"
    icon="link"
    title="Select an item to link to"
    cancelable
    @cancel="linkDrawerOpen = false"
  >
    <div class="drawer-content">
      <div>
        <label for="link-page-type">Page type</label>
        <v-select
          id="link-page-type"
          :items="linkToTypes"
          :model-value="linkToType"
          @update:model-value="
            updateLink({
              type: $event,
              id: linkToId ?? '',
            })
          "
        />
      </div>
      <div>
        <label for="link-page-item">Page item</label>
        <v-select
          id="link-page-item"
          :items="linkToItems"
          :model-value="linkToId"
          label
          @update:model-value="
            updateLink({
              type: linkToType ?? '',
              id: $event,
            })
          "
        />
      </div>
      <div class="actions">
        <v-button @click="linkDrawerOpen = false">Save</v-button>
        <v-button secondary kind="danger" @click="resetLink">Delete</v-button>
      </div>
    </div>
  </v-drawer>
</template>

<style scoped>
.block-link-editor {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tabs {
  width: 100%;
  border-radius: var(--theme--border-radius);
  overflow: hidden;
}

.tabs-item {
  padding: 0.05rem 0.5rem;
  font-size: 14px;
  line-height: 1;
  height: 2rem;
}

.drawer-content {
  padding: var(--content-padding);
  padding-top: 0;
  padding-bottom: var(--content-padding);
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.link-to-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.link-to-button {
  width: 100%;
  max-width: 13rem;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  white-space: nowrap;
  justify-content: flex-start;
}
:global(.link-to-button .content) {
  width: 100%;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}
</style>
