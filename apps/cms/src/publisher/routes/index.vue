<script setup lang="ts">
import { useApi, useStores } from "@directus/extensions-sdk"
import { onMounted, ref } from "vue"
import { findCollectionName, useUserLang } from "../../shared/utils/system"
import Sidebar from "./sidebar.vue"

import type { GitHubWorkflowRun } from "./types"
import type { DirectusActivity } from "@directus/sdk"
import type { AppCollection } from "@directus/types"

const api = useApi()
const { useCollectionsStore } = useStores()
const collectionsStore = useCollectionsStore()
const userLang = useUserLang()
const collections = collectionsStore.allCollections as AppCollection[]

const deploys = ref<GitHubWorkflowRun[]>([])
const unpublishedActivities = ref<DirectusActivity<{}>[]>([])
const isTriggering = ref(false)
const collectionNames = ref(new Map<string, string>())

onMounted(async () => {
  await fetchDeploys()

  const firstSuccess = deploys.value.find(
    (deploy) => deploy.conclusion === "success",
  )

  await fetchActivitiesFrom(firstSuccess?.created_at)
})

async function fetchDeploys() {
  deploys.value = (await api.get("/deploys")).data
}

async function fetchActivitiesFrom(timestamp: string | undefined) {
  const fromDate = timestamp ? new Date(timestamp) : new Date(0)
  const activitiesResponse = await api.get("/activity", {
    params: {
      filter: {
        timestamp: {
          _gt: fromDate.toISOString(),
        },
        collection: {
          _nstarts_with: "directus_",
        },
      },
    },
  })
  unpublishedActivities.value = activitiesResponse.data.data
}

async function triggerDeploy() {
  try {
    isTriggering.value = true

    const resp = await api.post<GitHubWorkflowRun>("/deploys")

    unpublishedActivities.value = []

    const sameDeployIndex = deploys.value.findIndex(
      (deploy) => deploy.id === resp.data.id,
    )

    if (sameDeployIndex) {
      if (deploys.value[sameDeployIndex]!.status === "in_progress") {
        deploys.value[sameDeployIndex]!.status = "queued"
      }
    } else {
      deploys.value.unshift(resp.data)
    }
  } catch (error) {
    console.error(error)
  } finally {
    isTriggering.value = false
  }

  setTimeout(() => {
    fetchDeploys()
  }, 2000)
}

function updateRun(run: GitHubWorkflowRun) {
  const index = deploys.value.findIndex((deploy) => deploy.id === run.id)

  if (index === -1) {
    deploys.value.unshift(run)
  } else {
    deploys.value[index] = run
  }
}

function getCollectionName(collectionKey: string) {
  if (collectionNames.value.has(collectionKey)) {
    return collectionNames.value.get(collectionKey)
  }

  const collection = collections.find((c) => c.collection === collectionKey)

  if (collection) {
    const collectionName = findCollectionName(collection, userLang, "singular")
    collectionNames.value.set(collectionKey, collectionName)

    return collectionName
  } else {
    collectionNames.value.set(collectionKey, collectionKey)
    return collectionKey
  }
}
</script>

<template>
  <private-view title="Publish website">
    <template #navigation>
      <Sidebar :deploys="deploys" @update:run="updateRun" />
    </template>
    <template #actions>
      <v-button
        :loading="isTriggering"
        :disabled="isTriggering"
        small
        @click="triggerDeploy"
      >
        <v-icon name="restart_alt" />
        Trigger deploy
      </v-button>
    </template>

    <div class="deployer-content">
      <h2>Current changes</h2>

      <ul class="activities-list">
        <li
          v-for="activity in unpublishedActivities"
          class="activities-list-item"
        >
          <div class="activities-list-item-header">
            <h3>{{ getCollectionName(activity.collection) }}</h3>
            <div
              :class="{
                'activities-list-item-status': true,
                [activity.action]: true,
              }"
            >
              {{ activity.action }}
            </div>
          </div>
          <router-link
            class="activities-list-item-id"
            :to="`/admin/content/${activity.collection}/${activity.item}`"
          >
            {{ activity.item }}
            <v-icon name="arrow_outward" xSmall />
          </router-link>
          <div class="activities-list-item-timestamp">
            {{
              new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(activity.timestamp))
            }}
          </div>
        </li>
      </ul>
    </div>
  </private-view>
</template>

<style scoped>
.deployer-content {
  display: flex;
  flex-direction: column;
  padding: 0 var(--content-padding);
  margin: 1rem;
  max-width: 600px;
}

.deployer-content h2 {
  font-weight: 600;
  margin-bottom: 1rem;
}

.activities-list {
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
}

.activities-list-item {
  padding: 0.75rem;
  border-radius: var(--theme--border-radius);
  border: 1px solid var(--theme--form--field--input--border-color);
}
.activities-list-item:not(:first-of-type) {
  margin-top: 2rem;
}

.activities-list-item-header {
  display: flex;
  align-items: center;
}

.activities-list-item-status {
  margin-left: auto;
  padding: 2px 6px;
  border-radius: calc(var(--theme--border-radius) * 0.5);
  background-color: var(--background-normal-alt);
  color: white;
  font-weight: 600;
  font-size: 0.685rem;
  text-transform: uppercase;
  line-height: 1.2;
}
.activities-list-item-status.create {
  background-color: var(--green-75);
}
.activities-list-item-status.update {
  background-color: var(--blue);
}
.activities-list-item-status.delete {
  background-color: var(--danger);
}

.activities-list-item-id {
  font-size: 0.8rem;
  color: var(--theme--foreground-subdued);
  cursor: pointer;
  line-height: 1.1;
}
.activities-list-item-id:hover {
  text-decoration: underline;
}

.activities-list-item-timestamp {
  font-size: 0.8rem;
  color: var(--theme--foreground-subdued);
  line-height: 1.1;
}
</style>
