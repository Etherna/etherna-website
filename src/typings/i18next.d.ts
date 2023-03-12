import type { resources } from "@/utils/lang"

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common"
    resources: (typeof resources)["en"]
  }
}
