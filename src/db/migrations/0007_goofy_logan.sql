CREATE TABLE `analytics` (
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
CREATE UNIQUE INDEX `analytics_slug_unique` ON `analytics` (`slug`);