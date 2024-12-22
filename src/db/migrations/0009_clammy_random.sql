CREATE TABLE `project_review` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text,
	`user_id` text,
	`content` text,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
