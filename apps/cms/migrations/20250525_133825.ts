import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'it');
  CREATE TABLE IF NOT EXISTS "pages_hero_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" varchar DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_appearance" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_hero_badges_locales" (
  	"link_url" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" varchar DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_appearance" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_hero_links_locales" (
  	"link_url" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_text_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'h2',
  	"title_size" varchar,
  	"centered" boolean DEFAULT false,
  	"force_full_width" boolean DEFAULT false,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_text_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_prose_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_prose" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_prose_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_cta_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" varchar DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_appearance" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_cta_links_locales" (
  	"link_url" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'h2',
  	"title_size" varchar,
  	"centered" boolean DEFAULT false,
  	"force_full_width" boolean DEFAULT false,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"media_id" uuid,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_cta_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_mlst_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"status" varchar DEFAULT 'completed',
  	"media_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_mlst_items_locales" (
  	"title" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_mlst_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_mlst" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" varchar,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_mlst_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_clients_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_clients_clients" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" uuid,
  	"link_type" varchar DEFAULT 'reference',
  	"link_new_tab" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_clients_clients_locales" (
  	"link_url" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_clients" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'h2',
  	"title_size" varchar,
  	"centered" boolean DEFAULT false,
  	"force_full_width" boolean DEFAULT false,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_clients_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_features_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_features_items_locales" (
  	"title" varchar,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'h2',
  	"title_size" varchar,
  	"centered" boolean DEFAULT false,
  	"force_full_width" boolean DEFAULT false,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_features_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_awards_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_awards_awards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"issuer" varchar,
  	"logo_id" uuid,
  	"link_type" varchar DEFAULT 'reference',
  	"link_new_tab" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_awards_awards_locales" (
  	"name" varchar,
  	"link_url" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_awards" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'h2',
  	"title_size" varchar,
  	"centered" boolean DEFAULT false,
  	"force_full_width" boolean DEFAULT false,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_awards_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_stats_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_stats_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'h2',
  	"title_size" varchar,
  	"centered" boolean DEFAULT false,
  	"force_full_width" boolean DEFAULT false,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_stats_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_grid_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_grid_rows_items_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_grid_rows_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"effect" varchar DEFAULT 'zoom',
  	"accent_color" varchar,
  	"link_type" varchar DEFAULT 'reference',
  	"link_new_tab" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_grid_rows_items_locales" (
  	"title" varchar,
  	"description" jsonb,
  	"link_url" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_grid_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'h2',
  	"title_size" varchar,
  	"centered" boolean DEFAULT false,
  	"force_full_width" boolean DEFAULT false,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"size" varchar DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_grid_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_bento_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_bento_items_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_bento_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"accent_color" varchar,
  	"row_span" numeric DEFAULT 1,
  	"col_span" numeric DEFAULT 3,
  	"link_type" varchar DEFAULT 'reference',
  	"link_new_tab" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_bento_items_locales" (
  	"title" varchar,
  	"description" jsonb,
  	"link_url" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_bento" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'h2',
  	"title_size" varchar,
  	"centered" boolean DEFAULT false,
  	"force_full_width" boolean DEFAULT false,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_bento_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_tstm_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_tstm_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"avatar_id" uuid,
  	"link_type" varchar DEFAULT 'reference',
  	"link_new_tab" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_tstm_items_locales" (
  	"role" varchar,
  	"quote" jsonb,
  	"link_url" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_tstm" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'h2',
  	"title_size" varchar,
  	"centered" boolean DEFAULT false,
  	"force_full_width" boolean DEFAULT false,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_tstm_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_faq_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_faq_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_faq_faqs_locales" (
  	"question" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'h2',
  	"title_size" varchar,
  	"centered" boolean DEFAULT false,
  	"force_full_width" boolean DEFAULT false,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_faq_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_team_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"photo_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_team_members_locales" (
  	"role" varchar,
  	"bio" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'h2',
  	"title_size" varchar,
  	"centered" boolean DEFAULT false,
  	"force_full_width" boolean DEFAULT false,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_team_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_related_posts_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_related_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'h2',
  	"title_size" varchar,
  	"centered" boolean DEFAULT false,
  	"force_full_width" boolean DEFAULT false,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_related_posts_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_form_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'h2',
  	"title_size" varchar,
  	"centered" boolean DEFAULT false,
  	"force_full_width" boolean DEFAULT false,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"form_id" uuid,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_form_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_brand_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_brand_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"svg_logo_id" uuid,
  	"png_logo_id" uuid,
  	"variant" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_brand_colors" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_brand_colors_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_brand" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'h2',
  	"title_size" varchar,
  	"centered" boolean DEFAULT false,
  	"force_full_width" boolean DEFAULT false,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_brand_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_jobs_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_jobs" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'h2',
  	"title_size" varchar,
  	"centered" boolean DEFAULT false,
  	"force_full_width" boolean DEFAULT false,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_jobs_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" uuid,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"hero_type" varchar DEFAULT 'lowImpact',
  	"hero_background_image_id" uuid,
  	"slug_lock" boolean DEFAULT true,
  	"published_at" timestamp(3) with time zone,
  	"parent_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" varchar DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_locales" (
  	"title" varchar DEFAULT 'Untitled Page',
  	"hero_title" varchar,
  	"hero_description" jsonb,
  	"hero_media_id" uuid,
  	"meta_title" varchar,
  	"meta_image_id" uuid,
  	"meta_description" varchar,
  	"slug" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" uuid,
  	"posts_id" uuid,
  	"redirects_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"link_type" varchar DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_appearance" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_badges_locales" (
  	"link_url" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"link_type" varchar DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_appearance" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_links_locales" (
  	"link_url" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_text_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar DEFAULT 'h2',
  	"title_size" varchar,
  	"centered" boolean DEFAULT false,
  	"force_full_width" boolean DEFAULT false,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_text_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_prose_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_prose" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_prose_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"link_type" varchar DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_appearance" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta_links_locales" (
  	"link_url" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar DEFAULT 'h2',
  	"title_size" varchar,
  	"centered" boolean DEFAULT false,
  	"force_full_width" boolean DEFAULT false,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"media_id" uuid,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_mlst_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"date" varchar,
  	"status" varchar DEFAULT 'completed',
  	"media_id" uuid,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_mlst_items_locales" (
  	"title" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_mlst_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_mlst" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"type" varchar,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_mlst_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_clients_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_clients_clients" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"logo_id" uuid,
  	"link_type" varchar DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_clients_clients_locales" (
  	"link_url" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_clients" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar DEFAULT 'h2',
  	"title_size" varchar,
  	"centered" boolean DEFAULT false,
  	"force_full_width" boolean DEFAULT false,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_clients_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_features_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"icon_id" uuid,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_features_items_locales" (
  	"title" varchar,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar DEFAULT 'h2',
  	"title_size" varchar,
  	"centered" boolean DEFAULT false,
  	"force_full_width" boolean DEFAULT false,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_features_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_awards_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_awards_awards" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"issuer" varchar,
  	"logo_id" uuid,
  	"link_type" varchar DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_awards_awards_locales" (
  	"name" varchar,
  	"link_url" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_awards" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar DEFAULT 'h2',
  	"title_size" varchar,
  	"centered" boolean DEFAULT false,
  	"force_full_width" boolean DEFAULT false,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_awards_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_stats_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"value" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_stats_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar DEFAULT 'h2',
  	"title_size" varchar,
  	"centered" boolean DEFAULT false,
  	"force_full_width" boolean DEFAULT false,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_stats_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_grid_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_grid_rows_items_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_grid_rows_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"effect" varchar DEFAULT 'zoom',
  	"accent_color" varchar,
  	"link_type" varchar DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_grid_rows_items_locales" (
  	"title" varchar,
  	"description" jsonb,
  	"link_url" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_grid_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar DEFAULT 'h2',
  	"title_size" varchar,
  	"centered" boolean DEFAULT false,
  	"force_full_width" boolean DEFAULT false,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"size" varchar DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_grid_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_bento_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_bento_items_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_bento_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"accent_color" varchar,
  	"row_span" numeric DEFAULT 1,
  	"col_span" numeric DEFAULT 3,
  	"link_type" varchar DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_bento_items_locales" (
  	"title" varchar,
  	"description" jsonb,
  	"link_url" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_bento" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar DEFAULT 'h2',
  	"title_size" varchar,
  	"centered" boolean DEFAULT false,
  	"force_full_width" boolean DEFAULT false,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_bento_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_tstm_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_tstm_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"avatar_id" uuid,
  	"link_type" varchar DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_tstm_items_locales" (
  	"role" varchar,
  	"quote" jsonb,
  	"link_url" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_tstm" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar DEFAULT 'h2',
  	"title_size" varchar,
  	"centered" boolean DEFAULT false,
  	"force_full_width" boolean DEFAULT false,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_tstm_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_faq_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_faq_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_faq_faqs_locales" (
  	"question" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar DEFAULT 'h2',
  	"title_size" varchar,
  	"centered" boolean DEFAULT false,
  	"force_full_width" boolean DEFAULT false,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_faq_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_team_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"photo_id" uuid,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_team_members_locales" (
  	"role" varchar,
  	"bio" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar DEFAULT 'h2',
  	"title_size" varchar,
  	"centered" boolean DEFAULT false,
  	"force_full_width" boolean DEFAULT false,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_team_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_related_posts_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_related_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar DEFAULT 'h2',
  	"title_size" varchar,
  	"centered" boolean DEFAULT false,
  	"force_full_width" boolean DEFAULT false,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_related_posts_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_form_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar DEFAULT 'h2',
  	"title_size" varchar,
  	"centered" boolean DEFAULT false,
  	"force_full_width" boolean DEFAULT false,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"form_id" uuid,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_form_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_brand_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_brand_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"svg_logo_id" uuid,
  	"png_logo_id" uuid,
  	"variant" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_brand_colors" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_brand_colors_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_brand" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar DEFAULT 'h2',
  	"title_size" varchar,
  	"centered" boolean DEFAULT false,
  	"force_full_width" boolean DEFAULT false,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_brand_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_jobs_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_jobs" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar DEFAULT 'h2',
  	"title_size" varchar,
  	"centered" boolean DEFAULT false,
  	"force_full_width" boolean DEFAULT false,
  	"background_type" varchar DEFAULT 'none',
  	"background_inverted" boolean,
  	"background_dark" boolean,
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_jobs_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_version_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" varchar NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"doc_id" uuid,
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_hero_type" varchar DEFAULT 'lowImpact',
  	"version_hero_background_image_id" uuid,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_published_at" timestamp(3) with time zone,
  	"version_parent_id" uuid,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" varchar DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" varchar,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_locales" (
  	"version_title" varchar DEFAULT 'Untitled Page',
  	"version_hero_title" varchar,
  	"version_hero_description" jsonb,
  	"version_hero_media_id" uuid,
  	"version_meta_title" varchar,
  	"version_meta_image_id" uuid,
  	"version_meta_description" varchar,
  	"version_slug" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" uuid,
  	"posts_id" uuid,
  	"redirects_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "posts_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"avatar_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "posts" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"slug_lock" boolean DEFAULT true,
  	"published_at" timestamp(3) with time zone,
  	"edited_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" varchar DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "posts_locales" (
  	"title" varchar DEFAULT 'Untitled Post',
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" uuid,
  	"meta_description" varchar,
  	"slug" varchar,
  	"thumbnail_id" uuid,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" uuid,
  	"categories_id" uuid,
  	"users_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar,
  	"name" varchar,
  	"role" varchar,
  	"avatar_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_published_at" timestamp(3) with time zone,
  	"version_edited_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" varchar DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" varchar,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_locales" (
  	"version_title" varchar DEFAULT 'Untitled Post',
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" uuid,
  	"version_meta_description" varchar,
  	"version_slug" varchar,
  	"version_thumbnail_id" uuid,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" uuid,
  	"categories_id" uuid,
  	"users_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "categories" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "categories_locales" (
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "jobs" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"location" varchar,
  	"salary" varchar,
  	"type" varchar,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" varchar DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "jobs_locales" (
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_jobs_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_name" varchar,
  	"version_location" varchar,
  	"version_salary" varchar,
  	"version_type" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" varchar DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" varchar,
  	"latest" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_jobs_v_locales" (
  	"version_description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"thumbhash" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "media_locales" (
  	"alt" varchar,
  	"caption" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "users_policies" (
  	"order" integer NOT NULL,
  	"parent_id" uuid NOT NULL,
  	"value" varchar,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar NOT NULL,
  	"first_name" varchar DEFAULT '' NOT NULL,
  	"last_name" varchar DEFAULT '' NOT NULL,
  	"avatar_id" uuid,
  	"role" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "redirects" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" varchar DEFAULT 'reference',
  	"to_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" uuid,
  	"posts_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_checkbox_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_email_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_message_locales" (
  	"message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_number_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_select_options_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_select_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_text_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_textarea_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_acceptance" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_acceptance_locales" (
  	"label" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_emails_locales" (
  	"subject" varchar DEFAULT 'You''''ve received a new message.' NOT NULL,
  	"message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar NOT NULL,
  	"confirmation_type" varchar DEFAULT 'message',
  	"redirect_type" varchar DEFAULT 'reference',
  	"redirect_url" varchar,
  	"event" varchar DEFAULT 'submission',
  	"mailchimp_list" varchar,
  	"mailchimp_tags" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_locales" (
  	"submit_button_label" varchar,
  	"confirmation_message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" uuid,
  	"posts_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "form_submissions" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"form_id" uuid NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" uuid,
  	"posts_id" uuid,
  	"categories_id" uuid,
  	"jobs_id" uuid,
  	"media_id" uuid,
  	"users_id" uuid,
  	"redirects_id" uuid,
  	"forms_id" uuid,
  	"form_submissions_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "header_nav_items_link_sublinks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" varchar DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_icon_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "header_nav_items_link_sublinks_locales" (
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" varchar DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_icon_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "header_nav_items_locales" (
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "header" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" uuid,
  	"posts_id" uuid,
  	"redirects_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "footer_groups_group_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" varchar DEFAULT 'reference',
  	"link_new_tab" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "footer_groups_group_items_locales" (
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer_groups_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" varchar DEFAULT 'reference',
  	"link_new_tab" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "footer_legal_links_locales" (
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" varchar NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" uuid,
  	"posts_id" uuid,
  	"redirects_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "company_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"social" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "company" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"company_name" varchar NOT NULL,
  	"company_email" varchar NOT NULL,
  	"company_founding_date" timestamp(3) with time zone NOT NULL,
  	"company_address_street_address" varchar NOT NULL,
  	"company_address_state" varchar NOT NULL,
  	"company_address_zip" varchar NOT NULL,
  	"company_address_country" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_hero_badges" ADD CONSTRAINT "pages_hero_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_hero_badges_locales" ADD CONSTRAINT "pages_hero_badges_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_hero_badges"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_hero_links" ADD CONSTRAINT "pages_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_hero_links_locales" ADD CONSTRAINT "pages_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_text_background_color_stops" ADD CONSTRAINT "pages_blocks_text_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_text" ADD CONSTRAINT "pages_blocks_text_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_text" ADD CONSTRAINT "pages_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_text_locales" ADD CONSTRAINT "pages_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_prose_background_color_stops" ADD CONSTRAINT "pages_blocks_prose_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_prose"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_prose" ADD CONSTRAINT "pages_blocks_prose_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_prose" ADD CONSTRAINT "pages_blocks_prose_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_prose_locales" ADD CONSTRAINT "pages_blocks_prose_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_prose"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta_background_color_stops" ADD CONSTRAINT "pages_blocks_cta_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta_links_locales" ADD CONSTRAINT "pages_blocks_cta_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta_locales" ADD CONSTRAINT "pages_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_mlst_items" ADD CONSTRAINT "pages_blocks_mlst_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_mlst_items" ADD CONSTRAINT "pages_blocks_mlst_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_mlst"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_mlst_items_locales" ADD CONSTRAINT "pages_blocks_mlst_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_mlst_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_mlst_background_color_stops" ADD CONSTRAINT "pages_blocks_mlst_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_mlst"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_mlst" ADD CONSTRAINT "pages_blocks_mlst_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_mlst" ADD CONSTRAINT "pages_blocks_mlst_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_mlst_locales" ADD CONSTRAINT "pages_blocks_mlst_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_mlst"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_clients_background_color_stops" ADD CONSTRAINT "pages_blocks_clients_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_clients"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_clients_clients" ADD CONSTRAINT "pages_blocks_clients_clients_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_clients_clients" ADD CONSTRAINT "pages_blocks_clients_clients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_clients"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_clients_clients_locales" ADD CONSTRAINT "pages_blocks_clients_clients_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_clients_clients"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_clients" ADD CONSTRAINT "pages_blocks_clients_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_clients" ADD CONSTRAINT "pages_blocks_clients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_clients_locales" ADD CONSTRAINT "pages_blocks_clients_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_clients"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_features_background_color_stops" ADD CONSTRAINT "pages_blocks_features_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_features_items" ADD CONSTRAINT "pages_blocks_features_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_features_items" ADD CONSTRAINT "pages_blocks_features_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_features_items_locales" ADD CONSTRAINT "pages_blocks_features_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_features_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_features" ADD CONSTRAINT "pages_blocks_features_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_features" ADD CONSTRAINT "pages_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_features_locales" ADD CONSTRAINT "pages_blocks_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_awards_background_color_stops" ADD CONSTRAINT "pages_blocks_awards_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_awards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_awards_awards" ADD CONSTRAINT "pages_blocks_awards_awards_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_awards_awards" ADD CONSTRAINT "pages_blocks_awards_awards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_awards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_awards_awards_locales" ADD CONSTRAINT "pages_blocks_awards_awards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_awards_awards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_awards" ADD CONSTRAINT "pages_blocks_awards_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_awards" ADD CONSTRAINT "pages_blocks_awards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_awards_locales" ADD CONSTRAINT "pages_blocks_awards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_awards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_stats_background_color_stops" ADD CONSTRAINT "pages_blocks_stats_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_stats_stats" ADD CONSTRAINT "pages_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_stats_stats_locales" ADD CONSTRAINT "pages_blocks_stats_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats_stats"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_stats_locales" ADD CONSTRAINT "pages_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_grid_background_color_stops" ADD CONSTRAINT "pages_blocks_grid_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_grid_rows_items_background_color_stops" ADD CONSTRAINT "pages_blocks_grid_rows_items_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_grid_rows_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_grid_rows_items" ADD CONSTRAINT "pages_blocks_grid_rows_items_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_grid_rows_items" ADD CONSTRAINT "pages_blocks_grid_rows_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_grid_rows"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_grid_rows_items_locales" ADD CONSTRAINT "pages_blocks_grid_rows_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_grid_rows_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_grid_rows" ADD CONSTRAINT "pages_blocks_grid_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_grid" ADD CONSTRAINT "pages_blocks_grid_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_grid" ADD CONSTRAINT "pages_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_grid_locales" ADD CONSTRAINT "pages_blocks_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_bento_background_color_stops" ADD CONSTRAINT "pages_blocks_bento_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_bento"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_bento_items_background_color_stops" ADD CONSTRAINT "pages_blocks_bento_items_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_bento_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_bento_items" ADD CONSTRAINT "pages_blocks_bento_items_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_bento_items" ADD CONSTRAINT "pages_blocks_bento_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_bento"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_bento_items_locales" ADD CONSTRAINT "pages_blocks_bento_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_bento_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_bento" ADD CONSTRAINT "pages_blocks_bento_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_bento" ADD CONSTRAINT "pages_blocks_bento_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_bento_locales" ADD CONSTRAINT "pages_blocks_bento_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_bento"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_tstm_background_color_stops" ADD CONSTRAINT "pages_blocks_tstm_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tstm"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_tstm_items" ADD CONSTRAINT "pages_blocks_tstm_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_tstm_items" ADD CONSTRAINT "pages_blocks_tstm_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tstm"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_tstm_items_locales" ADD CONSTRAINT "pages_blocks_tstm_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tstm_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_tstm" ADD CONSTRAINT "pages_blocks_tstm_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_tstm" ADD CONSTRAINT "pages_blocks_tstm_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_tstm_locales" ADD CONSTRAINT "pages_blocks_tstm_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tstm"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_faq_background_color_stops" ADD CONSTRAINT "pages_blocks_faq_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_faq_faqs" ADD CONSTRAINT "pages_blocks_faq_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_faq_faqs_locales" ADD CONSTRAINT "pages_blocks_faq_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_faqs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_faq_locales" ADD CONSTRAINT "pages_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_team_background_color_stops" ADD CONSTRAINT "pages_blocks_team_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_team_members" ADD CONSTRAINT "pages_blocks_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_team_members" ADD CONSTRAINT "pages_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_team_members_locales" ADD CONSTRAINT "pages_blocks_team_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team_members"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_team" ADD CONSTRAINT "pages_blocks_team_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_team" ADD CONSTRAINT "pages_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_team_locales" ADD CONSTRAINT "pages_blocks_team_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_related_posts_background_color_stops" ADD CONSTRAINT "pages_blocks_related_posts_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_related_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_related_posts" ADD CONSTRAINT "pages_blocks_related_posts_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_related_posts" ADD CONSTRAINT "pages_blocks_related_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_related_posts_locales" ADD CONSTRAINT "pages_blocks_related_posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_related_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_form_background_color_stops" ADD CONSTRAINT "pages_blocks_form_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_form"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_form" ADD CONSTRAINT "pages_blocks_form_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_form" ADD CONSTRAINT "pages_blocks_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_form" ADD CONSTRAINT "pages_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_form_locales" ADD CONSTRAINT "pages_blocks_form_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_form"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_brand_background_color_stops" ADD CONSTRAINT "pages_blocks_brand_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_brand"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_brand_logos" ADD CONSTRAINT "pages_blocks_brand_logos_svg_logo_id_media_id_fk" FOREIGN KEY ("svg_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_brand_logos" ADD CONSTRAINT "pages_blocks_brand_logos_png_logo_id_media_id_fk" FOREIGN KEY ("png_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_brand_logos" ADD CONSTRAINT "pages_blocks_brand_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_brand"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_brand_colors" ADD CONSTRAINT "pages_blocks_brand_colors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_brand"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_brand_colors_locales" ADD CONSTRAINT "pages_blocks_brand_colors_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_brand_colors"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_brand" ADD CONSTRAINT "pages_blocks_brand_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_brand" ADD CONSTRAINT "pages_blocks_brand_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_brand_locales" ADD CONSTRAINT "pages_blocks_brand_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_brand"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_jobs_background_color_stops" ADD CONSTRAINT "pages_blocks_jobs_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_jobs" ADD CONSTRAINT "pages_blocks_jobs_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_jobs" ADD CONSTRAINT "pages_blocks_jobs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_jobs_locales" ADD CONSTRAINT "pages_blocks_jobs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_breadcrumbs" ADD CONSTRAINT "pages_breadcrumbs_doc_id_pages_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_breadcrumbs" ADD CONSTRAINT "pages_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_badges" ADD CONSTRAINT "_pages_v_version_hero_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_badges_locales" ADD CONSTRAINT "_pages_v_version_hero_badges_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_hero_badges"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_links_locales" ADD CONSTRAINT "_pages_v_version_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_text_background_color_stops" ADD CONSTRAINT "_pages_v_blocks_text_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_text" ADD CONSTRAINT "_pages_v_blocks_text_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_text" ADD CONSTRAINT "_pages_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_text_locales" ADD CONSTRAINT "_pages_v_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_prose_background_color_stops" ADD CONSTRAINT "_pages_v_blocks_prose_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_prose"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_prose" ADD CONSTRAINT "_pages_v_blocks_prose_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_prose" ADD CONSTRAINT "_pages_v_blocks_prose_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_prose_locales" ADD CONSTRAINT "_pages_v_blocks_prose_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_prose"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta_background_color_stops" ADD CONSTRAINT "_pages_v_blocks_cta_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta_links" ADD CONSTRAINT "_pages_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta_links_locales" ADD CONSTRAINT "_pages_v_blocks_cta_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta_locales" ADD CONSTRAINT "_pages_v_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_mlst_items" ADD CONSTRAINT "_pages_v_blocks_mlst_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_mlst_items" ADD CONSTRAINT "_pages_v_blocks_mlst_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_mlst"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_mlst_items_locales" ADD CONSTRAINT "_pages_v_blocks_mlst_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_mlst_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_mlst_background_color_stops" ADD CONSTRAINT "_pages_v_blocks_mlst_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_mlst"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_mlst" ADD CONSTRAINT "_pages_v_blocks_mlst_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_mlst" ADD CONSTRAINT "_pages_v_blocks_mlst_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_mlst_locales" ADD CONSTRAINT "_pages_v_blocks_mlst_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_mlst"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_clients_background_color_stops" ADD CONSTRAINT "_pages_v_blocks_clients_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_clients"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_clients_clients" ADD CONSTRAINT "_pages_v_blocks_clients_clients_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_clients_clients" ADD CONSTRAINT "_pages_v_blocks_clients_clients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_clients"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_clients_clients_locales" ADD CONSTRAINT "_pages_v_blocks_clients_clients_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_clients_clients"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_clients" ADD CONSTRAINT "_pages_v_blocks_clients_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_clients" ADD CONSTRAINT "_pages_v_blocks_clients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_clients_locales" ADD CONSTRAINT "_pages_v_blocks_clients_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_clients"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_features_background_color_stops" ADD CONSTRAINT "_pages_v_blocks_features_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_features_items" ADD CONSTRAINT "_pages_v_blocks_features_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_features_items" ADD CONSTRAINT "_pages_v_blocks_features_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_features_items_locales" ADD CONSTRAINT "_pages_v_blocks_features_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_features_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_features" ADD CONSTRAINT "_pages_v_blocks_features_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_features" ADD CONSTRAINT "_pages_v_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_features_locales" ADD CONSTRAINT "_pages_v_blocks_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_awards_background_color_stops" ADD CONSTRAINT "_pages_v_blocks_awards_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_awards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_awards_awards" ADD CONSTRAINT "_pages_v_blocks_awards_awards_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_awards_awards" ADD CONSTRAINT "_pages_v_blocks_awards_awards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_awards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_awards_awards_locales" ADD CONSTRAINT "_pages_v_blocks_awards_awards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_awards_awards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_awards" ADD CONSTRAINT "_pages_v_blocks_awards_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_awards" ADD CONSTRAINT "_pages_v_blocks_awards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_awards_locales" ADD CONSTRAINT "_pages_v_blocks_awards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_awards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_stats_background_color_stops" ADD CONSTRAINT "_pages_v_blocks_stats_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_stats_stats" ADD CONSTRAINT "_pages_v_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_stats_stats_locales" ADD CONSTRAINT "_pages_v_blocks_stats_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats_stats"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_stats" ADD CONSTRAINT "_pages_v_blocks_stats_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_stats" ADD CONSTRAINT "_pages_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_stats_locales" ADD CONSTRAINT "_pages_v_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_grid_background_color_stops" ADD CONSTRAINT "_pages_v_blocks_grid_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_grid_rows_items_background_color_stops" ADD CONSTRAINT "_pages_v_blocks_grid_rows_items_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_grid_rows_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_grid_rows_items" ADD CONSTRAINT "_pages_v_blocks_grid_rows_items_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_grid_rows_items" ADD CONSTRAINT "_pages_v_blocks_grid_rows_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_grid_rows"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_grid_rows_items_locales" ADD CONSTRAINT "_pages_v_blocks_grid_rows_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_grid_rows_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_grid_rows" ADD CONSTRAINT "_pages_v_blocks_grid_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_grid" ADD CONSTRAINT "_pages_v_blocks_grid_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_grid" ADD CONSTRAINT "_pages_v_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_grid_locales" ADD CONSTRAINT "_pages_v_blocks_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_bento_background_color_stops" ADD CONSTRAINT "_pages_v_blocks_bento_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_bento"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_bento_items_background_color_stops" ADD CONSTRAINT "_pages_v_blocks_bento_items_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_bento_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_bento_items" ADD CONSTRAINT "_pages_v_blocks_bento_items_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_bento_items" ADD CONSTRAINT "_pages_v_blocks_bento_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_bento"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_bento_items_locales" ADD CONSTRAINT "_pages_v_blocks_bento_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_bento_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_bento" ADD CONSTRAINT "_pages_v_blocks_bento_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_bento" ADD CONSTRAINT "_pages_v_blocks_bento_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_bento_locales" ADD CONSTRAINT "_pages_v_blocks_bento_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_bento"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_tstm_background_color_stops" ADD CONSTRAINT "_pages_v_blocks_tstm_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tstm"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_tstm_items" ADD CONSTRAINT "_pages_v_blocks_tstm_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_tstm_items" ADD CONSTRAINT "_pages_v_blocks_tstm_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tstm"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_tstm_items_locales" ADD CONSTRAINT "_pages_v_blocks_tstm_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tstm_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_tstm" ADD CONSTRAINT "_pages_v_blocks_tstm_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_tstm" ADD CONSTRAINT "_pages_v_blocks_tstm_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_tstm_locales" ADD CONSTRAINT "_pages_v_blocks_tstm_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tstm"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_faq_background_color_stops" ADD CONSTRAINT "_pages_v_blocks_faq_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_faq_faqs" ADD CONSTRAINT "_pages_v_blocks_faq_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_faq_faqs_locales" ADD CONSTRAINT "_pages_v_blocks_faq_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_faqs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_faq_locales" ADD CONSTRAINT "_pages_v_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_team_background_color_stops" ADD CONSTRAINT "_pages_v_blocks_team_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_team_members" ADD CONSTRAINT "_pages_v_blocks_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_team_members" ADD CONSTRAINT "_pages_v_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_team_members_locales" ADD CONSTRAINT "_pages_v_blocks_team_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team_members"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_team" ADD CONSTRAINT "_pages_v_blocks_team_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_team" ADD CONSTRAINT "_pages_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_team_locales" ADD CONSTRAINT "_pages_v_blocks_team_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_related_posts_background_color_stops" ADD CONSTRAINT "_pages_v_blocks_related_posts_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_related_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_related_posts" ADD CONSTRAINT "_pages_v_blocks_related_posts_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_related_posts" ADD CONSTRAINT "_pages_v_blocks_related_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_related_posts_locales" ADD CONSTRAINT "_pages_v_blocks_related_posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_related_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_form_background_color_stops" ADD CONSTRAINT "_pages_v_blocks_form_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_form"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_form" ADD CONSTRAINT "_pages_v_blocks_form_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_form" ADD CONSTRAINT "_pages_v_blocks_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_form" ADD CONSTRAINT "_pages_v_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_form_locales" ADD CONSTRAINT "_pages_v_blocks_form_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_form"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_brand_background_color_stops" ADD CONSTRAINT "_pages_v_blocks_brand_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_brand"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_brand_logos" ADD CONSTRAINT "_pages_v_blocks_brand_logos_svg_logo_id_media_id_fk" FOREIGN KEY ("svg_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_brand_logos" ADD CONSTRAINT "_pages_v_blocks_brand_logos_png_logo_id_media_id_fk" FOREIGN KEY ("png_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_brand_logos" ADD CONSTRAINT "_pages_v_blocks_brand_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_brand"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_brand_colors" ADD CONSTRAINT "_pages_v_blocks_brand_colors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_brand"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_brand_colors_locales" ADD CONSTRAINT "_pages_v_blocks_brand_colors_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_brand_colors"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_brand" ADD CONSTRAINT "_pages_v_blocks_brand_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_brand" ADD CONSTRAINT "_pages_v_blocks_brand_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_brand_locales" ADD CONSTRAINT "_pages_v_blocks_brand_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_brand"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_jobs_background_color_stops" ADD CONSTRAINT "_pages_v_blocks_jobs_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_jobs" ADD CONSTRAINT "_pages_v_blocks_jobs_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_jobs" ADD CONSTRAINT "_pages_v_blocks_jobs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_jobs_locales" ADD CONSTRAINT "_pages_v_blocks_jobs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_breadcrumbs" ADD CONSTRAINT "_pages_v_version_breadcrumbs_doc_id_pages_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_breadcrumbs" ADD CONSTRAINT "_pages_v_version_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_background_image_id_media_id_fk" FOREIGN KEY ("version_hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_parent_id_pages_id_fk" FOREIGN KEY ("version_parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_version_populated_authors" ADD CONSTRAINT "_posts_v_version_populated_authors_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_version_populated_authors" ADD CONSTRAINT "_posts_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_version_thumbnail_id_media_id_fk" FOREIGN KEY ("version_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "jobs_locales" ADD CONSTRAINT "jobs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_jobs_v" ADD CONSTRAINT "_jobs_v_parent_id_jobs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."jobs"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_jobs_v_locales" ADD CONSTRAINT "_jobs_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_jobs_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "users_policies" ADD CONSTRAINT "users_policies_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "users" ADD CONSTRAINT "users_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_checkbox_locales" ADD CONSTRAINT "forms_blocks_checkbox_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_checkbox"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_email_locales" ADD CONSTRAINT "forms_blocks_email_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_email"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_message_locales" ADD CONSTRAINT "forms_blocks_message_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_message"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_number_locales" ADD CONSTRAINT "forms_blocks_number_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_number"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_select_options_locales" ADD CONSTRAINT "forms_blocks_select_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select_options"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_select_locales" ADD CONSTRAINT "forms_blocks_select_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_text_locales" ADD CONSTRAINT "forms_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_textarea_locales" ADD CONSTRAINT "forms_blocks_textarea_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_textarea"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_acceptance" ADD CONSTRAINT "forms_blocks_acceptance_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_acceptance_locales" ADD CONSTRAINT "forms_blocks_acceptance_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_acceptance"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_emails_locales" ADD CONSTRAINT "forms_emails_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_emails"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_locales" ADD CONSTRAINT "forms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_rels" ADD CONSTRAINT "forms_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_rels" ADD CONSTRAINT "forms_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_rels" ADD CONSTRAINT "forms_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_nav_items_link_sublinks" ADD CONSTRAINT "header_nav_items_link_sublinks_link_icon_id_media_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_nav_items_link_sublinks" ADD CONSTRAINT "header_nav_items_link_sublinks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_nav_items_link_sublinks_locales" ADD CONSTRAINT "header_nav_items_link_sublinks_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items_link_sublinks"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_link_icon_id_media_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_nav_items_locales" ADD CONSTRAINT "header_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_groups_group_items" ADD CONSTRAINT "footer_groups_group_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_groups"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_groups_group_items_locales" ADD CONSTRAINT "footer_groups_group_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_groups_group_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_groups" ADD CONSTRAINT "footer_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_groups_locales" ADD CONSTRAINT "footer_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_groups"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_legal_links_locales" ADD CONSTRAINT "footer_legal_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_legal_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "company_socials" ADD CONSTRAINT "company_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_hero_badges_order_idx" ON "pages_hero_badges" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_hero_badges_parent_id_idx" ON "pages_hero_badges" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_hero_badges_locales_locale_parent_id_unique" ON "pages_hero_badges_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_hero_links_order_idx" ON "pages_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_hero_links_parent_id_idx" ON "pages_hero_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_hero_links_locales_locale_parent_id_unique" ON "pages_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_text_background_color_stops_order_idx" ON "pages_blocks_text_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_text_background_color_stops_parent_id_idx" ON "pages_blocks_text_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_text_order_idx" ON "pages_blocks_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_text_parent_id_idx" ON "pages_blocks_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_text_path_idx" ON "pages_blocks_text" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_text_background_background_background_image_idx" ON "pages_blocks_text" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_text_locales_locale_parent_id_unique" ON "pages_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_prose_background_color_stops_order_idx" ON "pages_blocks_prose_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_prose_background_color_stops_parent_id_idx" ON "pages_blocks_prose_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_prose_order_idx" ON "pages_blocks_prose" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_prose_parent_id_idx" ON "pages_blocks_prose" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_prose_path_idx" ON "pages_blocks_prose" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_prose_background_background_background_image_idx" ON "pages_blocks_prose" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_prose_locales_locale_parent_id_unique" ON "pages_blocks_prose_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_background_color_stops_order_idx" ON "pages_blocks_cta_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_background_color_stops_parent_id_idx" ON "pages_blocks_cta_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_links_order_idx" ON "pages_blocks_cta_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_links_parent_id_idx" ON "pages_blocks_cta_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_cta_links_locales_locale_parent_id_unique" ON "pages_blocks_cta_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_background_background_background_image_idx" ON "pages_blocks_cta" USING btree ("background_background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_media_idx" ON "pages_blocks_cta" USING btree ("media_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_cta_locales_locale_parent_id_unique" ON "pages_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_mlst_items_order_idx" ON "pages_blocks_mlst_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_mlst_items_parent_id_idx" ON "pages_blocks_mlst_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_mlst_items_media_idx" ON "pages_blocks_mlst_items" USING btree ("media_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_mlst_items_locales_locale_parent_id_unique" ON "pages_blocks_mlst_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_mlst_background_color_stops_order_idx" ON "pages_blocks_mlst_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_mlst_background_color_stops_parent_id_idx" ON "pages_blocks_mlst_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_mlst_order_idx" ON "pages_blocks_mlst" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_mlst_parent_id_idx" ON "pages_blocks_mlst" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_mlst_path_idx" ON "pages_blocks_mlst" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_mlst_background_background_background_image_idx" ON "pages_blocks_mlst" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_mlst_locales_locale_parent_id_unique" ON "pages_blocks_mlst_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_clients_background_color_stops_order_idx" ON "pages_blocks_clients_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_clients_background_color_stops_parent_id_idx" ON "pages_blocks_clients_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_clients_clients_order_idx" ON "pages_blocks_clients_clients" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_clients_clients_parent_id_idx" ON "pages_blocks_clients_clients" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_clients_clients_logo_idx" ON "pages_blocks_clients_clients" USING btree ("logo_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_clients_clients_locales_locale_parent_id_unique" ON "pages_blocks_clients_clients_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_clients_order_idx" ON "pages_blocks_clients" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_clients_parent_id_idx" ON "pages_blocks_clients" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_clients_path_idx" ON "pages_blocks_clients" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_clients_background_background_background_image_idx" ON "pages_blocks_clients" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_clients_locales_locale_parent_id_unique" ON "pages_blocks_clients_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_features_background_color_stops_order_idx" ON "pages_blocks_features_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_features_background_color_stops_parent_id_idx" ON "pages_blocks_features_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_features_items_order_idx" ON "pages_blocks_features_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_features_items_parent_id_idx" ON "pages_blocks_features_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_features_items_icon_idx" ON "pages_blocks_features_items" USING btree ("icon_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_features_items_locales_locale_parent_id_unique" ON "pages_blocks_features_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_features_order_idx" ON "pages_blocks_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_features_parent_id_idx" ON "pages_blocks_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_features_path_idx" ON "pages_blocks_features" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_features_background_background_background_image_idx" ON "pages_blocks_features" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_features_locales_locale_parent_id_unique" ON "pages_blocks_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_awards_background_color_stops_order_idx" ON "pages_blocks_awards_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_awards_background_color_stops_parent_id_idx" ON "pages_blocks_awards_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_awards_awards_order_idx" ON "pages_blocks_awards_awards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_awards_awards_parent_id_idx" ON "pages_blocks_awards_awards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_awards_awards_logo_idx" ON "pages_blocks_awards_awards" USING btree ("logo_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_awards_awards_locales_locale_parent_id_unique" ON "pages_blocks_awards_awards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_awards_order_idx" ON "pages_blocks_awards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_awards_parent_id_idx" ON "pages_blocks_awards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_awards_path_idx" ON "pages_blocks_awards" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_awards_background_background_background_image_idx" ON "pages_blocks_awards" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_awards_locales_locale_parent_id_unique" ON "pages_blocks_awards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_background_color_stops_order_idx" ON "pages_blocks_stats_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_background_color_stops_parent_id_idx" ON "pages_blocks_stats_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_stats_order_idx" ON "pages_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_stats_parent_id_idx" ON "pages_blocks_stats_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_stats_stats_locales_locale_parent_id_unique" ON "pages_blocks_stats_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_background_background_background_image_idx" ON "pages_blocks_stats" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_stats_locales_locale_parent_id_unique" ON "pages_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_grid_background_color_stops_order_idx" ON "pages_blocks_grid_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_grid_background_color_stops_parent_id_idx" ON "pages_blocks_grid_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_grid_rows_items_background_color_stops_order_idx" ON "pages_blocks_grid_rows_items_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_grid_rows_items_background_color_stops_parent_id_idx" ON "pages_blocks_grid_rows_items_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_grid_rows_items_order_idx" ON "pages_blocks_grid_rows_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_grid_rows_items_parent_id_idx" ON "pages_blocks_grid_rows_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_grid_rows_items_background_background_background_image_idx" ON "pages_blocks_grid_rows_items" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_grid_rows_items_locales_locale_parent_id_unique" ON "pages_blocks_grid_rows_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_grid_rows_order_idx" ON "pages_blocks_grid_rows" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_grid_rows_parent_id_idx" ON "pages_blocks_grid_rows" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_grid_order_idx" ON "pages_blocks_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_grid_parent_id_idx" ON "pages_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_grid_path_idx" ON "pages_blocks_grid" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_grid_background_background_background_image_idx" ON "pages_blocks_grid" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_grid_locales_locale_parent_id_unique" ON "pages_blocks_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_bento_background_color_stops_order_idx" ON "pages_blocks_bento_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_bento_background_color_stops_parent_id_idx" ON "pages_blocks_bento_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_bento_items_background_color_stops_order_idx" ON "pages_blocks_bento_items_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_bento_items_background_color_stops_parent_id_idx" ON "pages_blocks_bento_items_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_bento_items_order_idx" ON "pages_blocks_bento_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_bento_items_parent_id_idx" ON "pages_blocks_bento_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_bento_items_background_background_background_image_idx" ON "pages_blocks_bento_items" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_bento_items_locales_locale_parent_id_unique" ON "pages_blocks_bento_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_bento_order_idx" ON "pages_blocks_bento" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_bento_parent_id_idx" ON "pages_blocks_bento" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_bento_path_idx" ON "pages_blocks_bento" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_bento_background_background_background_image_idx" ON "pages_blocks_bento" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_bento_locales_locale_parent_id_unique" ON "pages_blocks_bento_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_tstm_background_color_stops_order_idx" ON "pages_blocks_tstm_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_tstm_background_color_stops_parent_id_idx" ON "pages_blocks_tstm_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_tstm_items_order_idx" ON "pages_blocks_tstm_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_tstm_items_parent_id_idx" ON "pages_blocks_tstm_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_tstm_items_avatar_idx" ON "pages_blocks_tstm_items" USING btree ("avatar_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_tstm_items_locales_locale_parent_id_unique" ON "pages_blocks_tstm_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_tstm_order_idx" ON "pages_blocks_tstm" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_tstm_parent_id_idx" ON "pages_blocks_tstm" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_tstm_path_idx" ON "pages_blocks_tstm" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_tstm_background_background_background_image_idx" ON "pages_blocks_tstm" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_tstm_locales_locale_parent_id_unique" ON "pages_blocks_tstm_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_background_color_stops_order_idx" ON "pages_blocks_faq_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_background_color_stops_parent_id_idx" ON "pages_blocks_faq_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_faqs_order_idx" ON "pages_blocks_faq_faqs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_faqs_parent_id_idx" ON "pages_blocks_faq_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_faq_faqs_locales_locale_parent_id_unique" ON "pages_blocks_faq_faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_background_background_background_image_idx" ON "pages_blocks_faq" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_faq_locales_locale_parent_id_unique" ON "pages_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_team_background_color_stops_order_idx" ON "pages_blocks_team_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_team_background_color_stops_parent_id_idx" ON "pages_blocks_team_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_team_members_order_idx" ON "pages_blocks_team_members" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_team_members_parent_id_idx" ON "pages_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_team_members_photo_idx" ON "pages_blocks_team_members" USING btree ("photo_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_team_members_locales_locale_parent_id_unique" ON "pages_blocks_team_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_team_order_idx" ON "pages_blocks_team" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_team_parent_id_idx" ON "pages_blocks_team" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_team_path_idx" ON "pages_blocks_team" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_team_background_background_background_image_idx" ON "pages_blocks_team" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_team_locales_locale_parent_id_unique" ON "pages_blocks_team_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_related_posts_background_color_stops_order_idx" ON "pages_blocks_related_posts_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_related_posts_background_color_stops_parent_id_idx" ON "pages_blocks_related_posts_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_related_posts_order_idx" ON "pages_blocks_related_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_related_posts_parent_id_idx" ON "pages_blocks_related_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_related_posts_path_idx" ON "pages_blocks_related_posts" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_related_posts_background_background_background_image_idx" ON "pages_blocks_related_posts" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_related_posts_locales_locale_parent_id_unique" ON "pages_blocks_related_posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_background_color_stops_order_idx" ON "pages_blocks_form_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_background_color_stops_parent_id_idx" ON "pages_blocks_form_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_order_idx" ON "pages_blocks_form" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_parent_id_idx" ON "pages_blocks_form" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_path_idx" ON "pages_blocks_form" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_background_background_background_image_idx" ON "pages_blocks_form" USING btree ("background_background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_form_idx" ON "pages_blocks_form" USING btree ("form_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_form_locales_locale_parent_id_unique" ON "pages_blocks_form_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_background_color_stops_order_idx" ON "pages_blocks_brand_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_background_color_stops_parent_id_idx" ON "pages_blocks_brand_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_logos_order_idx" ON "pages_blocks_brand_logos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_logos_parent_id_idx" ON "pages_blocks_brand_logos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_logos_svg_logo_idx" ON "pages_blocks_brand_logos" USING btree ("svg_logo_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_logos_png_logo_idx" ON "pages_blocks_brand_logos" USING btree ("png_logo_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_colors_order_idx" ON "pages_blocks_brand_colors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_colors_parent_id_idx" ON "pages_blocks_brand_colors" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_brand_colors_locales_locale_parent_id_unique" ON "pages_blocks_brand_colors_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_order_idx" ON "pages_blocks_brand" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_parent_id_idx" ON "pages_blocks_brand" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_path_idx" ON "pages_blocks_brand" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_background_background_background_image_idx" ON "pages_blocks_brand" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_brand_locales_locale_parent_id_unique" ON "pages_blocks_brand_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_jobs_background_color_stops_order_idx" ON "pages_blocks_jobs_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_jobs_background_color_stops_parent_id_idx" ON "pages_blocks_jobs_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_jobs_order_idx" ON "pages_blocks_jobs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_jobs_parent_id_idx" ON "pages_blocks_jobs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_jobs_path_idx" ON "pages_blocks_jobs" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_jobs_background_background_background_image_idx" ON "pages_blocks_jobs" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_jobs_locales_locale_parent_id_unique" ON "pages_blocks_jobs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_breadcrumbs_order_idx" ON "pages_breadcrumbs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_breadcrumbs_parent_id_idx" ON "pages_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_breadcrumbs_locale_idx" ON "pages_breadcrumbs" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_breadcrumbs_doc_idx" ON "pages_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX IF NOT EXISTS "pages_hero_hero_background_image_idx" ON "pages" USING btree ("hero_background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_parent_idx" ON "pages" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "pages_hero_hero_media_idx" ON "pages_locales" USING btree ("hero_media_id","_locale");
  CREATE INDEX IF NOT EXISTS "pages_meta_meta_image_idx" ON "pages_locales" USING btree ("meta_image_id","_locale");
  CREATE INDEX IF NOT EXISTS "pages_slug_idx" ON "pages_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_redirects_id_idx" ON "pages_rels" USING btree ("redirects_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_badges_order_idx" ON "_pages_v_version_hero_badges" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_badges_parent_id_idx" ON "_pages_v_version_hero_badges" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_version_hero_badges_locales_locale_parent_id_unique" ON "_pages_v_version_hero_badges_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_links_order_idx" ON "_pages_v_version_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_links_parent_id_idx" ON "_pages_v_version_hero_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_version_hero_links_locales_locale_parent_id_unique" ON "_pages_v_version_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_text_background_color_stops_order_idx" ON "_pages_v_blocks_text_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_text_background_color_stops_parent_id_idx" ON "_pages_v_blocks_text_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_text_order_idx" ON "_pages_v_blocks_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_text_parent_id_idx" ON "_pages_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_text_path_idx" ON "_pages_v_blocks_text" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_text_background_background_background_image_idx" ON "_pages_v_blocks_text" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_text_locales_locale_parent_id_unique" ON "_pages_v_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_prose_background_color_stops_order_idx" ON "_pages_v_blocks_prose_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_prose_background_color_stops_parent_id_idx" ON "_pages_v_blocks_prose_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_prose_order_idx" ON "_pages_v_blocks_prose" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_prose_parent_id_idx" ON "_pages_v_blocks_prose" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_prose_path_idx" ON "_pages_v_blocks_prose" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_prose_background_background_background_image_idx" ON "_pages_v_blocks_prose" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_prose_locales_locale_parent_id_unique" ON "_pages_v_blocks_prose_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_background_color_stops_order_idx" ON "_pages_v_blocks_cta_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_background_color_stops_parent_id_idx" ON "_pages_v_blocks_cta_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_links_order_idx" ON "_pages_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_links_parent_id_idx" ON "_pages_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_cta_links_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_background_background_background_image_idx" ON "_pages_v_blocks_cta" USING btree ("background_background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_media_idx" ON "_pages_v_blocks_cta" USING btree ("media_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_cta_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_mlst_items_order_idx" ON "_pages_v_blocks_mlst_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_mlst_items_parent_id_idx" ON "_pages_v_blocks_mlst_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_mlst_items_media_idx" ON "_pages_v_blocks_mlst_items" USING btree ("media_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_mlst_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_mlst_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_mlst_background_color_stops_order_idx" ON "_pages_v_blocks_mlst_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_mlst_background_color_stops_parent_id_idx" ON "_pages_v_blocks_mlst_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_mlst_order_idx" ON "_pages_v_blocks_mlst" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_mlst_parent_id_idx" ON "_pages_v_blocks_mlst" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_mlst_path_idx" ON "_pages_v_blocks_mlst" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_mlst_background_background_background_image_idx" ON "_pages_v_blocks_mlst" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_mlst_locales_locale_parent_id_unique" ON "_pages_v_blocks_mlst_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_clients_background_color_stops_order_idx" ON "_pages_v_blocks_clients_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_clients_background_color_stops_parent_id_idx" ON "_pages_v_blocks_clients_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_clients_clients_order_idx" ON "_pages_v_blocks_clients_clients" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_clients_clients_parent_id_idx" ON "_pages_v_blocks_clients_clients" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_clients_clients_logo_idx" ON "_pages_v_blocks_clients_clients" USING btree ("logo_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_clients_clients_locales_locale_parent_id_unique" ON "_pages_v_blocks_clients_clients_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_clients_order_idx" ON "_pages_v_blocks_clients" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_clients_parent_id_idx" ON "_pages_v_blocks_clients" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_clients_path_idx" ON "_pages_v_blocks_clients" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_clients_background_background_background_image_idx" ON "_pages_v_blocks_clients" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_clients_locales_locale_parent_id_unique" ON "_pages_v_blocks_clients_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_features_background_color_stops_order_idx" ON "_pages_v_blocks_features_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_features_background_color_stops_parent_id_idx" ON "_pages_v_blocks_features_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_features_items_order_idx" ON "_pages_v_blocks_features_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_features_items_parent_id_idx" ON "_pages_v_blocks_features_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_features_items_icon_idx" ON "_pages_v_blocks_features_items" USING btree ("icon_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_features_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_features_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_features_order_idx" ON "_pages_v_blocks_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_features_parent_id_idx" ON "_pages_v_blocks_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_features_path_idx" ON "_pages_v_blocks_features" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_features_background_background_background_image_idx" ON "_pages_v_blocks_features" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_features_locales_locale_parent_id_unique" ON "_pages_v_blocks_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_awards_background_color_stops_order_idx" ON "_pages_v_blocks_awards_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_awards_background_color_stops_parent_id_idx" ON "_pages_v_blocks_awards_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_awards_awards_order_idx" ON "_pages_v_blocks_awards_awards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_awards_awards_parent_id_idx" ON "_pages_v_blocks_awards_awards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_awards_awards_logo_idx" ON "_pages_v_blocks_awards_awards" USING btree ("logo_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_awards_awards_locales_locale_parent_id_unique" ON "_pages_v_blocks_awards_awards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_awards_order_idx" ON "_pages_v_blocks_awards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_awards_parent_id_idx" ON "_pages_v_blocks_awards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_awards_path_idx" ON "_pages_v_blocks_awards" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_awards_background_background_background_image_idx" ON "_pages_v_blocks_awards" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_awards_locales_locale_parent_id_unique" ON "_pages_v_blocks_awards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_stats_background_color_stops_order_idx" ON "_pages_v_blocks_stats_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_stats_background_color_stops_parent_id_idx" ON "_pages_v_blocks_stats_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_stats_stats_order_idx" ON "_pages_v_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_stats_stats_parent_id_idx" ON "_pages_v_blocks_stats_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_stats_stats_locales_locale_parent_id_unique" ON "_pages_v_blocks_stats_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_stats_order_idx" ON "_pages_v_blocks_stats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_stats_parent_id_idx" ON "_pages_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_stats_path_idx" ON "_pages_v_blocks_stats" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_stats_background_background_background_image_idx" ON "_pages_v_blocks_stats" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_stats_locales_locale_parent_id_unique" ON "_pages_v_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_grid_background_color_stops_order_idx" ON "_pages_v_blocks_grid_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_grid_background_color_stops_parent_id_idx" ON "_pages_v_blocks_grid_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_grid_rows_items_background_color_stops_order_idx" ON "_pages_v_blocks_grid_rows_items_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_grid_rows_items_background_color_stops_parent_id_idx" ON "_pages_v_blocks_grid_rows_items_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_grid_rows_items_order_idx" ON "_pages_v_blocks_grid_rows_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_grid_rows_items_parent_id_idx" ON "_pages_v_blocks_grid_rows_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_grid_rows_items_background_background_background_image_idx" ON "_pages_v_blocks_grid_rows_items" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_grid_rows_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_grid_rows_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_grid_rows_order_idx" ON "_pages_v_blocks_grid_rows" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_grid_rows_parent_id_idx" ON "_pages_v_blocks_grid_rows" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_grid_order_idx" ON "_pages_v_blocks_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_grid_parent_id_idx" ON "_pages_v_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_grid_path_idx" ON "_pages_v_blocks_grid" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_grid_background_background_background_image_idx" ON "_pages_v_blocks_grid" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_grid_locales_locale_parent_id_unique" ON "_pages_v_blocks_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_bento_background_color_stops_order_idx" ON "_pages_v_blocks_bento_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_bento_background_color_stops_parent_id_idx" ON "_pages_v_blocks_bento_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_bento_items_background_color_stops_order_idx" ON "_pages_v_blocks_bento_items_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_bento_items_background_color_stops_parent_id_idx" ON "_pages_v_blocks_bento_items_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_bento_items_order_idx" ON "_pages_v_blocks_bento_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_bento_items_parent_id_idx" ON "_pages_v_blocks_bento_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_bento_items_background_background_background_image_idx" ON "_pages_v_blocks_bento_items" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_bento_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_bento_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_bento_order_idx" ON "_pages_v_blocks_bento" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_bento_parent_id_idx" ON "_pages_v_blocks_bento" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_bento_path_idx" ON "_pages_v_blocks_bento" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_bento_background_background_background_image_idx" ON "_pages_v_blocks_bento" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_bento_locales_locale_parent_id_unique" ON "_pages_v_blocks_bento_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_tstm_background_color_stops_order_idx" ON "_pages_v_blocks_tstm_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_tstm_background_color_stops_parent_id_idx" ON "_pages_v_blocks_tstm_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_tstm_items_order_idx" ON "_pages_v_blocks_tstm_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_tstm_items_parent_id_idx" ON "_pages_v_blocks_tstm_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_tstm_items_avatar_idx" ON "_pages_v_blocks_tstm_items" USING btree ("avatar_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_tstm_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_tstm_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_tstm_order_idx" ON "_pages_v_blocks_tstm" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_tstm_parent_id_idx" ON "_pages_v_blocks_tstm" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_tstm_path_idx" ON "_pages_v_blocks_tstm" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_tstm_background_background_background_image_idx" ON "_pages_v_blocks_tstm" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_tstm_locales_locale_parent_id_unique" ON "_pages_v_blocks_tstm_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_background_color_stops_order_idx" ON "_pages_v_blocks_faq_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_background_color_stops_parent_id_idx" ON "_pages_v_blocks_faq_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_faqs_order_idx" ON "_pages_v_blocks_faq_faqs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_faqs_parent_id_idx" ON "_pages_v_blocks_faq_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_faq_faqs_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_background_background_background_image_idx" ON "_pages_v_blocks_faq" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_faq_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_team_background_color_stops_order_idx" ON "_pages_v_blocks_team_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_team_background_color_stops_parent_id_idx" ON "_pages_v_blocks_team_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_team_members_order_idx" ON "_pages_v_blocks_team_members" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_team_members_parent_id_idx" ON "_pages_v_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_team_members_photo_idx" ON "_pages_v_blocks_team_members" USING btree ("photo_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_team_members_locales_locale_parent_id_unique" ON "_pages_v_blocks_team_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_team_order_idx" ON "_pages_v_blocks_team" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_team_parent_id_idx" ON "_pages_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_team_path_idx" ON "_pages_v_blocks_team" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_team_background_background_background_image_idx" ON "_pages_v_blocks_team" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_team_locales_locale_parent_id_unique" ON "_pages_v_blocks_team_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_related_posts_background_color_stops_order_idx" ON "_pages_v_blocks_related_posts_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_related_posts_background_color_stops_parent_id_idx" ON "_pages_v_blocks_related_posts_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_related_posts_order_idx" ON "_pages_v_blocks_related_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_related_posts_parent_id_idx" ON "_pages_v_blocks_related_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_related_posts_path_idx" ON "_pages_v_blocks_related_posts" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_related_posts_background_background_background_image_idx" ON "_pages_v_blocks_related_posts" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_related_posts_locales_locale_parent_id_unique" ON "_pages_v_blocks_related_posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_background_color_stops_order_idx" ON "_pages_v_blocks_form_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_background_color_stops_parent_id_idx" ON "_pages_v_blocks_form_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_order_idx" ON "_pages_v_blocks_form" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_parent_id_idx" ON "_pages_v_blocks_form" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_path_idx" ON "_pages_v_blocks_form" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_background_background_background_image_idx" ON "_pages_v_blocks_form" USING btree ("background_background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_form_idx" ON "_pages_v_blocks_form" USING btree ("form_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_form_locales_locale_parent_id_unique" ON "_pages_v_blocks_form_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_brand_background_color_stops_order_idx" ON "_pages_v_blocks_brand_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_brand_background_color_stops_parent_id_idx" ON "_pages_v_blocks_brand_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_brand_logos_order_idx" ON "_pages_v_blocks_brand_logos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_brand_logos_parent_id_idx" ON "_pages_v_blocks_brand_logos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_brand_logos_svg_logo_idx" ON "_pages_v_blocks_brand_logos" USING btree ("svg_logo_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_brand_logos_png_logo_idx" ON "_pages_v_blocks_brand_logos" USING btree ("png_logo_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_brand_colors_order_idx" ON "_pages_v_blocks_brand_colors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_brand_colors_parent_id_idx" ON "_pages_v_blocks_brand_colors" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_brand_colors_locales_locale_parent_id_unique" ON "_pages_v_blocks_brand_colors_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_brand_order_idx" ON "_pages_v_blocks_brand" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_brand_parent_id_idx" ON "_pages_v_blocks_brand" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_brand_path_idx" ON "_pages_v_blocks_brand" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_brand_background_background_background_image_idx" ON "_pages_v_blocks_brand" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_brand_locales_locale_parent_id_unique" ON "_pages_v_blocks_brand_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_jobs_background_color_stops_order_idx" ON "_pages_v_blocks_jobs_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_jobs_background_color_stops_parent_id_idx" ON "_pages_v_blocks_jobs_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_jobs_order_idx" ON "_pages_v_blocks_jobs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_jobs_parent_id_idx" ON "_pages_v_blocks_jobs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_jobs_path_idx" ON "_pages_v_blocks_jobs" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_jobs_background_background_background_image_idx" ON "_pages_v_blocks_jobs" USING btree ("background_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_jobs_locales_locale_parent_id_unique" ON "_pages_v_blocks_jobs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_breadcrumbs_order_idx" ON "_pages_v_version_breadcrumbs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_breadcrumbs_parent_id_idx" ON "_pages_v_version_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_breadcrumbs_locale_idx" ON "_pages_v_version_breadcrumbs" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_breadcrumbs_doc_idx" ON "_pages_v_version_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_version_hero_background_image_idx" ON "_pages_v" USING btree ("version_hero_background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_parent_idx" ON "_pages_v" USING btree ("version_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX IF NOT EXISTS "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_version_hero_media_idx" ON "_pages_v_locales" USING btree ("version_hero_media_id","_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_slug_idx" ON "_pages_v_locales" USING btree ("version_slug","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_redirects_id_idx" ON "_pages_v_rels" USING btree ("redirects_id");
  CREATE INDEX IF NOT EXISTS "posts_populated_authors_order_idx" ON "posts_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_populated_authors_parent_id_idx" ON "posts_populated_authors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_populated_authors_avatar_idx" ON "posts_populated_authors" USING btree ("avatar_id");
  CREATE INDEX IF NOT EXISTS "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "posts_meta_meta_image_idx" ON "posts_locales" USING btree ("meta_image_id","_locale");
  CREATE INDEX IF NOT EXISTS "posts_slug_idx" ON "posts_locales" USING btree ("slug","_locale");
  CREATE INDEX IF NOT EXISTS "posts_thumbnail_idx" ON "posts_locales" USING btree ("thumbnail_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_populated_authors_order_idx" ON "_posts_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_populated_authors_parent_id_idx" ON "_posts_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_populated_authors_avatar_idx" ON "_posts_v_version_populated_authors" USING btree ("avatar_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_snapshot_idx" ON "_posts_v" USING btree ("snapshot");
  CREATE INDEX IF NOT EXISTS "_posts_v_published_locale_idx" ON "_posts_v" USING btree ("published_locale");
  CREATE INDEX IF NOT EXISTS "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_slug_idx" ON "_posts_v_locales" USING btree ("version_slug","_locale");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_thumbnail_idx" ON "_posts_v_locales" USING btree ("version_thumbnail_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "_posts_v_locales_locale_parent_id_unique" ON "_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "categories_slug_idx" ON "categories_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "categories_locales_locale_parent_id_unique" ON "categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "jobs_updated_at_idx" ON "jobs" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "jobs_created_at_idx" ON "jobs" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "jobs__status_idx" ON "jobs" USING btree ("_status");
  CREATE UNIQUE INDEX IF NOT EXISTS "jobs_locales_locale_parent_id_unique" ON "jobs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_jobs_v_parent_idx" ON "_jobs_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_jobs_v_version_version_updated_at_idx" ON "_jobs_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_jobs_v_version_version_created_at_idx" ON "_jobs_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_jobs_v_version_version__status_idx" ON "_jobs_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_jobs_v_created_at_idx" ON "_jobs_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_jobs_v_updated_at_idx" ON "_jobs_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_jobs_v_snapshot_idx" ON "_jobs_v" USING btree ("snapshot");
  CREATE INDEX IF NOT EXISTS "_jobs_v_published_locale_idx" ON "_jobs_v" USING btree ("published_locale");
  CREATE INDEX IF NOT EXISTS "_jobs_v_latest_idx" ON "_jobs_v" USING btree ("latest");
  CREATE UNIQUE INDEX IF NOT EXISTS "_jobs_v_locales_locale_parent_id_unique" ON "_jobs_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "users_policies_order_idx" ON "users_policies" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "users_policies_parent_idx" ON "users_policies" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "users_avatar_idx" ON "users" USING btree ("avatar_id");
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX IF NOT EXISTS "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "redirects_rels_pages_id_idx" ON "redirects_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "redirects_rels_posts_id_idx" ON "redirects_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_checkbox_locales_locale_parent_id_unique" ON "forms_blocks_checkbox_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_email_locales_locale_parent_id_unique" ON "forms_blocks_email_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_message_locales_locale_parent_id_unique" ON "forms_blocks_message_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_number_locales_locale_parent_id_unique" ON "forms_blocks_number_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_select_options_locales_locale_parent_id_unique" ON "forms_blocks_select_options_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_select_locales_locale_parent_id_unique" ON "forms_blocks_select_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_text_locales_locale_parent_id_unique" ON "forms_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_textarea_locales_locale_parent_id_unique" ON "forms_blocks_textarea_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_acceptance_order_idx" ON "forms_blocks_acceptance" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_acceptance_parent_id_idx" ON "forms_blocks_acceptance" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_acceptance_path_idx" ON "forms_blocks_acceptance" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_acceptance_locales_locale_parent_id_unique" ON "forms_blocks_acceptance_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_emails_locales_locale_parent_id_unique" ON "forms_emails_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_locales_locale_parent_id_unique" ON "forms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_rels_order_idx" ON "forms_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "forms_rels_parent_idx" ON "forms_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "forms_rels_path_idx" ON "forms_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "forms_rels_pages_id_idx" ON "forms_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "forms_rels_posts_id_idx" ON "forms_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX IF NOT EXISTS "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("jobs_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "header_nav_items_link_sublinks_order_idx" ON "header_nav_items_link_sublinks" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_nav_items_link_sublinks_parent_id_idx" ON "header_nav_items_link_sublinks" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_nav_items_link_sublinks_link_link_icon_idx" ON "header_nav_items_link_sublinks" USING btree ("link_icon_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "header_nav_items_link_sublinks_locales_locale_parent_id_unique" ON "header_nav_items_link_sublinks_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_nav_items_link_link_icon_idx" ON "header_nav_items" USING btree ("link_icon_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "header_nav_items_locales_locale_parent_id_unique" ON "header_nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "header_rels_redirects_id_idx" ON "header_rels" USING btree ("redirects_id");
  CREATE INDEX IF NOT EXISTS "footer_groups_group_items_order_idx" ON "footer_groups_group_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_groups_group_items_parent_id_idx" ON "footer_groups_group_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "footer_groups_group_items_locales_locale_parent_id_unique" ON "footer_groups_group_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_groups_order_idx" ON "footer_groups" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_groups_parent_id_idx" ON "footer_groups" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "footer_groups_locales_locale_parent_id_unique" ON "footer_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_legal_links_order_idx" ON "footer_legal_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_legal_links_parent_id_idx" ON "footer_legal_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "footer_legal_links_locales_locale_parent_id_unique" ON "footer_legal_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_posts_id_idx" ON "footer_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_redirects_id_idx" ON "footer_rels" USING btree ("redirects_id");
  CREATE INDEX IF NOT EXISTS "company_socials_order_idx" ON "company_socials" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "company_socials_parent_id_idx" ON "company_socials" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_hero_badges" CASCADE;
  DROP TABLE "pages_hero_badges_locales" CASCADE;
  DROP TABLE "pages_hero_links" CASCADE;
  DROP TABLE "pages_hero_links_locales" CASCADE;
  DROP TABLE "pages_blocks_text_background_color_stops" CASCADE;
  DROP TABLE "pages_blocks_text" CASCADE;
  DROP TABLE "pages_blocks_text_locales" CASCADE;
  DROP TABLE "pages_blocks_prose_background_color_stops" CASCADE;
  DROP TABLE "pages_blocks_prose" CASCADE;
  DROP TABLE "pages_blocks_prose_locales" CASCADE;
  DROP TABLE "pages_blocks_cta_background_color_stops" CASCADE;
  DROP TABLE "pages_blocks_cta_links" CASCADE;
  DROP TABLE "pages_blocks_cta_links_locales" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_cta_locales" CASCADE;
  DROP TABLE "pages_blocks_mlst_items" CASCADE;
  DROP TABLE "pages_blocks_mlst_items_locales" CASCADE;
  DROP TABLE "pages_blocks_mlst_background_color_stops" CASCADE;
  DROP TABLE "pages_blocks_mlst" CASCADE;
  DROP TABLE "pages_blocks_mlst_locales" CASCADE;
  DROP TABLE "pages_blocks_clients_background_color_stops" CASCADE;
  DROP TABLE "pages_blocks_clients_clients" CASCADE;
  DROP TABLE "pages_blocks_clients_clients_locales" CASCADE;
  DROP TABLE "pages_blocks_clients" CASCADE;
  DROP TABLE "pages_blocks_clients_locales" CASCADE;
  DROP TABLE "pages_blocks_features_background_color_stops" CASCADE;
  DROP TABLE "pages_blocks_features_items" CASCADE;
  DROP TABLE "pages_blocks_features_items_locales" CASCADE;
  DROP TABLE "pages_blocks_features" CASCADE;
  DROP TABLE "pages_blocks_features_locales" CASCADE;
  DROP TABLE "pages_blocks_awards_background_color_stops" CASCADE;
  DROP TABLE "pages_blocks_awards_awards" CASCADE;
  DROP TABLE "pages_blocks_awards_awards_locales" CASCADE;
  DROP TABLE "pages_blocks_awards" CASCADE;
  DROP TABLE "pages_blocks_awards_locales" CASCADE;
  DROP TABLE "pages_blocks_stats_background_color_stops" CASCADE;
  DROP TABLE "pages_blocks_stats_stats" CASCADE;
  DROP TABLE "pages_blocks_stats_stats_locales" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_stats_locales" CASCADE;
  DROP TABLE "pages_blocks_grid_background_color_stops" CASCADE;
  DROP TABLE "pages_blocks_grid_rows_items_background_color_stops" CASCADE;
  DROP TABLE "pages_blocks_grid_rows_items" CASCADE;
  DROP TABLE "pages_blocks_grid_rows_items_locales" CASCADE;
  DROP TABLE "pages_blocks_grid_rows" CASCADE;
  DROP TABLE "pages_blocks_grid" CASCADE;
  DROP TABLE "pages_blocks_grid_locales" CASCADE;
  DROP TABLE "pages_blocks_bento_background_color_stops" CASCADE;
  DROP TABLE "pages_blocks_bento_items_background_color_stops" CASCADE;
  DROP TABLE "pages_blocks_bento_items" CASCADE;
  DROP TABLE "pages_blocks_bento_items_locales" CASCADE;
  DROP TABLE "pages_blocks_bento" CASCADE;
  DROP TABLE "pages_blocks_bento_locales" CASCADE;
  DROP TABLE "pages_blocks_tstm_background_color_stops" CASCADE;
  DROP TABLE "pages_blocks_tstm_items" CASCADE;
  DROP TABLE "pages_blocks_tstm_items_locales" CASCADE;
  DROP TABLE "pages_blocks_tstm" CASCADE;
  DROP TABLE "pages_blocks_tstm_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_background_color_stops" CASCADE;
  DROP TABLE "pages_blocks_faq_faqs" CASCADE;
  DROP TABLE "pages_blocks_faq_faqs_locales" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_faq_locales" CASCADE;
  DROP TABLE "pages_blocks_team_background_color_stops" CASCADE;
  DROP TABLE "pages_blocks_team_members" CASCADE;
  DROP TABLE "pages_blocks_team_members_locales" CASCADE;
  DROP TABLE "pages_blocks_team" CASCADE;
  DROP TABLE "pages_blocks_team_locales" CASCADE;
  DROP TABLE "pages_blocks_related_posts_background_color_stops" CASCADE;
  DROP TABLE "pages_blocks_related_posts" CASCADE;
  DROP TABLE "pages_blocks_related_posts_locales" CASCADE;
  DROP TABLE "pages_blocks_form_background_color_stops" CASCADE;
  DROP TABLE "pages_blocks_form" CASCADE;
  DROP TABLE "pages_blocks_form_locales" CASCADE;
  DROP TABLE "pages_blocks_brand_background_color_stops" CASCADE;
  DROP TABLE "pages_blocks_brand_logos" CASCADE;
  DROP TABLE "pages_blocks_brand_colors" CASCADE;
  DROP TABLE "pages_blocks_brand_colors_locales" CASCADE;
  DROP TABLE "pages_blocks_brand" CASCADE;
  DROP TABLE "pages_blocks_brand_locales" CASCADE;
  DROP TABLE "pages_blocks_jobs_background_color_stops" CASCADE;
  DROP TABLE "pages_blocks_jobs" CASCADE;
  DROP TABLE "pages_blocks_jobs_locales" CASCADE;
  DROP TABLE "pages_breadcrumbs" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_version_hero_badges" CASCADE;
  DROP TABLE "_pages_v_version_hero_badges_locales" CASCADE;
  DROP TABLE "_pages_v_version_hero_links" CASCADE;
  DROP TABLE "_pages_v_version_hero_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_text_background_color_stops" CASCADE;
  DROP TABLE "_pages_v_blocks_text" CASCADE;
  DROP TABLE "_pages_v_blocks_text_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_prose_background_color_stops" CASCADE;
  DROP TABLE "_pages_v_blocks_prose" CASCADE;
  DROP TABLE "_pages_v_blocks_prose_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_background_color_stops" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_mlst_items" CASCADE;
  DROP TABLE "_pages_v_blocks_mlst_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_mlst_background_color_stops" CASCADE;
  DROP TABLE "_pages_v_blocks_mlst" CASCADE;
  DROP TABLE "_pages_v_blocks_mlst_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_clients_background_color_stops" CASCADE;
  DROP TABLE "_pages_v_blocks_clients_clients" CASCADE;
  DROP TABLE "_pages_v_blocks_clients_clients_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_clients" CASCADE;
  DROP TABLE "_pages_v_blocks_clients_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_features_background_color_stops" CASCADE;
  DROP TABLE "_pages_v_blocks_features_items" CASCADE;
  DROP TABLE "_pages_v_blocks_features_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_features" CASCADE;
  DROP TABLE "_pages_v_blocks_features_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_awards_background_color_stops" CASCADE;
  DROP TABLE "_pages_v_blocks_awards_awards" CASCADE;
  DROP TABLE "_pages_v_blocks_awards_awards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_awards" CASCADE;
  DROP TABLE "_pages_v_blocks_awards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_background_color_stops" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_stats_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_grid_background_color_stops" CASCADE;
  DROP TABLE "_pages_v_blocks_grid_rows_items_background_color_stops" CASCADE;
  DROP TABLE "_pages_v_blocks_grid_rows_items" CASCADE;
  DROP TABLE "_pages_v_blocks_grid_rows_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_grid_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_grid_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_bento_background_color_stops" CASCADE;
  DROP TABLE "_pages_v_blocks_bento_items_background_color_stops" CASCADE;
  DROP TABLE "_pages_v_blocks_bento_items" CASCADE;
  DROP TABLE "_pages_v_blocks_bento_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_bento" CASCADE;
  DROP TABLE "_pages_v_blocks_bento_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_tstm_background_color_stops" CASCADE;
  DROP TABLE "_pages_v_blocks_tstm_items" CASCADE;
  DROP TABLE "_pages_v_blocks_tstm_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_tstm" CASCADE;
  DROP TABLE "_pages_v_blocks_tstm_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_background_color_stops" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_faqs" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_faqs_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_team_background_color_stops" CASCADE;
  DROP TABLE "_pages_v_blocks_team_members" CASCADE;
  DROP TABLE "_pages_v_blocks_team_members_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_team" CASCADE;
  DROP TABLE "_pages_v_blocks_team_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_related_posts_background_color_stops" CASCADE;
  DROP TABLE "_pages_v_blocks_related_posts" CASCADE;
  DROP TABLE "_pages_v_blocks_related_posts_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_form_background_color_stops" CASCADE;
  DROP TABLE "_pages_v_blocks_form" CASCADE;
  DROP TABLE "_pages_v_blocks_form_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_brand_background_color_stops" CASCADE;
  DROP TABLE "_pages_v_blocks_brand_logos" CASCADE;
  DROP TABLE "_pages_v_blocks_brand_colors" CASCADE;
  DROP TABLE "_pages_v_blocks_brand_colors_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_brand" CASCADE;
  DROP TABLE "_pages_v_blocks_brand_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_jobs_background_color_stops" CASCADE;
  DROP TABLE "_pages_v_blocks_jobs" CASCADE;
  DROP TABLE "_pages_v_blocks_jobs_locales" CASCADE;
  DROP TABLE "_pages_v_version_breadcrumbs" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "posts_populated_authors" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v_version_populated_authors" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_locales" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "categories_locales" CASCADE;
  DROP TABLE "jobs" CASCADE;
  DROP TABLE "jobs_locales" CASCADE;
  DROP TABLE "_jobs_v" CASCADE;
  DROP TABLE "_jobs_v_locales" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "users_policies" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_checkbox_locales" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_email_locales" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_message_locales" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_number_locales" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select_options_locales" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_select_locales" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_text_locales" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_blocks_textarea_locales" CASCADE;
  DROP TABLE "forms_blocks_acceptance" CASCADE;
  DROP TABLE "forms_blocks_acceptance_locales" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms_emails_locales" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "forms_locales" CASCADE;
  DROP TABLE "forms_rels" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav_items_link_sublinks" CASCADE;
  DROP TABLE "header_nav_items_link_sublinks_locales" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header_nav_items_locales" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "footer_groups_group_items" CASCADE;
  DROP TABLE "footer_groups_group_items_locales" CASCADE;
  DROP TABLE "footer_groups" CASCADE;
  DROP TABLE "footer_groups_locales" CASCADE;
  DROP TABLE "footer_legal_links" CASCADE;
  DROP TABLE "footer_legal_links_locales" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TABLE "company_socials" CASCADE;
  DROP TABLE "company" CASCADE;
  DROP TYPE "public"."_locales";`)
}
