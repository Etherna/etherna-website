import type { CollectionAfterReadHook } from "payload"
import type { User } from "payload-types"

export const populateAuthors: CollectionAfterReadHook = async ({ doc, req, req: { payload } }) => {
  if (doc?.authors) {
    const authorDocs: User[] = []

    for (const author of doc.authors) {
      const authorDoc = await payload.findByID({
        id: typeof author === "object" ? author?.id : author,
        collection: "users",
        depth: 0,
        req,
      })

      authorDocs.push(authorDoc)
    }

    doc.populatedAuthors = authorDocs.map((authorDoc) => ({
      id: authorDoc.id,
      name: authorDoc.name,
    }))
  }

  return doc
}
