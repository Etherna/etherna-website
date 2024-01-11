import type { Knex } from "knex"

export default {
  async up(knex: Knex) {
    await knex.schema.createTable("blog_categories", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
      table.uuid("parent_id")
      table.string("color")
      table.integer("sort")
      table
        .uuid("icon")
        .references("id")
        .inTable("directus_files")
        .onDelete("SET NULL")
      table.timestamps(true, true)
    })

    await knex.schema.alterTable("blog_categories", (table) => {
      table
        .foreign("parent_id")
        .references("id")
        .inTable("blog_categories")
        .onDelete("SET NULL")
    })

    await knex.schema.createTable("blog_categories_translations", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
      table.string("name").notNullable()
      table.string("slug").notNullable().index()
      table.text("description")
      table
        .uuid("category_id")
        .references("id")
        .inTable("blog_categories")
        .onDelete("CASCADE")
      table
        .string("locale")
        .references("code")
        .inTable("languages")
        .onDelete("CASCADE")
    })
  },

  async down(knex: Knex) {
    await knex.schema.dropTable("blog_categories_translations")
    await knex.schema.dropTable("blog_categories")
  },
}
