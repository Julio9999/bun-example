import { MiddlewareHandler } from "hono";

export const validateJsonMiddleware: MiddlewareHandler = async (c, next) => {
    const method = c.req.method;

    // Aplica solo para POST y PUT
    if (method === "POST" || method === "PUT") {
        if (c.req.header("Content-Type") !== "application/json") {
            return c.json({ message: "El encabezado Content-Type debe ser 'application/json'" }, 400);
        }

        try {
            // Intenta parsear el cuerpo como JSON
            await c.req.json();
        } catch {
            return c.json({ message: "Cuerpo de la solicitud inválido o no enviado. Asegúrate de enviar un JSON válido." }, 400);
        }
    }

    // Si no es POST o PUT, o si todo es válido, continúa con el flujo normal
    await next();
};
