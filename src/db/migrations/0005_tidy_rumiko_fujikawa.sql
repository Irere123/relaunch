DROP INDEX IF EXISTS "authenticator_credentialID_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "user_email_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "project_name_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "project_slug_unique";--> statement-breakpoint
ALTER TABLE `project` ALTER COLUMN "name" TO "name" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `authenticator_credentialID_unique` ON `authenticator` (`credentialID`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `project_name_unique` ON `project` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `project_slug_unique` ON `project` (`slug`);--> statement-breakpoint
ALTER TABLE `project` ALTER COLUMN "slug" TO "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE `project` ALTER COLUMN "description" TO "description" text NOT NULL;