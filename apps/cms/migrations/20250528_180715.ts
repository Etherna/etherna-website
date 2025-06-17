import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "prompts_variants_context" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" varchar DEFAULT 'reference',
  	"attachment_id" uuid,
  	"url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "prompts_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"prompt" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "prompts_variants_context" ADD CONSTRAINT "prompts_variants_context_attachment_id_media_id_fk" FOREIGN KEY ("attachment_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "prompts_variants_context" ADD CONSTRAINT "prompts_variants_context_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prompts_variants"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "prompts_variants" ADD CONSTRAINT "prompts_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prompts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "prompts_variants_context_order_idx" ON "prompts_variants_context" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "prompts_variants_context_parent_id_idx" ON "prompts_variants_context" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "prompts_variants_context_attachment_idx" ON "prompts_variants_context" USING btree ("attachment_id");
  CREATE INDEX IF NOT EXISTS "prompts_variants_order_idx" ON "prompts_variants" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "prompts_variants_parent_id_idx" ON "prompts_variants" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "prompts_variants_context" CASCADE;
  DROP TABLE "prompts_variants" CASCADE;`)
}
