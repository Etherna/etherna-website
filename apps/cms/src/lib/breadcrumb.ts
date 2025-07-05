/* eslint-disable @typescript-eslint/no-explicit-any */

import { PARENT_COLUMN_NAME } from "./const"

import type { BasePayload, CollectionSlug } from "payload"

export async function getParentsTree(
  doc: Record<string, any>,
  collection: CollectionSlug,
  payload: BasePayload,
) {
  const parents: Record<string, any>[] = [doc]

  let parentValue = doc[PARENT_COLUMN_NAME]

  if (typeof parentValue === "string" || typeof parentValue === "number") {
    parentValue = await payload.findByID({
      collection,
      id: parentValue,
    })
  }

  if (parentValue && typeof parentValue === "object") {
    const parentParents = await getParentsTree(parentValue, collection, payload)

    parents.unshift(...parentParents)
  }

  return parents
}
