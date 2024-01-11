import type { Knex } from "knex"

export default {
  async up(knex: Knex) {
    await knex.schema.createTable("company_info", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
      table.string("company_name")
      table.string("company_address_locality")
      table.string("company_address_postal_code")
      table.string("company_address_street")
      table.string("company_address_country")
      table.string("company_email")
      table.string("company_keywords")
      table.string("facebook_url")
      table.string("instagram_url")
      table.string("twitter_url")
      table.string("linkedin_url")
      table.string("discord_url")
      table.string("telegram_url")
      table.string("github_url")
      table.date("company_founding_date")
    })
  },

  async down(knex: Knex) {
    await knex.schema.dropTable("company_info")
  },
}
