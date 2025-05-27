import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_hero_badges" ADD COLUMN "link_attachment_id" uuid;
  ALTER TABLE "pages_hero_links" ADD COLUMN "link_attachment_id" uuid;
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "link_attachment_id" uuid;
  ALTER TABLE "pages_blocks_clients_clients" ADD COLUMN "link_attachment_id" uuid;
  ALTER TABLE "pages_blocks_awards_awards" ADD COLUMN "link_attachment_id" uuid;
  ALTER TABLE "pages_blocks_grid_rows_items" ADD COLUMN "link_attachment_id" uuid;
  ALTER TABLE "pages_blocks_bento_items" ADD COLUMN "link_attachment_id" uuid;
  ALTER TABLE "pages_blocks_tstm_items" ADD COLUMN "link_attachment_id" uuid;
  ALTER TABLE "_pages_v_version_hero_badges" ADD COLUMN "link_attachment_id" uuid;
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN "link_attachment_id" uuid;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "link_attachment_id" uuid;
  ALTER TABLE "_pages_v_blocks_clients_clients" ADD COLUMN "link_attachment_id" uuid;
  ALTER TABLE "_pages_v_blocks_awards_awards" ADD COLUMN "link_attachment_id" uuid;
  ALTER TABLE "_pages_v_blocks_grid_rows_items" ADD COLUMN "link_attachment_id" uuid;
  ALTER TABLE "_pages_v_blocks_bento_items" ADD COLUMN "link_attachment_id" uuid;
  ALTER TABLE "_pages_v_blocks_tstm_items" ADD COLUMN "link_attachment_id" uuid;
  ALTER TABLE "header_nav_items_link_sublinks" ADD COLUMN "link_attachment_id" uuid;
  ALTER TABLE "header_nav_items" ADD COLUMN "link_attachment_id" uuid;
  ALTER TABLE "footer_groups_group_items" ADD COLUMN "link_attachment_id" uuid;
  ALTER TABLE "footer_legal_links" ADD COLUMN "link_attachment_id" uuid;
  DO $$ BEGIN
   ALTER TABLE "pages_hero_badges" ADD CONSTRAINT "pages_hero_badges_link_attachment_id_media_id_fk" FOREIGN KEY ("link_attachment_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_hero_links" ADD CONSTRAINT "pages_hero_links_link_attachment_id_media_id_fk" FOREIGN KEY ("link_attachment_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_link_attachment_id_media_id_fk" FOREIGN KEY ("link_attachment_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_clients_clients" ADD CONSTRAINT "pages_blocks_clients_clients_link_attachment_id_media_id_fk" FOREIGN KEY ("link_attachment_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_awards_awards" ADD CONSTRAINT "pages_blocks_awards_awards_link_attachment_id_media_id_fk" FOREIGN KEY ("link_attachment_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_grid_rows_items" ADD CONSTRAINT "pages_blocks_grid_rows_items_link_attachment_id_media_id_fk" FOREIGN KEY ("link_attachment_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_bento_items" ADD CONSTRAINT "pages_blocks_bento_items_link_attachment_id_media_id_fk" FOREIGN KEY ("link_attachment_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_tstm_items" ADD CONSTRAINT "pages_blocks_tstm_items_link_attachment_id_media_id_fk" FOREIGN KEY ("link_attachment_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_badges" ADD CONSTRAINT "_pages_v_version_hero_badges_link_attachment_id_media_id_fk" FOREIGN KEY ("link_attachment_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links_link_attachment_id_media_id_fk" FOREIGN KEY ("link_attachment_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta_links" ADD CONSTRAINT "_pages_v_blocks_cta_links_link_attachment_id_media_id_fk" FOREIGN KEY ("link_attachment_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_clients_clients" ADD CONSTRAINT "_pages_v_blocks_clients_clients_link_attachment_id_media_id_fk" FOREIGN KEY ("link_attachment_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_awards_awards" ADD CONSTRAINT "_pages_v_blocks_awards_awards_link_attachment_id_media_id_fk" FOREIGN KEY ("link_attachment_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_grid_rows_items" ADD CONSTRAINT "_pages_v_blocks_grid_rows_items_link_attachment_id_media_id_fk" FOREIGN KEY ("link_attachment_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_bento_items" ADD CONSTRAINT "_pages_v_blocks_bento_items_link_attachment_id_media_id_fk" FOREIGN KEY ("link_attachment_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_tstm_items" ADD CONSTRAINT "_pages_v_blocks_tstm_items_link_attachment_id_media_id_fk" FOREIGN KEY ("link_attachment_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_nav_items_link_sublinks" ADD CONSTRAINT "header_nav_items_link_sublinks_link_attachment_id_media_id_fk" FOREIGN KEY ("link_attachment_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_link_attachment_id_media_id_fk" FOREIGN KEY ("link_attachment_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_groups_group_items" ADD CONSTRAINT "footer_groups_group_items_link_attachment_id_media_id_fk" FOREIGN KEY ("link_attachment_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_link_attachment_id_media_id_fk" FOREIGN KEY ("link_attachment_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_hero_badges_link_link_attachment_idx" ON "pages_hero_badges" USING btree ("link_attachment_id");
  CREATE INDEX IF NOT EXISTS "pages_hero_links_link_link_attachment_idx" ON "pages_hero_links" USING btree ("link_attachment_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_links_link_link_attachment_idx" ON "pages_blocks_cta_links" USING btree ("link_attachment_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_clients_clients_link_link_attachment_idx" ON "pages_blocks_clients_clients" USING btree ("link_attachment_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_awards_awards_link_link_attachment_idx" ON "pages_blocks_awards_awards" USING btree ("link_attachment_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_grid_rows_items_link_link_attachment_idx" ON "pages_blocks_grid_rows_items" USING btree ("link_attachment_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_bento_items_link_link_attachment_idx" ON "pages_blocks_bento_items" USING btree ("link_attachment_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_tstm_items_link_link_attachment_idx" ON "pages_blocks_tstm_items" USING btree ("link_attachment_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_badges_link_link_attachment_idx" ON "_pages_v_version_hero_badges" USING btree ("link_attachment_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_links_link_link_attachment_idx" ON "_pages_v_version_hero_links" USING btree ("link_attachment_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_links_link_link_attachment_idx" ON "_pages_v_blocks_cta_links" USING btree ("link_attachment_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_clients_clients_link_link_attachment_idx" ON "_pages_v_blocks_clients_clients" USING btree ("link_attachment_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_awards_awards_link_link_attachment_idx" ON "_pages_v_blocks_awards_awards" USING btree ("link_attachment_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_grid_rows_items_link_link_attachment_idx" ON "_pages_v_blocks_grid_rows_items" USING btree ("link_attachment_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_bento_items_link_link_attachment_idx" ON "_pages_v_blocks_bento_items" USING btree ("link_attachment_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_tstm_items_link_link_attachment_idx" ON "_pages_v_blocks_tstm_items" USING btree ("link_attachment_id");
  CREATE INDEX IF NOT EXISTS "header_nav_items_link_sublinks_link_link_attachment_idx" ON "header_nav_items_link_sublinks" USING btree ("link_attachment_id");
  CREATE INDEX IF NOT EXISTS "header_nav_items_link_link_attachment_idx" ON "header_nav_items" USING btree ("link_attachment_id");
  CREATE INDEX IF NOT EXISTS "footer_groups_group_items_link_link_attachment_idx" ON "footer_groups_group_items" USING btree ("link_attachment_id");
  CREATE INDEX IF NOT EXISTS "footer_legal_links_link_link_attachment_idx" ON "footer_legal_links" USING btree ("link_attachment_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_hero_badges" DROP CONSTRAINT "pages_hero_badges_link_attachment_id_media_id_fk";
  
  ALTER TABLE "pages_hero_links" DROP CONSTRAINT "pages_hero_links_link_attachment_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_cta_links" DROP CONSTRAINT "pages_blocks_cta_links_link_attachment_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_clients_clients" DROP CONSTRAINT "pages_blocks_clients_clients_link_attachment_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_awards_awards" DROP CONSTRAINT "pages_blocks_awards_awards_link_attachment_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_grid_rows_items" DROP CONSTRAINT "pages_blocks_grid_rows_items_link_attachment_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_bento_items" DROP CONSTRAINT "pages_blocks_bento_items_link_attachment_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_tstm_items" DROP CONSTRAINT "pages_blocks_tstm_items_link_attachment_id_media_id_fk";
  
  ALTER TABLE "_pages_v_version_hero_badges" DROP CONSTRAINT "_pages_v_version_hero_badges_link_attachment_id_media_id_fk";
  
  ALTER TABLE "_pages_v_version_hero_links" DROP CONSTRAINT "_pages_v_version_hero_links_link_attachment_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_cta_links" DROP CONSTRAINT "_pages_v_blocks_cta_links_link_attachment_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_clients_clients" DROP CONSTRAINT "_pages_v_blocks_clients_clients_link_attachment_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_awards_awards" DROP CONSTRAINT "_pages_v_blocks_awards_awards_link_attachment_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_grid_rows_items" DROP CONSTRAINT "_pages_v_blocks_grid_rows_items_link_attachment_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_bento_items" DROP CONSTRAINT "_pages_v_blocks_bento_items_link_attachment_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_tstm_items" DROP CONSTRAINT "_pages_v_blocks_tstm_items_link_attachment_id_media_id_fk";
  
  ALTER TABLE "header_nav_items_link_sublinks" DROP CONSTRAINT "header_nav_items_link_sublinks_link_attachment_id_media_id_fk";
  
  ALTER TABLE "header_nav_items" DROP CONSTRAINT "header_nav_items_link_attachment_id_media_id_fk";
  
  ALTER TABLE "footer_groups_group_items" DROP CONSTRAINT "footer_groups_group_items_link_attachment_id_media_id_fk";
  
  ALTER TABLE "footer_legal_links" DROP CONSTRAINT "footer_legal_links_link_attachment_id_media_id_fk";
  
  DROP INDEX IF EXISTS "pages_hero_badges_link_link_attachment_idx";
  DROP INDEX IF EXISTS "pages_hero_links_link_link_attachment_idx";
  DROP INDEX IF EXISTS "pages_blocks_cta_links_link_link_attachment_idx";
  DROP INDEX IF EXISTS "pages_blocks_clients_clients_link_link_attachment_idx";
  DROP INDEX IF EXISTS "pages_blocks_awards_awards_link_link_attachment_idx";
  DROP INDEX IF EXISTS "pages_blocks_grid_rows_items_link_link_attachment_idx";
  DROP INDEX IF EXISTS "pages_blocks_bento_items_link_link_attachment_idx";
  DROP INDEX IF EXISTS "pages_blocks_tstm_items_link_link_attachment_idx";
  DROP INDEX IF EXISTS "_pages_v_version_hero_badges_link_link_attachment_idx";
  DROP INDEX IF EXISTS "_pages_v_version_hero_links_link_link_attachment_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_cta_links_link_link_attachment_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_clients_clients_link_link_attachment_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_awards_awards_link_link_attachment_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_grid_rows_items_link_link_attachment_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_bento_items_link_link_attachment_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_tstm_items_link_link_attachment_idx";
  DROP INDEX IF EXISTS "header_nav_items_link_sublinks_link_link_attachment_idx";
  DROP INDEX IF EXISTS "header_nav_items_link_link_attachment_idx";
  DROP INDEX IF EXISTS "footer_groups_group_items_link_link_attachment_idx";
  DROP INDEX IF EXISTS "footer_legal_links_link_link_attachment_idx";
  ALTER TABLE "pages_hero_badges" DROP COLUMN IF EXISTS "link_attachment_id";
  ALTER TABLE "pages_hero_links" DROP COLUMN IF EXISTS "link_attachment_id";
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN IF EXISTS "link_attachment_id";
  ALTER TABLE "pages_blocks_clients_clients" DROP COLUMN IF EXISTS "link_attachment_id";
  ALTER TABLE "pages_blocks_awards_awards" DROP COLUMN IF EXISTS "link_attachment_id";
  ALTER TABLE "pages_blocks_grid_rows_items" DROP COLUMN IF EXISTS "link_attachment_id";
  ALTER TABLE "pages_blocks_bento_items" DROP COLUMN IF EXISTS "link_attachment_id";
  ALTER TABLE "pages_blocks_tstm_items" DROP COLUMN IF EXISTS "link_attachment_id";
  ALTER TABLE "_pages_v_version_hero_badges" DROP COLUMN IF EXISTS "link_attachment_id";
  ALTER TABLE "_pages_v_version_hero_links" DROP COLUMN IF EXISTS "link_attachment_id";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN IF EXISTS "link_attachment_id";
  ALTER TABLE "_pages_v_blocks_clients_clients" DROP COLUMN IF EXISTS "link_attachment_id";
  ALTER TABLE "_pages_v_blocks_awards_awards" DROP COLUMN IF EXISTS "link_attachment_id";
  ALTER TABLE "_pages_v_blocks_grid_rows_items" DROP COLUMN IF EXISTS "link_attachment_id";
  ALTER TABLE "_pages_v_blocks_bento_items" DROP COLUMN IF EXISTS "link_attachment_id";
  ALTER TABLE "_pages_v_blocks_tstm_items" DROP COLUMN IF EXISTS "link_attachment_id";
  ALTER TABLE "header_nav_items_link_sublinks" DROP COLUMN IF EXISTS "link_attachment_id";
  ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "link_attachment_id";
  ALTER TABLE "footer_groups_group_items" DROP COLUMN IF EXISTS "link_attachment_id";
  ALTER TABLE "footer_legal_links" DROP COLUMN IF EXISTS "link_attachment_id";`)
}
