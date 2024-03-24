import { useStores } from "@directus/extensions-sdk"

import type { AppCollection } from "@directus/types"

export function findCollectionName(
  collection: AppCollection,
  userLang: string,
  key: "translation" | "plural" | "singular" = "translation",
) {
  return (
    collection.meta?.translations?.find((t) => t.language === userLang)?.[
      key
    ] ??
    collection.meta?.translations?.find(
      (t) => t.language.split("-")[0] === userLang.split("-")[0],
    )?.[key] ??
    collection.name ??
    collection.collection
  )
}

export function useUserLang(): string {
  const { useUserStore, useSettingsStore } = useStores()
  const userStore = useUserStore()
  const settingsStore = useSettingsStore()

  const systemLang = settingsStore.settings?.default_language ?? "en-US"
  const userLang = userStore.currentUser?.language ?? systemLang

  return userLang
}
