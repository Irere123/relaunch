CREATE TABLE `link` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text,
	`url` text,
	`project_id` text,
	FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `project` ADD `slug` text;--> statement-breakpoint
ALTER TABLE `project` ADD `image` text;--> statement-breakpoint
CREATE UNIQUE INDEX `project_slug_unique` ON `project` (`slug`);--> statement-breakpoint
ALTER TABLE `project` DROP COLUMN `github_repo_url`;--> statement-breakpoint
ALTER TABLE `project` DROP COLUMN `cover_photo_url`;