import { z } from "zod";
export const CreateUserDto = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Contraseña requerida")
});
