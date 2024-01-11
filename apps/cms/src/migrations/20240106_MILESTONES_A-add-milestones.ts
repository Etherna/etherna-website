import type { Knex } from "knex"

export default {
  async up(knex: Knex) {
    await knex.schema.createTable("milestones", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
      table.uuid("image").references("id").inTable("directus_files")
      table.string("completion")
      table.string("completion_quarter")
      table.decimal("latitude", 10, 8)
      table.decimal("longitude", 11, 8)
      table.integer("sort")
      table.timestamps(true, true)
    })

    await knex.schema.createTable("milestones_translations", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
      table.string("title")
      table.string("subtitle")
      table.text("description")
      table
        .uuid("milestone_id")
        .references("id")
        .inTable("milestones")
        .onDelete("CASCADE")
      table
        .string("locale")
        .references("code")
        .inTable("languages")
        .onDelete("CASCADE")
    })
  },

  async down(knex: Knex) {
    await knex.schema.dropTable("milestones_translations")
    await knex.schema.dropTable("milestones")
  },
}
