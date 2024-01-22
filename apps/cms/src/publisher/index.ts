import { defineModule } from "@directus/extensions"
import indexVue from "./routes/index.vue"

export default defineModule({
  id: "publisher",
  name: "Publisher",
  icon: "published_with_changes",
  routes: [
    {
      path: "",
      component: indexVue,
    },
  ],
})
