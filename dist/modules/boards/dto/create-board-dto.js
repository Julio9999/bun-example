import { z } from "zod";
export const CreateBoardDto = z.object({
    name: z.string().min(1, "Name is required"),
});