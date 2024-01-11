import type { Knex } from "knex"

export default {
  async up(knex: Knex) {
    await knex.schema.createTable("blog_articles", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
      table
        .uuid("primary_category_id")
        .references("id")
        .inTable("blog_categories")
        .onDelete("SET NULL")
      table.string("status").notNullable().defaultTo("draft")
      table
        .uuid("author_id")
        .references("id")
        .inTable("directus_users")
        .onDelete("SET NULL")
      table.timestamp("published_at")
      table.timestamp("edited_at")
      table.timestamps(true, true)
    })

    await knex.schema.createTable("blog_articles_translations", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
      table.string("title").notNullable()
      table.string("slug").notNullable().index()
      table.text("excerpt")
      table.json("content")
      table.json("seo")
      table
        .uuid("thumbnail")
        .references("id")
        .inTable("directus_files")
        .onDelete("SET NULL")
      table
        .uuid("article_id")
        .references("id")
        .inTable("blog_articles")
        .onDelete("CASCADE")
      table
        .string("locale")
        .references("code")
        .inTable("languages")
        .onDelete("CASCADE")
    })
  },

  async down(knex: Knex) {
    await knex.schema.dropTable("blog_articles_translations")
    await knex.schema.dropTable("blog_articles")
  },
}
