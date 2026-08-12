CREATE TABLE `rsvps` (
	`id` text PRIMARY KEY NOT NULL,
	`full_name` text NOT NULL,
	`company` text NOT NULL,
	`job_title` text,
	`country_region` text NOT NULL,
	`mobile` text NOT NULL,
	`email` text NOT NULL,
	`attendance_status` text NOT NULL,
	`guest_count` integer DEFAULT 1 NOT NULL,
	`departure_city` text,
	`business_interests` text,
	`dietary_requirements` text,
	`special_assistance` text,
	`consent` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `rsvps_email_idx` ON `rsvps` (`email`);--> statement-breakpoint
CREATE INDEX `rsvps_created_at_idx` ON `rsvps` (`created_at`);