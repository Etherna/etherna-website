<script setup lang="ts">
import { useApi } from "@directus/extensions-sdk"
import { computed, ref, watch } from "vue"

import type { GitHubWorkflowRun } from "./types"

const api = useApi()

const props = defineProps<{
  deploys: GitHubWorkflowRun[]
}>()

const emit = defineEmits(["update:run"])

const updateInterval = ref<number | null>(null)

const lastDeploy = computed(() => {
  return props.deploys[0]
})

watch(lastDeploy, () => {
  if (!lastDeploy.value) {
    stopWatching()
    return
  }

  const shouldUpdate = ["requested", "queued", "pending", "waiting"].includes(
    lastDeploy.value.status!,
  )

  if (shouldUpdate) {
    watchChangesFor(lastDeploy.value.id)
  } else {
    stopWatching()
  }
})

async function watchChangesFor(runId: number) {
  stopWatching()

  updateInterval.value = window.setInterval(async () => {
    try {
      const resp = await api.get<GitHubWorkflowRun>(`/deploys/${runId}`)

      if (resp.data.status === "completed") {
        stopWatching()
      }

      emit("update:run", resp.data)
    } catch (error) {}
  }, 3000)
}

function stopWatching() {
  clearInterval(updateInterval.value!)
}
</script>

<template>
  <div class="deploys">
    <h2>Deploys</h2>
    <v-list large nav>
      <v-list-item
        v-for="deploy in deploys"
        :href="deploy.html_url"
        :key="deploy.id"
      >
        <v-list-item-icon>
          <div
            :class="{
              dot: true,
              pending:
                deploy.status === 'queued' ||
                deploy.status === 'in_progress' ||
                deploy.status === 'pending',
              deployed: deploy.conclusion === 'success',
              cancelled: deploy.conclusion === 'cancelled',
              errored: deploy.conclusion === 'failure',
            }"
          >
            <div v-if="deploy.status === 'in_progress'" class="dot-pulsar" />
          </div>
        </v-list-item-icon>
        <v-list-item-content>
          <div>{{ deploy.name }}</div>
          <div class="deploy-subtitle">
            {{
              new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(deploy.updated_at))
            }}
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<style scoped>
.deploys {
}

.deploys h2 {
  padding: 20px 20px 0 20px;
  font-weight: 600;
}

.deploy-subtitle {
  font-size: 12px;
  color: var(--theme--foreground-subdued);
}

.dot {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 4px;
}
.dot.pending {
  background-color: var(--warning);
}
.dot.deployed {
  background-color: var(--success);
}
.dot.cancelled {
  background-color: var(--background-normal-alt);
}
.dot.errored {
  background-color: var(--danger);
}

@keyframes ping {
  75%,
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
.dot-pulsar {
  animation: ping 1.5s cubic-bezier(0, 0, 0.5, 1.2) infinite;
  position: absolute;
  display: inline-flex;
  height: 100%;
  width: 100%;
  border-radius: 9999px;
  background-color: var(--warning);
  opacity: 0.75;
}
</style>
