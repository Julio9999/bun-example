import { pgTable, varchar, timestamp, text, integer, uniqueIndex, foreignKey, serial, boolean, unique } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const prismaMigrations = pgTable("_prisma_migrations", {
	id: varchar({ length: 36 }).primaryKey().notNull(),
	checksum: varchar({ length: 64 }).notNull(),
	finishedAt: timestamp("finished_at", { withTimezone: true, mode: 'string' }),
	migrationName: varchar("migration_name", { length: 255 }).notNull(),
	logs: text(),
	rolledBackAt: timestamp("rolled_back_at", { withTimezone: true, mode: 'string' }),
	startedAt: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

export const status = pgTable("Status", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	disabled: boolean().default(false),
	boardId: integer(),
}, (table) => [
	uniqueIndex("Status_name_key").using("btree", table.name.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.boardId],
			foreignColumns: [board.id],
			name: "Status_boardId_fkey"
		}).onUpdate("cascade").onDelete("set null"),
]);

export const user = pgTable("User", {
	id: serial().primaryKey().notNull(),
	email: text().notNull(),
	name: text().notNull(),
	disabled: boolean().default(false),
	password: text().default('').notNull(),
	boardId: integer(),
}, (table) => [
	uniqueIndex("User_email_key").using("btree", table.email.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.boardId],
			foreignColumns: [board.id],
			name: "User_boardId_fkey"
		}).onUpdate("cascade").onDelete("set null"),
]);

export const migrations = pgTable("migrations", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	executedAt: timestamp("executed_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	unique("migrations_name_key").on(table.name),
]);

export const board = pgTable("Board", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	disabled: boolean().default(false),
}, (table) => [
	unique("unique_name").on(table.name),
]);

export const task = pgTable("Task", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	done: boolean().default(false).notNull(),
	userId: integer(),
	disabled: boolean().default(false),
	statusId: integer().default(1).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "Task_userId_fkey"
		}).onUpdate("cascade").onDelete("set null"),
	foreignKey({
			columns: [table.statusId],
			foreignColumns: [status.id],
			name: "Task_statusId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const demo = pgTable("demo", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
}, (table) => [
	unique("demo_email_key").on(table.email),
]);
