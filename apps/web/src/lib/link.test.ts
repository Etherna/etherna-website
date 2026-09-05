import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { resolveLinkHref } from "./link"

describe("resolveLinkHref", () => {
  it("returns the custom url for custom links", () => {
    assert.equal(
      resolveLinkHref({ linkType: "custom", url: "https://example.com" }, "en"),
      "https://example.com",
    )
  })

  it("resolves an internal redirect to its from path", () => {
    assert.equal(
      resolveLinkHref(
        {
          linkType: "internal",
          doc: {
            relationTo: "redirects",
            value: {
              from: "/discord",
              to: { type: "custom", url: "https://discord.com/invite/vfHYEXf" },
            },
          },
        },
        "en",
      ),
      "/discord",
    )
  })

  it("resolves an internal page to its localized path", () => {
    assert.equal(
      resolveLinkHref(
        {
          linkType: "internal",
          doc: {
            relationTo: "pages",
            value: { slug: "about", breadcrumbs: [{ url: "/about" }] },
          },
        },
        "en",
      ),
      "/about",
    )
    assert.equal(
      resolveLinkHref(
        {
          linkType: "internal",
          doc: {
            relationTo: "pages",
            value: { slug: "chi-siamo", breadcrumbs: [{ url: "/chi-siamo" }] },
          },
        },
        "it",
      ),
      "/it/chi-siamo",
    )
  })

  it("resolves an internal post to its localized blog path", () => {
    assert.equal(
      resolveLinkHref(
        {
          linkType: "internal",
          doc: { relationTo: "posts", value: { slug: "hello" } },
        },
        "it",
      ),
      "/it/blog/hello",
    )
  })

  it("falls back to url when the internal document is only an id", () => {
    assert.equal(
      resolveLinkHref(
        {
          linkType: "internal",
          url: "/fallback",
          doc: { relationTo: "pages", value: "abc123" },
        },
        "en",
      ),
      "/fallback",
    )
  })
})
