import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_hero_badges" ADD COLUMN "link_icon_id" uuid;
  ALTER TABLE "pages_hero_links" ADD COLUMN "link_icon_id" uuid;
  ALTER TABLE "_pages_v_version_hero_badges" ADD COLUMN "link_icon_id" uuid;
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN "link_icon_id" uuid;
  DO $$ BEGIN
   ALTER TABLE "pages_hero_badges" ADD CONSTRAINT "pages_hero_badges_link_icon_id_media_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_hero_links" ADD CONSTRAINT "pages_hero_links_link_icon_id_media_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_badges" ADD CONSTRAINT "_pages_v_version_hero_badges_link_icon_id_media_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links_link_icon_id_media_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_hero_badges_link_link_icon_idx" ON "pages_hero_badges" USING btree ("link_icon_id");
  CREATE INDEX IF NOT EXISTS "pages_hero_links_link_link_icon_idx" ON "pages_hero_links" USING btree ("link_icon_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_badges_link_link_icon_idx" ON "_pages_v_version_hero_badges" USING btree ("link_icon_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_links_link_link_icon_idx" ON "_pages_v_version_hero_links" USING btree ("link_icon_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_hero_badges" DROP CONSTRAINT "pages_hero_badges_link_icon_id_media_id_fk";
  
  ALTER TABLE "pages_hero_links" DROP CONSTRAINT "pages_hero_links_link_icon_id_media_id_fk";
  
  ALTER TABLE "_pages_v_version_hero_badges" DROP CONSTRAINT "_pages_v_version_hero_badges_link_icon_id_media_id_fk";
  
  ALTER TABLE "_pages_v_version_hero_links" DROP CONSTRAINT "_pages_v_version_hero_links_link_icon_id_media_id_fk";
  
  DROP INDEX IF EXISTS "pages_hero_badges_link_link_icon_idx";
  DROP INDEX IF EXISTS "pages_hero_links_link_link_icon_idx";
  DROP INDEX IF EXISTS "_pages_v_version_hero_badges_link_link_icon_idx";
  DROP INDEX IF EXISTS "_pages_v_version_hero_links_link_link_icon_idx";
  ALTER TABLE "pages_hero_badges" DROP COLUMN IF EXISTS "link_icon_id";
  ALTER TABLE "pages_hero_links" DROP COLUMN IF EXISTS "link_icon_id";
  ALTER TABLE "_pages_v_version_hero_badges" DROP COLUMN IF EXISTS "link_icon_id";
  ALTER TABLE "_pages_v_version_hero_links" DROP COLUMN IF EXISTS "link_icon_id";`)
}
