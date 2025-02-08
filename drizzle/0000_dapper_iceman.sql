-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Status" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"disabled" boolean DEFAULT false,
	"boardId" integer
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"disabled" boolean DEFAULT false,
	"password" text DEFAULT '' NOT NULL,
	"boardId" integer
);
--> statement-breakpoint
CREATE TABLE "migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"executed_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "migrations_name_key" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "Board" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"disabled" boolean DEFAULT false,
	CONSTRAINT "unique_name" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "Task" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"done" boolean DEFAULT false NOT NULL,
	"userId" integer,
	"disabled" boolean DEFAULT false,
	"statusId" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "demo" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "demo_email_key" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "Status" ADD CONSTRAINT "Status_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "public"."Board"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "User" ADD CONSTRAINT "User_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "public"."Board"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Task" ADD CONSTRAINT "Task_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "public"."Status"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
CREATE UNIQUE INDEX "Status_name_key" ON "Status" USING btree ("name" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "User_email_key" ON "User" USING btree ("email" text_ops);
*/