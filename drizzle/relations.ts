import { relations } from "drizzle-orm/relations";
import { board, status, user, task } from "./schema";

export const statusRelations = relations(status, ({one, many}) => ({
	board: one(board, {
		fields: [status.boardId],
		references: [board.id]
	}),
	tasks: many(task),
}));

export const boardRelations = relations(board, ({many}) => ({
	statuses: many(status),
	users: many(user),
}));

export const userRelations = relations(user, ({one, many}) => ({
	board: one(board, {
		fields: [user.boardId],
		references: [board.id]
	}),
	tasks: many(task),
}));

export const taskRelations = relations(task, ({one}) => ({
	user: one(user, {
		fields: [task.userId],
		references: [user.id]
	}),
	status: one(status, {
		fields: [task.statusId],
		references: [status.id]
	}),
}));