import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."_locales" AS ENUM('en', 'it');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_hero_badges_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_hero_badges_link_appearance" AS ENUM('badge');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_hero_links_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_hero_links_link_appearance" AS ENUM('default', 'outline');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_text_heading" AS ENUM('h2', 'h3', 'h4');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_text_background_type" AS ENUM('none', 'color', 'image', 'verticalGradient', 'horizontalGradient');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_cta_heading" AS ENUM('h2', 'h3', 'h4');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_cta_background_type" AS ENUM('none', 'color', 'image', 'verticalGradient', 'horizontalGradient');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_milestones_type" AS ENUM('timeline', 'roadmap');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_milestones_milestones_status" AS ENUM('completed', 'active', 'upcoming');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_milestones_background_type" AS ENUM('none', 'color', 'image', 'verticalGradient', 'horizontalGradient');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_clients_heading" AS ENUM('h2', 'h3', 'h4');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_clients_background_type" AS ENUM('none', 'color', 'image', 'verticalGradient', 'horizontalGradient');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_clients_clients_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_clients_clients_link_appearance" AS ENUM('default', 'outline');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_features_heading" AS ENUM('h2', 'h3', 'h4');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_features_background_type" AS ENUM('none', 'color', 'image', 'verticalGradient', 'horizontalGradient');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_awards_heading" AS ENUM('h2', 'h3', 'h4');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_awards_background_type" AS ENUM('none', 'color', 'image', 'verticalGradient', 'horizontalGradient');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_awards_awards_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_awards_awards_link_appearance" AS ENUM('default', 'outline');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_stats_heading" AS ENUM('h2', 'h3', 'h4');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_stats_background_type" AS ENUM('none', 'color', 'image', 'verticalGradient', 'horizontalGradient');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_bento_heading" AS ENUM('h2', 'h3', 'h4');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_bento_background_type" AS ENUM('none', 'color', 'image', 'verticalGradient', 'horizontalGradient');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_bento_items_background_type" AS ENUM('none', 'color', 'image', 'verticalGradient', 'horizontalGradient');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_bento_items_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_bento_items_link_appearance" AS ENUM('default', 'outline');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_testimonials_heading" AS ENUM('h2', 'h3', 'h4');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_testimonials_background_type" AS ENUM('none', 'color', 'image', 'verticalGradient', 'horizontalGradient');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_testimonials_testimonials_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_testimonials_testimonials_link_appearance" AS ENUM('default', 'outline');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_faq_heading" AS ENUM('h2', 'h3', 'h4');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_faq_background_type" AS ENUM('none', 'color', 'image', 'verticalGradient', 'horizontalGradient');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_related_posts_heading" AS ENUM('h2', 'h3', 'h4');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_related_posts_background_type" AS ENUM('none', 'color', 'image', 'verticalGradient', 'horizontalGradient');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_form_heading" AS ENUM('h2', 'h3', 'h4');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_form_background_type" AS ENUM('none', 'color', 'image', 'verticalGradient', 'horizontalGradient');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_brand_heading" AS ENUM('h2', 'h3', 'h4');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_brand_background_type" AS ENUM('none', 'color', 'image', 'verticalGradient', 'horizontalGradient');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_brand_logos_variant" AS ENUM('light', 'dark');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_version_hero_badges_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_version_hero_badges_link_appearance" AS ENUM('badge');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_version_hero_links_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_version_hero_links_link_appearance" AS ENUM('default', 'outline');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_text_heading" AS ENUM('h2', 'h3', 'h4');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_text_background_type" AS ENUM('none', 'color', 'image', 'verticalGradient', 'horizontalGradient');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_cta_heading" AS ENUM('h2', 'h3', 'h4');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_cta_background_type" AS ENUM('none', 'color', 'image', 'verticalGradient', 'horizontalGradient');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_milestones_type" AS ENUM('timeline', 'roadmap');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_milestones_milestones_status" AS ENUM('completed', 'active', 'upcoming');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_milestones_background_type" AS ENUM('none', 'color', 'image', 'verticalGradient', 'horizontalGradient');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_clients_heading" AS ENUM('h2', 'h3', 'h4');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_clients_background_type" AS ENUM('none', 'color', 'image', 'verticalGradient', 'horizontalGradient');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_clients_clients_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_clients_clients_link_appearance" AS ENUM('default', 'outline');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_features_heading" AS ENUM('h2', 'h3', 'h4');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_features_background_type" AS ENUM('none', 'color', 'image', 'verticalGradient', 'horizontalGradient');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_awards_heading" AS ENUM('h2', 'h3', 'h4');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_awards_background_type" AS ENUM('none', 'color', 'image', 'verticalGradient', 'horizontalGradient');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_awards_awards_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_awards_awards_link_appearance" AS ENUM('default', 'outline');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_stats_heading" AS ENUM('h2', 'h3', 'h4');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_stats_background_type" AS ENUM('none', 'color', 'image', 'verticalGradient', 'horizontalGradient');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_bento_heading" AS ENUM('h2', 'h3', 'h4');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_bento_background_type" AS ENUM('none', 'color', 'image', 'verticalGradient', 'horizontalGradient');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_bento_items_background_type" AS ENUM('none', 'color', 'image', 'verticalGradient', 'horizontalGradient');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_bento_items_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_bento_items_link_appearance" AS ENUM('default', 'outline');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_testimonials_heading" AS ENUM('h2', 'h3', 'h4');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_testimonials_background_type" AS ENUM('none', 'color', 'image', 'verticalGradient', 'horizontalGradient');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_testimonials_testimonials_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_testimonials_testimonials_link_appearance" AS ENUM('default', 'outline');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_faq_heading" AS ENUM('h2', 'h3', 'h4');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_faq_background_type" AS ENUM('none', 'color', 'image', 'verticalGradient', 'horizontalGradient');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_related_posts_heading" AS ENUM('h2', 'h3', 'h4');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_related_posts_background_type" AS ENUM('none', 'color', 'image', 'verticalGradient', 'horizontalGradient');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_form_heading" AS ENUM('h2', 'h3', 'h4');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_form_background_type" AS ENUM('none', 'color', 'image', 'verticalGradient', 'horizontalGradient');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_brand_heading" AS ENUM('h2', 'h3', 'h4');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_brand_background_type" AS ENUM('none', 'color', 'image', 'verticalGradient', 'horizontalGradient');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_brand_logos_variant" AS ENUM('light', 'dark');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_users_policies" AS ENUM('postsEditor', 'postsContributor', 'webDesigner', 'administrator');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_header_nav_items_link_sublinks_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_footer_groups_group_items_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_company_socials_social" AS ENUM('facebook', 'twitter', 'instagram', 'linkedin', 'github', 'youtube', 'pinterest', 'tiktok', 'snapchat', 'telegram', 'signal', 'discord', 'twitch', 'reddit');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE TABLE IF NOT EXISTS "pages_hero_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_hero_badges_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_hero_badges_link_appearance"
  );
  
  CREATE TABLE IF NOT EXISTS "pages_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_hero_links_link_appearance"
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_text_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"heading" "enum_pages_blocks_text_heading" DEFAULT 'h2',
  	"subtitle" varchar,
  	"text" jsonb,
  	"centered" boolean DEFAULT false,
  	"background_type" "enum_pages_blocks_text_background_type" DEFAULT 'none',
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_cta_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_cta_links_link_appearance"
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"heading" "enum_pages_blocks_cta_heading" DEFAULT 'h2',
  	"subtitle" varchar,
  	"text" jsonb,
  	"centered" boolean DEFAULT false,
  	"background_type" "enum_pages_blocks_cta_background_type" DEFAULT 'none',
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"media_id" uuid,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_milestones_milestones" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"date" varchar,
  	"status" "enum_pages_blocks_milestones_milestones_status" DEFAULT 'completed',
  	"text" jsonb,
  	"media_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_milestones_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_milestones" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"type" "enum_pages_blocks_milestones_type",
  	"background_type" "enum_pages_blocks_milestones_background_type" DEFAULT 'none',
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_clients_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_clients_clients" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" uuid,
  	"link_type" "enum_pages_blocks_clients_clients_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_clients_clients_link_appearance"
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_clients" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"heading" "enum_pages_blocks_clients_heading" DEFAULT 'h2',
  	"subtitle" varchar,
  	"text" jsonb,
  	"centered" boolean DEFAULT false,
  	"background_type" "enum_pages_blocks_clients_background_type" DEFAULT 'none',
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_features_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_features_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"icon_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"heading" "enum_pages_blocks_features_heading" DEFAULT 'h2',
  	"subtitle" varchar,
  	"text" jsonb,
  	"centered" boolean DEFAULT false,
  	"background_type" "enum_pages_blocks_features_background_type" DEFAULT 'none',
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_awards_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_awards_awards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" uuid,
  	"link_type" "enum_pages_blocks_awards_awards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_awards_awards_link_appearance"
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_awards" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"heading" "enum_pages_blocks_awards_heading" DEFAULT 'h2',
  	"subtitle" varchar,
  	"text" jsonb,
  	"centered" boolean DEFAULT false,
  	"background_type" "enum_pages_blocks_awards_background_type" DEFAULT 'none',
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_stats_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"heading" "enum_pages_blocks_stats_heading" DEFAULT 'h2',
  	"subtitle" varchar,
  	"text" jsonb,
  	"centered" boolean DEFAULT false,
  	"background_type" "enum_pages_blocks_stats_background_type" DEFAULT 'none',
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_bento_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_bento_items_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_bento_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"background_type" "enum_pages_blocks_bento_items_background_type" DEFAULT 'none',
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"row_span" numeric DEFAULT 1,
  	"col_span" numeric DEFAULT 1,
  	"link_type" "enum_pages_blocks_bento_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_bento_items_link_appearance"
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_bento" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"heading" "enum_pages_blocks_bento_heading" DEFAULT 'h2',
  	"subtitle" varchar,
  	"text" jsonb,
  	"centered" boolean DEFAULT false,
  	"background_type" "enum_pages_blocks_bento_background_type" DEFAULT 'none',
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_testimonials_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_testimonials_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"quote" jsonb,
  	"avatar_id" uuid,
  	"link_type" "enum_pages_blocks_testimonials_testimonials_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_testimonials_testimonials_link_appearance"
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"heading" "enum_pages_blocks_testimonials_heading" DEFAULT 'h2',
  	"subtitle" varchar,
  	"text" jsonb,
  	"centered" boolean DEFAULT false,
  	"background_type" "enum_pages_blocks_testimonials_background_type" DEFAULT 'none',
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_faq_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_faq_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"text" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"heading" "enum_pages_blocks_faq_heading" DEFAULT 'h2',
  	"subtitle" varchar,
  	"text" jsonb,
  	"centered" boolean DEFAULT false,
  	"background_type" "enum_pages_blocks_faq_background_type" DEFAULT 'none',
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_related_posts_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_related_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"heading" "enum_pages_blocks_related_posts_heading" DEFAULT 'h2',
  	"subtitle" varchar,
  	"text" jsonb,
  	"centered" boolean DEFAULT false,
  	"background_type" "enum_pages_blocks_related_posts_background_type" DEFAULT 'none',
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_form_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"heading" "enum_pages_blocks_form_heading" DEFAULT 'h2',
  	"subtitle" varchar,
  	"text" jsonb,
  	"centered" boolean DEFAULT false,
  	"background_type" "enum_pages_blocks_form_background_type" DEFAULT 'none',
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"form_id" uuid,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_brand_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"stop" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_brand_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"svg_logo_id" uuid,
  	"png_logo_id" uuid,
  	"variant" "enum_pages_blocks_brand_logos_variant"
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_brand_colors" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"color" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_brand" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"heading" "enum_pages_blocks_brand_heading" DEFAULT 'h2',
  	"subtitle" varchar,
  	"text" jsonb,
  	"centered" boolean DEFAULT false,
  	"background_type" "enum_pages_blocks_brand_background_type" DEFAULT 'none',
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" uuid,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"hero_background_image_id" uuid,
  	"slug_lock" boolean DEFAULT true,
  	"published_at" timestamp(3) with time zone,
  	"parent_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_locales" (
  	"title" varchar,
  	"hero_type" "enum_pages_hero_type" DEFAULT 'lowImpact',
  	"hero_title" varchar,
  	"hero_description" jsonb,
  	"hero_media_id" uuid,
  	"meta_title" varchar,
  	"meta_image_id" uuid,
  	"meta_description" varchar,
  	"slug" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	CONSTRAINT "pages_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"pages_id" uuid,
  	"posts_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"link_type" "enum__pages_v_version_hero_badges_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_version_hero_badges_link_appearance",
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"link_type" "enum__pages_v_version_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_version_hero_links_link_appearance",
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_text_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"heading" "enum__pages_v_blocks_text_heading" DEFAULT 'h2',
  	"subtitle" varchar,
  	"text" jsonb,
  	"centered" boolean DEFAULT false,
  	"background_type" "enum__pages_v_blocks_text_background_type" DEFAULT 'none',
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"link_type" "enum__pages_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_cta_links_link_appearance",
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"heading" "enum__pages_v_blocks_cta_heading" DEFAULT 'h2',
  	"subtitle" varchar,
  	"text" jsonb,
  	"centered" boolean DEFAULT false,
  	"background_type" "enum__pages_v_blocks_cta_background_type" DEFAULT 'none',
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"media_id" uuid,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_milestones_milestones" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"date" varchar,
  	"status" "enum__pages_v_blocks_milestones_milestones_status" DEFAULT 'completed',
  	"text" jsonb,
  	"media_id" uuid,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_milestones_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_milestones" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"type" "enum__pages_v_blocks_milestones_type",
  	"background_type" "enum__pages_v_blocks_milestones_background_type" DEFAULT 'none',
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_clients_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_clients_clients" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"logo_id" uuid,
  	"link_type" "enum__pages_v_blocks_clients_clients_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_clients_clients_link_appearance",
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_clients" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"heading" "enum__pages_v_blocks_clients_heading" DEFAULT 'h2',
  	"subtitle" varchar,
  	"text" jsonb,
  	"centered" boolean DEFAULT false,
  	"background_type" "enum__pages_v_blocks_clients_background_type" DEFAULT 'none',
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_features_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_features_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"icon_id" uuid,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"heading" "enum__pages_v_blocks_features_heading" DEFAULT 'h2',
  	"subtitle" varchar,
  	"text" jsonb,
  	"centered" boolean DEFAULT false,
  	"background_type" "enum__pages_v_blocks_features_background_type" DEFAULT 'none',
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_awards_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_awards_awards" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"logo_id" uuid,
  	"link_type" "enum__pages_v_blocks_awards_awards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_awards_awards_link_appearance",
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_awards" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"heading" "enum__pages_v_blocks_awards_heading" DEFAULT 'h2',
  	"subtitle" varchar,
  	"text" jsonb,
  	"centered" boolean DEFAULT false,
  	"background_type" "enum__pages_v_blocks_awards_background_type" DEFAULT 'none',
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_stats_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"label" varchar,
  	"value" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"heading" "enum__pages_v_blocks_stats_heading" DEFAULT 'h2',
  	"subtitle" varchar,
  	"text" jsonb,
  	"centered" boolean DEFAULT false,
  	"background_type" "enum__pages_v_blocks_stats_background_type" DEFAULT 'none',
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_bento_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_bento_items_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_bento_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"background_type" "enum__pages_v_blocks_bento_items_background_type" DEFAULT 'none',
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"row_span" numeric DEFAULT 1,
  	"col_span" numeric DEFAULT 1,
  	"link_type" "enum__pages_v_blocks_bento_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_bento_items_link_appearance",
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_bento" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"heading" "enum__pages_v_blocks_bento_heading" DEFAULT 'h2',
  	"subtitle" varchar,
  	"text" jsonb,
  	"centered" boolean DEFAULT false,
  	"background_type" "enum__pages_v_blocks_bento_background_type" DEFAULT 'none',
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_testimonials_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_testimonials_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"quote" jsonb,
  	"avatar_id" uuid,
  	"link_type" "enum__pages_v_blocks_testimonials_testimonials_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_testimonials_testimonials_link_appearance",
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"heading" "enum__pages_v_blocks_testimonials_heading" DEFAULT 'h2',
  	"subtitle" varchar,
  	"text" jsonb,
  	"centered" boolean DEFAULT false,
  	"background_type" "enum__pages_v_blocks_testimonials_background_type" DEFAULT 'none',
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_faq_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_faq_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"question" varchar,
  	"text" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"heading" "enum__pages_v_blocks_faq_heading" DEFAULT 'h2',
  	"subtitle" varchar,
  	"text" jsonb,
  	"centered" boolean DEFAULT false,
  	"background_type" "enum__pages_v_blocks_faq_background_type" DEFAULT 'none',
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_related_posts_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_related_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"heading" "enum__pages_v_blocks_related_posts_heading" DEFAULT 'h2',
  	"subtitle" varchar,
  	"text" jsonb,
  	"centered" boolean DEFAULT false,
  	"background_type" "enum__pages_v_blocks_related_posts_background_type" DEFAULT 'none',
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_form_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"heading" "enum__pages_v_blocks_form_heading" DEFAULT 'h2',
  	"subtitle" varchar,
  	"text" jsonb,
  	"centered" boolean DEFAULT false,
  	"background_type" "enum__pages_v_blocks_form_background_type" DEFAULT 'none',
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"form_id" uuid,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_brand_background_color_stops" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"color" varchar,
  	"stop" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_brand_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"svg_logo_id" uuid,
  	"png_logo_id" uuid,
  	"variant" "enum__pages_v_blocks_brand_logos_variant",
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_brand_colors" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"color" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_brand" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"heading" "enum__pages_v_blocks_brand_heading" DEFAULT 'h2',
  	"subtitle" varchar,
  	"text" jsonb,
  	"centered" boolean DEFAULT false,
  	"background_type" "enum__pages_v_blocks_brand_background_type" DEFAULT 'none',
  	"background_background_image_id" uuid,
  	"background_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_version_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"doc_id" uuid,
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_hero_background_image_id" uuid,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_published_at" timestamp(3) with time zone,
  	"version_parent_id" uuid,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_locales" (
  	"version_title" varchar,
  	"version_hero_type" "enum__pages_v_version_hero_type" DEFAULT 'lowImpact',
  	"version_hero_title" varchar,
  	"version_hero_description" jsonb,
  	"version_hero_media_id" uuid,
  	"version_meta_title" varchar,
  	"version_meta_image_id" uuid,
  	"version_meta_description" varchar,
  	"version_slug" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	CONSTRAINT "_pages_v_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"pages_id" uuid,
  	"posts_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "posts_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"slug_lock" boolean DEFAULT true,
  	"published_at" timestamp(3) with time zone,
  	"edited_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "posts_locales" (
  	"title" varchar,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" uuid,
  	"meta_description" varchar,
  	"slug" varchar,
  	"thumbnail_id" uuid,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	CONSTRAINT "posts_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
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
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_published_at" timestamp(3) with time zone,
  	"version_edited_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_locales" (
  	"version_title" varchar,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" uuid,
  	"version_meta_description" varchar,
  	"version_slug" varchar,
  	"version_thumbnail_id" uuid,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	CONSTRAINT "_posts_v_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
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
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	CONSTRAINT "categories_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	CONSTRAINT "media_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "users_policies" (
  	"order" integer NOT NULL,
  	"parent_id" uuid NOT NULL,
  	"value" "enum_users_policies",
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
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
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
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
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "forms_blocks_checkbox_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_country_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "forms_blocks_country_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
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
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "forms_blocks_email_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
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
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "forms_blocks_message_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
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
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "forms_blocks_number_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
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
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "forms_blocks_select_options_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
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
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "forms_blocks_select_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_state_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "forms_blocks_state_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
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
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "forms_blocks_text_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
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
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "forms_blocks_textarea_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
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
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "forms_emails_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "forms" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar NOT NULL,
  	"confirmationType" "enum_forms_confirmation_type" DEFAULT 'message',
  	"redirect_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_locales" (
  	"submit_button_label" varchar,
  	"confirmation_message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	CONSTRAINT "forms_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
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
  	"link_type" "enum_header_nav_items_link_sublinks_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_icon_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "header_nav_items_link_sublinks_locales" (
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "header_nav_items_link_sublinks_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_icon_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "header_nav_items_locales" (
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "header_nav_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
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
  	"posts_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "footer_groups_group_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_groups_group_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "footer_groups_group_items_locales" (
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "footer_groups_group_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "footer_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer_groups_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "footer_groups_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
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
  	"posts_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "company_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"social" "enum_company_socials_social" NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "company" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"company_name" varchar NOT NULL,
  	"company_email" varchar NOT NULL,
  	"company_founded_date" timestamp(3) with time zone NOT NULL,
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
   ALTER TABLE "pages_hero_links" ADD CONSTRAINT "pages_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "pages_blocks_milestones_milestones" ADD CONSTRAINT "pages_blocks_milestones_milestones_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_milestones_milestones" ADD CONSTRAINT "pages_blocks_milestones_milestones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_milestones"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_milestones_background_color_stops" ADD CONSTRAINT "pages_blocks_milestones_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_milestones"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_milestones" ADD CONSTRAINT "pages_blocks_milestones_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_milestones" ADD CONSTRAINT "pages_blocks_milestones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "pages_blocks_features_background_color_stops" ADD CONSTRAINT "pages_blocks_features_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_features_features" ADD CONSTRAINT "pages_blocks_features_features_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_features_features" ADD CONSTRAINT "pages_blocks_features_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "pages_blocks_testimonials_background_color_stops" ADD CONSTRAINT "pages_blocks_testimonials_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_testimonials_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_testimonials_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "_pages_v_version_hero_badges" ADD CONSTRAINT "_pages_v_version_hero_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "_pages_v_blocks_milestones_milestones" ADD CONSTRAINT "_pages_v_blocks_milestones_milestones_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_milestones_milestones" ADD CONSTRAINT "_pages_v_blocks_milestones_milestones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_milestones"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_milestones_background_color_stops" ADD CONSTRAINT "_pages_v_blocks_milestones_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_milestones"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_milestones" ADD CONSTRAINT "_pages_v_blocks_milestones_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_milestones" ADD CONSTRAINT "_pages_v_blocks_milestones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "_pages_v_blocks_features_background_color_stops" ADD CONSTRAINT "_pages_v_blocks_features_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_features_features" ADD CONSTRAINT "_pages_v_blocks_features_features_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_features_features" ADD CONSTRAINT "_pages_v_blocks_features_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "_pages_v_blocks_testimonials_background_color_stops" ADD CONSTRAINT "_pages_v_blocks_testimonials_background_color_stops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_testimonials_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_testimonials_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_background_background_image_id_media_id_fk" FOREIGN KEY ("background_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_country_locales" ADD CONSTRAINT "forms_blocks_country_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_country"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_state_locales" ADD CONSTRAINT "forms_blocks_state_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_state"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "company_socials" ADD CONSTRAINT "company_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_hero_badges_order_idx" ON "pages_hero_badges" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_hero_badges_parent_id_idx" ON "pages_hero_badges" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_hero_badges_locale_idx" ON "pages_hero_badges" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_hero_links_order_idx" ON "pages_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_hero_links_parent_id_idx" ON "pages_hero_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_hero_links_locale_idx" ON "pages_hero_links" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_text_background_color_stops_order_idx" ON "pages_blocks_text_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_text_background_color_stops_parent_id_idx" ON "pages_blocks_text_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_text_background_color_stops_locale_idx" ON "pages_blocks_text_background_color_stops" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_text_order_idx" ON "pages_blocks_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_text_parent_id_idx" ON "pages_blocks_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_text_path_idx" ON "pages_blocks_text" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_text_locale_idx" ON "pages_blocks_text" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_background_color_stops_order_idx" ON "pages_blocks_cta_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_background_color_stops_parent_id_idx" ON "pages_blocks_cta_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_background_color_stops_locale_idx" ON "pages_blocks_cta_background_color_stops" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_links_order_idx" ON "pages_blocks_cta_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_links_parent_id_idx" ON "pages_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_links_locale_idx" ON "pages_blocks_cta_links" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_locale_idx" ON "pages_blocks_cta" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_milestones_milestones_order_idx" ON "pages_blocks_milestones_milestones" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_milestones_milestones_parent_id_idx" ON "pages_blocks_milestones_milestones" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_milestones_milestones_locale_idx" ON "pages_blocks_milestones_milestones" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_milestones_background_color_stops_order_idx" ON "pages_blocks_milestones_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_milestones_background_color_stops_parent_id_idx" ON "pages_blocks_milestones_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_milestones_background_color_stops_locale_idx" ON "pages_blocks_milestones_background_color_stops" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_milestones_order_idx" ON "pages_blocks_milestones" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_milestones_parent_id_idx" ON "pages_blocks_milestones" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_milestones_path_idx" ON "pages_blocks_milestones" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_milestones_locale_idx" ON "pages_blocks_milestones" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_clients_background_color_stops_order_idx" ON "pages_blocks_clients_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_clients_background_color_stops_parent_id_idx" ON "pages_blocks_clients_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_clients_background_color_stops_locale_idx" ON "pages_blocks_clients_background_color_stops" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_clients_clients_order_idx" ON "pages_blocks_clients_clients" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_clients_clients_parent_id_idx" ON "pages_blocks_clients_clients" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_clients_clients_locale_idx" ON "pages_blocks_clients_clients" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_clients_order_idx" ON "pages_blocks_clients" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_clients_parent_id_idx" ON "pages_blocks_clients" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_clients_path_idx" ON "pages_blocks_clients" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_clients_locale_idx" ON "pages_blocks_clients" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_features_background_color_stops_order_idx" ON "pages_blocks_features_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_features_background_color_stops_parent_id_idx" ON "pages_blocks_features_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_features_background_color_stops_locale_idx" ON "pages_blocks_features_background_color_stops" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_features_features_order_idx" ON "pages_blocks_features_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_features_features_parent_id_idx" ON "pages_blocks_features_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_features_features_locale_idx" ON "pages_blocks_features_features" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_features_order_idx" ON "pages_blocks_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_features_parent_id_idx" ON "pages_blocks_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_features_path_idx" ON "pages_blocks_features" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_features_locale_idx" ON "pages_blocks_features" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_awards_background_color_stops_order_idx" ON "pages_blocks_awards_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_awards_background_color_stops_parent_id_idx" ON "pages_blocks_awards_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_awards_background_color_stops_locale_idx" ON "pages_blocks_awards_background_color_stops" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_awards_awards_order_idx" ON "pages_blocks_awards_awards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_awards_awards_parent_id_idx" ON "pages_blocks_awards_awards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_awards_awards_locale_idx" ON "pages_blocks_awards_awards" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_awards_order_idx" ON "pages_blocks_awards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_awards_parent_id_idx" ON "pages_blocks_awards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_awards_path_idx" ON "pages_blocks_awards" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_awards_locale_idx" ON "pages_blocks_awards" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_background_color_stops_order_idx" ON "pages_blocks_stats_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_background_color_stops_parent_id_idx" ON "pages_blocks_stats_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_background_color_stops_locale_idx" ON "pages_blocks_stats_background_color_stops" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_stats_order_idx" ON "pages_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_stats_parent_id_idx" ON "pages_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_stats_locale_idx" ON "pages_blocks_stats_stats" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_locale_idx" ON "pages_blocks_stats" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_bento_background_color_stops_order_idx" ON "pages_blocks_bento_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_bento_background_color_stops_parent_id_idx" ON "pages_blocks_bento_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_bento_background_color_stops_locale_idx" ON "pages_blocks_bento_background_color_stops" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_bento_items_background_color_stops_order_idx" ON "pages_blocks_bento_items_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_bento_items_background_color_stops_parent_id_idx" ON "pages_blocks_bento_items_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_bento_items_background_color_stops_locale_idx" ON "pages_blocks_bento_items_background_color_stops" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_bento_items_order_idx" ON "pages_blocks_bento_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_bento_items_parent_id_idx" ON "pages_blocks_bento_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_bento_items_locale_idx" ON "pages_blocks_bento_items" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_bento_order_idx" ON "pages_blocks_bento" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_bento_parent_id_idx" ON "pages_blocks_bento" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_bento_path_idx" ON "pages_blocks_bento" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_bento_locale_idx" ON "pages_blocks_bento" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonials_background_color_stops_order_idx" ON "pages_blocks_testimonials_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonials_background_color_stops_parent_id_idx" ON "pages_blocks_testimonials_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonials_background_color_stops_locale_idx" ON "pages_blocks_testimonials_background_color_stops" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonials_testimonials_order_idx" ON "pages_blocks_testimonials_testimonials" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonials_testimonials_parent_id_idx" ON "pages_blocks_testimonials_testimonials" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonials_testimonials_locale_idx" ON "pages_blocks_testimonials_testimonials" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonials_locale_idx" ON "pages_blocks_testimonials" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_background_color_stops_order_idx" ON "pages_blocks_faq_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_background_color_stops_parent_id_idx" ON "pages_blocks_faq_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_background_color_stops_locale_idx" ON "pages_blocks_faq_background_color_stops" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_faqs_order_idx" ON "pages_blocks_faq_faqs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_faqs_parent_id_idx" ON "pages_blocks_faq_faqs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_faqs_locale_idx" ON "pages_blocks_faq_faqs" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_locale_idx" ON "pages_blocks_faq" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_related_posts_background_color_stops_order_idx" ON "pages_blocks_related_posts_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_related_posts_background_color_stops_parent_id_idx" ON "pages_blocks_related_posts_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_related_posts_background_color_stops_locale_idx" ON "pages_blocks_related_posts_background_color_stops" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_related_posts_order_idx" ON "pages_blocks_related_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_related_posts_parent_id_idx" ON "pages_blocks_related_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_related_posts_path_idx" ON "pages_blocks_related_posts" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_related_posts_locale_idx" ON "pages_blocks_related_posts" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_background_color_stops_order_idx" ON "pages_blocks_form_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_background_color_stops_parent_id_idx" ON "pages_blocks_form_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_background_color_stops_locale_idx" ON "pages_blocks_form_background_color_stops" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_order_idx" ON "pages_blocks_form" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_parent_id_idx" ON "pages_blocks_form" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_path_idx" ON "pages_blocks_form" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_locale_idx" ON "pages_blocks_form" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_background_color_stops_order_idx" ON "pages_blocks_brand_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_background_color_stops_parent_id_idx" ON "pages_blocks_brand_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_background_color_stops_locale_idx" ON "pages_blocks_brand_background_color_stops" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_logos_order_idx" ON "pages_blocks_brand_logos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_logos_parent_id_idx" ON "pages_blocks_brand_logos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_logos_locale_idx" ON "pages_blocks_brand_logos" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_colors_order_idx" ON "pages_blocks_brand_colors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_colors_parent_id_idx" ON "pages_blocks_brand_colors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_colors_locale_idx" ON "pages_blocks_brand_colors" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_order_idx" ON "pages_blocks_brand" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_parent_id_idx" ON "pages_blocks_brand" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_path_idx" ON "pages_blocks_brand" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_locale_idx" ON "pages_blocks_brand" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_breadcrumbs_order_idx" ON "pages_breadcrumbs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_breadcrumbs_parent_id_idx" ON "pages_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_breadcrumbs_locale_idx" ON "pages_breadcrumbs" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "pages_slug_idx" ON "pages_locales" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "pages_rels_locale_idx" ON "pages_rels" USING btree ("locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_badges_order_idx" ON "_pages_v_version_hero_badges" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_badges_parent_id_idx" ON "_pages_v_version_hero_badges" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_badges_locale_idx" ON "_pages_v_version_hero_badges" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_links_order_idx" ON "_pages_v_version_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_links_parent_id_idx" ON "_pages_v_version_hero_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_links_locale_idx" ON "_pages_v_version_hero_links" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_text_background_color_stops_order_idx" ON "_pages_v_blocks_text_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_text_background_color_stops_parent_id_idx" ON "_pages_v_blocks_text_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_text_background_color_stops_locale_idx" ON "_pages_v_blocks_text_background_color_stops" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_text_order_idx" ON "_pages_v_blocks_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_text_parent_id_idx" ON "_pages_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_text_path_idx" ON "_pages_v_blocks_text" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_text_locale_idx" ON "_pages_v_blocks_text" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_background_color_stops_order_idx" ON "_pages_v_blocks_cta_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_background_color_stops_parent_id_idx" ON "_pages_v_blocks_cta_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_background_color_stops_locale_idx" ON "_pages_v_blocks_cta_background_color_stops" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_links_order_idx" ON "_pages_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_links_parent_id_idx" ON "_pages_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_links_locale_idx" ON "_pages_v_blocks_cta_links" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_locale_idx" ON "_pages_v_blocks_cta" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_milestones_milestones_order_idx" ON "_pages_v_blocks_milestones_milestones" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_milestones_milestones_parent_id_idx" ON "_pages_v_blocks_milestones_milestones" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_milestones_milestones_locale_idx" ON "_pages_v_blocks_milestones_milestones" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_milestones_background_color_stops_order_idx" ON "_pages_v_blocks_milestones_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_milestones_background_color_stops_parent_id_idx" ON "_pages_v_blocks_milestones_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_milestones_background_color_stops_locale_idx" ON "_pages_v_blocks_milestones_background_color_stops" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_milestones_order_idx" ON "_pages_v_blocks_milestones" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_milestones_parent_id_idx" ON "_pages_v_blocks_milestones" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_milestones_path_idx" ON "_pages_v_blocks_milestones" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_milestones_locale_idx" ON "_pages_v_blocks_milestones" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_clients_background_color_stops_order_idx" ON "_pages_v_blocks_clients_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_clients_background_color_stops_parent_id_idx" ON "_pages_v_blocks_clients_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_clients_background_color_stops_locale_idx" ON "_pages_v_blocks_clients_background_color_stops" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_clients_clients_order_idx" ON "_pages_v_blocks_clients_clients" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_clients_clients_parent_id_idx" ON "_pages_v_blocks_clients_clients" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_clients_clients_locale_idx" ON "_pages_v_blocks_clients_clients" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_clients_order_idx" ON "_pages_v_blocks_clients" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_clients_parent_id_idx" ON "_pages_v_blocks_clients" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_clients_path_idx" ON "_pages_v_blocks_clients" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_clients_locale_idx" ON "_pages_v_blocks_clients" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_features_background_color_stops_order_idx" ON "_pages_v_blocks_features_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_features_background_color_stops_parent_id_idx" ON "_pages_v_blocks_features_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_features_background_color_stops_locale_idx" ON "_pages_v_blocks_features_background_color_stops" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_features_features_order_idx" ON "_pages_v_blocks_features_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_features_features_parent_id_idx" ON "_pages_v_blocks_features_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_features_features_locale_idx" ON "_pages_v_blocks_features_features" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_features_order_idx" ON "_pages_v_blocks_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_features_parent_id_idx" ON "_pages_v_blocks_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_features_path_idx" ON "_pages_v_blocks_features" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_features_locale_idx" ON "_pages_v_blocks_features" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_awards_background_color_stops_order_idx" ON "_pages_v_blocks_awards_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_awards_background_color_stops_parent_id_idx" ON "_pages_v_blocks_awards_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_awards_background_color_stops_locale_idx" ON "_pages_v_blocks_awards_background_color_stops" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_awards_awards_order_idx" ON "_pages_v_blocks_awards_awards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_awards_awards_parent_id_idx" ON "_pages_v_blocks_awards_awards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_awards_awards_locale_idx" ON "_pages_v_blocks_awards_awards" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_awards_order_idx" ON "_pages_v_blocks_awards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_awards_parent_id_idx" ON "_pages_v_blocks_awards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_awards_path_idx" ON "_pages_v_blocks_awards" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_awards_locale_idx" ON "_pages_v_blocks_awards" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_stats_background_color_stops_order_idx" ON "_pages_v_blocks_stats_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_stats_background_color_stops_parent_id_idx" ON "_pages_v_blocks_stats_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_stats_background_color_stops_locale_idx" ON "_pages_v_blocks_stats_background_color_stops" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_stats_stats_order_idx" ON "_pages_v_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_stats_stats_parent_id_idx" ON "_pages_v_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_stats_stats_locale_idx" ON "_pages_v_blocks_stats_stats" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_stats_order_idx" ON "_pages_v_blocks_stats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_stats_parent_id_idx" ON "_pages_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_stats_path_idx" ON "_pages_v_blocks_stats" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_stats_locale_idx" ON "_pages_v_blocks_stats" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_bento_background_color_stops_order_idx" ON "_pages_v_blocks_bento_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_bento_background_color_stops_parent_id_idx" ON "_pages_v_blocks_bento_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_bento_background_color_stops_locale_idx" ON "_pages_v_blocks_bento_background_color_stops" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_bento_items_background_color_stops_order_idx" ON "_pages_v_blocks_bento_items_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_bento_items_background_color_stops_parent_id_idx" ON "_pages_v_blocks_bento_items_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_bento_items_background_color_stops_locale_idx" ON "_pages_v_blocks_bento_items_background_color_stops" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_bento_items_order_idx" ON "_pages_v_blocks_bento_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_bento_items_parent_id_idx" ON "_pages_v_blocks_bento_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_bento_items_locale_idx" ON "_pages_v_blocks_bento_items" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_bento_order_idx" ON "_pages_v_blocks_bento" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_bento_parent_id_idx" ON "_pages_v_blocks_bento" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_bento_path_idx" ON "_pages_v_blocks_bento" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_bento_locale_idx" ON "_pages_v_blocks_bento" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_testimonials_background_color_stops_order_idx" ON "_pages_v_blocks_testimonials_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_testimonials_background_color_stops_parent_id_idx" ON "_pages_v_blocks_testimonials_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_testimonials_background_color_stops_locale_idx" ON "_pages_v_blocks_testimonials_background_color_stops" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_testimonials_testimonials_order_idx" ON "_pages_v_blocks_testimonials_testimonials" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_testimonials_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials_testimonials" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_testimonials_testimonials_locale_idx" ON "_pages_v_blocks_testimonials_testimonials" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_testimonials_locale_idx" ON "_pages_v_blocks_testimonials" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_background_color_stops_order_idx" ON "_pages_v_blocks_faq_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_background_color_stops_parent_id_idx" ON "_pages_v_blocks_faq_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_background_color_stops_locale_idx" ON "_pages_v_blocks_faq_background_color_stops" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_faqs_order_idx" ON "_pages_v_blocks_faq_faqs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_faqs_parent_id_idx" ON "_pages_v_blocks_faq_faqs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_faqs_locale_idx" ON "_pages_v_blocks_faq_faqs" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_locale_idx" ON "_pages_v_blocks_faq" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_related_posts_background_color_stops_order_idx" ON "_pages_v_blocks_related_posts_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_related_posts_background_color_stops_parent_id_idx" ON "_pages_v_blocks_related_posts_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_related_posts_background_color_stops_locale_idx" ON "_pages_v_blocks_related_posts_background_color_stops" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_related_posts_order_idx" ON "_pages_v_blocks_related_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_related_posts_parent_id_idx" ON "_pages_v_blocks_related_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_related_posts_path_idx" ON "_pages_v_blocks_related_posts" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_related_posts_locale_idx" ON "_pages_v_blocks_related_posts" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_background_color_stops_order_idx" ON "_pages_v_blocks_form_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_background_color_stops_parent_id_idx" ON "_pages_v_blocks_form_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_background_color_stops_locale_idx" ON "_pages_v_blocks_form_background_color_stops" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_order_idx" ON "_pages_v_blocks_form" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_parent_id_idx" ON "_pages_v_blocks_form" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_path_idx" ON "_pages_v_blocks_form" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_locale_idx" ON "_pages_v_blocks_form" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_brand_background_color_stops_order_idx" ON "_pages_v_blocks_brand_background_color_stops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_brand_background_color_stops_parent_id_idx" ON "_pages_v_blocks_brand_background_color_stops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_brand_background_color_stops_locale_idx" ON "_pages_v_blocks_brand_background_color_stops" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_brand_logos_order_idx" ON "_pages_v_blocks_brand_logos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_brand_logos_parent_id_idx" ON "_pages_v_blocks_brand_logos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_brand_logos_locale_idx" ON "_pages_v_blocks_brand_logos" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_brand_colors_order_idx" ON "_pages_v_blocks_brand_colors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_brand_colors_parent_id_idx" ON "_pages_v_blocks_brand_colors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_brand_colors_locale_idx" ON "_pages_v_blocks_brand_colors" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_brand_order_idx" ON "_pages_v_blocks_brand" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_brand_parent_id_idx" ON "_pages_v_blocks_brand" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_brand_path_idx" ON "_pages_v_blocks_brand" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_brand_locale_idx" ON "_pages_v_blocks_brand" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_breadcrumbs_order_idx" ON "_pages_v_version_breadcrumbs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_breadcrumbs_parent_id_idx" ON "_pages_v_version_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_breadcrumbs_locale_idx" ON "_pages_v_version_breadcrumbs" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_slug_idx" ON "_pages_v_locales" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_locale_idx" ON "_pages_v_rels" USING btree ("locale");
  CREATE INDEX IF NOT EXISTS "posts_populated_authors_order_idx" ON "posts_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_populated_authors_parent_id_idx" ON "posts_populated_authors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "posts_slug_idx" ON "posts_locales" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_populated_authors_order_idx" ON "_posts_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_populated_authors_parent_id_idx" ON "_posts_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_slug_idx" ON "_posts_v_locales" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "categories_slug_idx" ON "categories_locales" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "users_policies_order_idx" ON "users_policies" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "users_policies_parent_idx" ON "users_policies" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX IF NOT EXISTS "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "header_nav_items_link_sublinks_order_idx" ON "header_nav_items_link_sublinks" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_nav_items_link_sublinks_parent_id_idx" ON "header_nav_items_link_sublinks" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "footer_groups_group_items_order_idx" ON "footer_groups_group_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_groups_group_items_parent_id_idx" ON "footer_groups_group_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_groups_order_idx" ON "footer_groups" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_groups_parent_id_idx" ON "footer_groups" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "company_socials_order_idx" ON "company_socials" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "company_socials_parent_id_idx" ON "company_socials" USING btree ("_parent_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "pages_hero_badges";
  DROP TABLE "pages_hero_links";
  DROP TABLE "pages_blocks_text_background_color_stops";
  DROP TABLE "pages_blocks_text";
  DROP TABLE "pages_blocks_cta_background_color_stops";
  DROP TABLE "pages_blocks_cta_links";
  DROP TABLE "pages_blocks_cta";
  DROP TABLE "pages_blocks_milestones_milestones";
  DROP TABLE "pages_blocks_milestones_background_color_stops";
  DROP TABLE "pages_blocks_milestones";
  DROP TABLE "pages_blocks_clients_background_color_stops";
  DROP TABLE "pages_blocks_clients_clients";
  DROP TABLE "pages_blocks_clients";
  DROP TABLE "pages_blocks_features_background_color_stops";
  DROP TABLE "pages_blocks_features_features";
  DROP TABLE "pages_blocks_features";
  DROP TABLE "pages_blocks_awards_background_color_stops";
  DROP TABLE "pages_blocks_awards_awards";
  DROP TABLE "pages_blocks_awards";
  DROP TABLE "pages_blocks_stats_background_color_stops";
  DROP TABLE "pages_blocks_stats_stats";
  DROP TABLE "pages_blocks_stats";
  DROP TABLE "pages_blocks_bento_background_color_stops";
  DROP TABLE "pages_blocks_bento_items_background_color_stops";
  DROP TABLE "pages_blocks_bento_items";
  DROP TABLE "pages_blocks_bento";
  DROP TABLE "pages_blocks_testimonials_background_color_stops";
  DROP TABLE "pages_blocks_testimonials_testimonials";
  DROP TABLE "pages_blocks_testimonials";
  DROP TABLE "pages_blocks_faq_background_color_stops";
  DROP TABLE "pages_blocks_faq_faqs";
  DROP TABLE "pages_blocks_faq";
  DROP TABLE "pages_blocks_related_posts_background_color_stops";
  DROP TABLE "pages_blocks_related_posts";
  DROP TABLE "pages_blocks_form_background_color_stops";
  DROP TABLE "pages_blocks_form";
  DROP TABLE "pages_blocks_brand_background_color_stops";
  DROP TABLE "pages_blocks_brand_logos";
  DROP TABLE "pages_blocks_brand_colors";
  DROP TABLE "pages_blocks_brand";
  DROP TABLE "pages_breadcrumbs";
  DROP TABLE "pages";
  DROP TABLE "pages_locales";
  DROP TABLE "pages_rels";
  DROP TABLE "_pages_v_version_hero_badges";
  DROP TABLE "_pages_v_version_hero_links";
  DROP TABLE "_pages_v_blocks_text_background_color_stops";
  DROP TABLE "_pages_v_blocks_text";
  DROP TABLE "_pages_v_blocks_cta_background_color_stops";
  DROP TABLE "_pages_v_blocks_cta_links";
  DROP TABLE "_pages_v_blocks_cta";
  DROP TABLE "_pages_v_blocks_milestones_milestones";
  DROP TABLE "_pages_v_blocks_milestones_background_color_stops";
  DROP TABLE "_pages_v_blocks_milestones";
  DROP TABLE "_pages_v_blocks_clients_background_color_stops";
  DROP TABLE "_pages_v_blocks_clients_clients";
  DROP TABLE "_pages_v_blocks_clients";
  DROP TABLE "_pages_v_blocks_features_background_color_stops";
  DROP TABLE "_pages_v_blocks_features_features";
  DROP TABLE "_pages_v_blocks_features";
  DROP TABLE "_pages_v_blocks_awards_background_color_stops";
  DROP TABLE "_pages_v_blocks_awards_awards";
  DROP TABLE "_pages_v_blocks_awards";
  DROP TABLE "_pages_v_blocks_stats_background_color_stops";
  DROP TABLE "_pages_v_blocks_stats_stats";
  DROP TABLE "_pages_v_blocks_stats";
  DROP TABLE "_pages_v_blocks_bento_background_color_stops";
  DROP TABLE "_pages_v_blocks_bento_items_background_color_stops";
  DROP TABLE "_pages_v_blocks_bento_items";
  DROP TABLE "_pages_v_blocks_bento";
  DROP TABLE "_pages_v_blocks_testimonials_background_color_stops";
  DROP TABLE "_pages_v_blocks_testimonials_testimonials";
  DROP TABLE "_pages_v_blocks_testimonials";
  DROP TABLE "_pages_v_blocks_faq_background_color_stops";
  DROP TABLE "_pages_v_blocks_faq_faqs";
  DROP TABLE "_pages_v_blocks_faq";
  DROP TABLE "_pages_v_blocks_related_posts_background_color_stops";
  DROP TABLE "_pages_v_blocks_related_posts";
  DROP TABLE "_pages_v_blocks_form_background_color_stops";
  DROP TABLE "_pages_v_blocks_form";
  DROP TABLE "_pages_v_blocks_brand_background_color_stops";
  DROP TABLE "_pages_v_blocks_brand_logos";
  DROP TABLE "_pages_v_blocks_brand_colors";
  DROP TABLE "_pages_v_blocks_brand";
  DROP TABLE "_pages_v_version_breadcrumbs";
  DROP TABLE "_pages_v";
  DROP TABLE "_pages_v_locales";
  DROP TABLE "_pages_v_rels";
  DROP TABLE "posts_populated_authors";
  DROP TABLE "posts";
  DROP TABLE "posts_locales";
  DROP TABLE "posts_rels";
  DROP TABLE "_posts_v_version_populated_authors";
  DROP TABLE "_posts_v";
  DROP TABLE "_posts_v_locales";
  DROP TABLE "_posts_v_rels";
  DROP TABLE "categories";
  DROP TABLE "categories_locales";
  DROP TABLE "media";
  DROP TABLE "media_locales";
  DROP TABLE "users_policies";
  DROP TABLE "users";
  DROP TABLE "redirects";
  DROP TABLE "redirects_rels";
  DROP TABLE "forms_blocks_checkbox";
  DROP TABLE "forms_blocks_checkbox_locales";
  DROP TABLE "forms_blocks_country";
  DROP TABLE "forms_blocks_country_locales";
  DROP TABLE "forms_blocks_email";
  DROP TABLE "forms_blocks_email_locales";
  DROP TABLE "forms_blocks_message";
  DROP TABLE "forms_blocks_message_locales";
  DROP TABLE "forms_blocks_number";
  DROP TABLE "forms_blocks_number_locales";
  DROP TABLE "forms_blocks_select_options";
  DROP TABLE "forms_blocks_select_options_locales";
  DROP TABLE "forms_blocks_select";
  DROP TABLE "forms_blocks_select_locales";
  DROP TABLE "forms_blocks_state";
  DROP TABLE "forms_blocks_state_locales";
  DROP TABLE "forms_blocks_text";
  DROP TABLE "forms_blocks_text_locales";
  DROP TABLE "forms_blocks_textarea";
  DROP TABLE "forms_blocks_textarea_locales";
  DROP TABLE "forms_emails";
  DROP TABLE "forms_emails_locales";
  DROP TABLE "forms";
  DROP TABLE "forms_locales";
  DROP TABLE "form_submissions_submission_data";
  DROP TABLE "form_submissions";
  DROP TABLE "payload_preferences";
  DROP TABLE "payload_preferences_rels";
  DROP TABLE "payload_migrations";
  DROP TABLE "header_nav_items_link_sublinks";
  DROP TABLE "header_nav_items_link_sublinks_locales";
  DROP TABLE "header_nav_items";
  DROP TABLE "header_nav_items_locales";
  DROP TABLE "header";
  DROP TABLE "header_rels";
  DROP TABLE "footer_groups_group_items";
  DROP TABLE "footer_groups_group_items_locales";
  DROP TABLE "footer_groups";
  DROP TABLE "footer_groups_locales";
  DROP TABLE "footer";
  DROP TABLE "footer_rels";
  DROP TABLE "company_socials";
  DROP TABLE "company";`)
}
