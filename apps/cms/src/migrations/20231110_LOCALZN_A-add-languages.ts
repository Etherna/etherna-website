import type { Knex } from "knex"

export default {
  async up(knex: Knex) {
    await knex.schema.createTable("languages", (table) => {
      table.string("code").primary()
      table.string("name")
      table.uuid("icon").references("id").inTable("directus_files")
    })

    await knex("languages").insert({ code: "en", name: "English" })
    await knex("languages").insert({ code: "it", name: "Italiano" })
  },

  async down(knex: Knex) {
    await knex.schema.dropTable("languages")
  },
}
