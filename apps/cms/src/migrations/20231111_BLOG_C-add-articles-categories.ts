import type { Knex } from "knex"

export default {
  async up(knex: Knex) {
    await knex.schema.createTable("blog_articles_categories", table => {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
      table.uuid("article_id").references("id").inTable("blog_articles").onDelete("CASCADE")
      table.uuid("category_id").references("id").inTable("blog_categories").onDelete("CASCADE")
    })
  },

  async down(knex: Knex) {
    await knex.schema.dropTable("blog_articles_categories")
  },
}
