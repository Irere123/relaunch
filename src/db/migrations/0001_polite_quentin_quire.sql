CREATE TABLE `project_review` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text,
	`content` text,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `project_team` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text,
	`user_id` text,
	FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `project` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`description` text,
	`github_repo_url` text,
	`logo` text,
	`cover_photo_url` text,
	`tags` text DEFAULT (json_array()) NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `project_name_unique` ON `project` (`name`);--> statement-breakpoint
CREATE TABLE `project_tag` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text
);
