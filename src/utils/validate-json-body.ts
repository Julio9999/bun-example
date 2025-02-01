import { zValidator } from "@hono/zod-validator";
import { ZodSchema } from "zod";

export const validateJsonBody = <T>(schema: ZodSchema<T>) => {
    return zValidator("json", schema, (result, c) => {
      if (!result.success) {
        const formattedErrors = result.error.issues.map((issue: any) => ({
          field: issue.path.join('.'), 
          message: issue.message,
        }));
  
        return c.json(
          {
            errors: formattedErrors,
          },
          400
        );
      }
    });
  };