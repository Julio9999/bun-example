import { z } from "zod";
export const createStatusDto = z.object({
    name: z.string().min(1, "Name is required")
});
