import { formBuilder } from "./form-builder-plugin"
import { nestedDocs } from "./nested-docs-plugin"
import { redirects } from "./redirects-plugin"
import { scheduler } from "./scheduler"
import { seo } from "./seo-plugin"

import type { Plugin } from "payload"

export const plugins = [redirects, nestedDocs, seo, formBuilder, scheduler] satisfies Plugin[]
