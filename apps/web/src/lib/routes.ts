import { createRouteFn } from "route-fn"

export const route = createRouteFn([
  "/_preview",
  "/",
  "/:path",
  "/blog",
  "/blog/page/:page",
  "/blog/:slug",
  "/blog/category/:category",
  "/blog/category/:category/page/:page",
])
