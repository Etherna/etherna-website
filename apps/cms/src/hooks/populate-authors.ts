import type { Post } from "@payload-types"
import type { CollectionAfterReadHook } from "payload"

export const populateAuthors: CollectionAfterReadHook<Post> = async ({
  doc,
  req,
  req: { payload },
}) => {
  if (req.user && !doc.authors) {
    doc.authors = [req.user.id]
  }

  if (doc.authors) {
    const authors = await Promise.all(
      doc.authors.map((author) =>
        payload.findByID({
          collection: "users",
          id: typeof author === "object" ? author.id : author,
          depth: 1,
          req,
        }),
      ),
    )

    doc.populatedAuthors = authors.map((authorDoc) => ({
      id: authorDoc.id,
      name: authorDoc.name,
      role: authorDoc.role,
      avatar: authorDoc.avatar,
    }))
  }

  return doc
}
