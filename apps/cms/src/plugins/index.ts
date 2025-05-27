import { formBuilder } from "./form-builder-plugin"
import { nestedDocs } from "./nested-docs-plugin"
import { redirects } from "./redirects-plugin"
import { seo } from "./seo-plugin"

import type { Plugin } from "payload"

export const plugins = [redirects, nestedDocs, seo, formBuilder] satisfies Plugin[]
