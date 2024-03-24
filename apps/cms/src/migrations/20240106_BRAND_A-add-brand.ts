import type { Knex } from "knex"

export default {
  async up(knex: Knex) {
    await knex.schema.createTable("brand", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
      table.json("colors")
      table.json("fonts")
    })

    await knex.schema.createTable("brand_logos", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
      table.string("name")
      table.integer("sort")
      table
        .uuid("brand_id")
        .references("id")
        .inTable("brand")
        .onDelete("CASCADE")
    })

    await knex.schema.createTable("brand_logos_variants", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
      table.string("variant_name")
      table.uuid("image").references("id").inTable("directus_files")
      table.string("style")
      table
        .uuid("brand_logo_id")
        .references("id")
        .inTable("brand_logos")
        .onDelete("CASCADE")
    })
  },

  async down(knex: Knex) {},
}
