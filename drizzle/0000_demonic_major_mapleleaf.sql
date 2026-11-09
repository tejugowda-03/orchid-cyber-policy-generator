CREATE TABLE `policy_generation` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`organization_name` text NOT NULL,
	`industry` text NOT NULL,
	`compliance_frameworks` text NOT NULL,
	`security_level` text NOT NULL,
	`employee_count` text NOT NULL,
	`data_types` text NOT NULL,
	`existing_policies` integer NOT NULL,
	`specific_requirements` text,
	`generated_policy` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `policy_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`policy_id` integer NOT NULL,
	`action` text NOT NULL,
	`modified_content` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`policy_id`) REFERENCES `policy_generation`(`id`) ON UPDATE no action ON DELETE no action
);
