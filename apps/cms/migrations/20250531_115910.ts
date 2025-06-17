import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_bento_items" ADD COLUMN "media_id" uuid;
  ALTER TABLE "_pages_v_blocks_bento_items" ADD COLUMN "media_id" uuid;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_bento_items" ADD CONSTRAINT "pages_blocks_bento_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_bento_items" ADD CONSTRAINT "_pages_v_blocks_bento_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_bento_items_media_idx" ON "pages_blocks_bento_items" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_bento_items_media_idx" ON "_pages_v_blocks_bento_items" USING btree ("media_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_bento_items" DROP CONSTRAINT "pages_blocks_bento_items_media_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_bento_items" DROP CONSTRAINT "_pages_v_blocks_bento_items_media_id_media_id_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_bento_items_media_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_bento_items_media_idx";
  ALTER TABLE "pages_blocks_bento_items" DROP COLUMN IF EXISTS "media_id";
  ALTER TABLE "_pages_v_blocks_bento_items" DROP COLUMN IF EXISTS "media_id";`)
}
