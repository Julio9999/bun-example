import { MiddlewareHandler } from "hono";
import { HTTPException } from "hono/http-exception";

import { ZodSchema } from "zod";

export const validate = (schema: ZodSchema): MiddlewareHandler => {
  return async (c, next) => {
    try {
      const data = await c.req.json();
      schema.parse(data);
      await next();
    } catch (error: any) {
      const details = error.errors[0];
      const errorMessage = `Validation error at path: ${details.path.join(
        "."
      )}. Expected: ${details.expected}, but received: ${
        details.received
      }. Message: ${details.message}`;

      throw new HTTPException(400, { message: errorMessage });
    }
  };
};
