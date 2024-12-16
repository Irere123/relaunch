ALTER TABLE `analytics` RENAME TO `analytic`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_analytic` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text,
	`flug` text,
	`country` text,
	`city` text,
	`date` text,
	`longitude` text,
	`latitude` text,
	`project_id` text,
	FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_analytic`("id", "slug", "flug", "country", "city", "date", "longitude", "latitude", "project_id") SELECT "id", "slug", "flug", "country", "city", "date", "longitude", "latitude", "project_id" FROM `analytic`;--> statement-breakpoint
DROP TABLE `analytic`;--> statement-breakpoint
ALTER TABLE `__new_analytic` RENAME TO `analytic`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `analytic_slug_unique` ON `analytic` (`slug`);