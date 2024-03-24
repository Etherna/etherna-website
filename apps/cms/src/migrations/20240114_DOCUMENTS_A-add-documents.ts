import type { Knex } from "knex"

export default {
  async up(knex: Knex) {
    await knex.schema.createTable("documents", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
      table.string("name")
      table.string("code").notNullable()
      table.uuid("file_id").references("id").inTable("directus_files")
      table.string("status").defaultTo("draft")
      table.timestamps(true, true)
    })
  },

  async down(knex: Knex) {
    await knex.schema.dropTable("documents")
  },
}
