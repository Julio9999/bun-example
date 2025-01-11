import { z } from "zod";

export const LoginDto = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1)
});

export type LoginDtoType = z.infer<typeof LoginDto>;