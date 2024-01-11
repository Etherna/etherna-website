import type { Knex } from "knex"

export default {
  async up(knex: Knex) {
    await knex.schema.createTable("pages", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
      table.string("status").notNullable().defaultTo("draft")
      table
        .uuid("author_id")
        .notNullable()
        .references("id")
        .inTable("directus_users")
        .onDelete("SET NULL")
      table.boolean("show_in_menu").defaultTo(false)
      table.timestamps(true, true)
    })

    await knex.schema.alterTable("pages", (table) => {
      table
        .uuid("parent_page_id")
        .references("id")
        .inTable("pages")
        .onDelete("SET NULL")
    })

    await knex.schema.createTable("pages_translations", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
      table.string("title").notNullable()
      table.string("slug").notNullable().index()
      table.json("content")
      table.text("content_text")
      table.json("seo")
      table
        .uuid("page_id")
        .references("id")
        .inTable("pages")
        .onDelete("CASCADE")
      table
        .string("locale")
        .references("code")
        .inTable("languages")
        .onDelete("CASCADE")
    })
  },

  async down(knex: Knex) {
    await knex.schema.dropTable("pages_translations")
    await knex.schema.dropTable("pages")
  },
}
