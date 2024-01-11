import type { Knex } from "knex"

export default {
  async up(knex: Knex) {
    await knex.schema.createTable("projects", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
      table.string("status").notNullable().defaultTo("draft")
      table.string("external_link")
      table.string("github_link")
      table.uuid("image").references("id").inTable("directus_files")
      table.boolean("coming_soon")
      table.integer("sort")
      table.timestamps(true, true)
    })

    await knex.schema.createTable("projects_translations", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
      table.string("title").notNullable()
      table.string("slug").notNullable().index()
      table.text("content")
      table.json("seo")
      table
        .uuid("project_id")
        .references("id")
        .inTable("projects")
        .onDelete("CASCADE")
      table
        .string("locale")
        .references("code")
        .inTable("languages")
        .onDelete("CASCADE")
    })
  },

  async down(knex: Knex) {
    await knex.schema.dropTable("projects_translations")
    await knex.schema.dropTable("projects")
  },
}
