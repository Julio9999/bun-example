import { zValidator } from "@hono/zod-validator";
export const validateJsonBody = (schema) => {
    return zValidator("json", schema, (result, c) => {
        if (!result.success) {
            const formattedErrors = result.error.issues.map((issue) => ({
                field: issue.path.join('.'),
                message: issue.message,
            }));
            return c.json({
                errors: formattedErrors,
            }, 400);
        }
    });
};
