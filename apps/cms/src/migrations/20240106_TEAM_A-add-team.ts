import type { Knex } from "knex"

export default {
  async up(knex: Knex) {
    await knex.schema.createTable("team_members", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
      table.string("status").notNullable().defaultTo("draft")
      table.string("name")
      table.uuid("photo").references("id").inTable("directus_files")
      table.integer("sort")
      table.timestamps(true, true)
    })

    await knex.schema.createTable("team_members_translations", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
      table.string("role")
      table.text("bio")
      table
        .uuid("team_member_id")
        .references("id")
        .inTable("team_members")
        .onDelete("CASCADE")
      table
        .string("locale")
        .references("code")
        .inTable("languages")
        .onDelete("CASCADE")
    })
  },

  async down(knex: Knex) {
    await knex.schema.dropTable("team_members_translations")
    await knex.schema.dropTable("team_members")
  },
}
