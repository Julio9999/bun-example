import { z } from "zod";

export const AsignUsersToBoard = z.object({
  userIds: z.array(z.number().min(1, "Each userId must be at least 1")).nonempty("userIds is required"),
  boardId: z.number().min(1, "boardId is required")
});

export type AsignUsersToBoardType = z.infer<typeof AsignUsersToBoard>;
