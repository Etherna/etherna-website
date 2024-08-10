import type { Knex } from "knex"

export default {
  async up(knex: Knex) {
    await knex.schema.alterTable("languages", (table) => {
      table.string("direction").defaultTo("ltr")
    })
  },

  async down(knex: Knex) {
    await knex.schema.alterTable("languages", (table) => {
      table.dropColumn("direction")
    })
  },
}
