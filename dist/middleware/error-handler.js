import { HTTPException } from "hono/http-exception";
export const errorHandler = (err, c) => {
    console.log(err);
    if (err instanceof HTTPException) {
        return c.json({ message: err.message }, err.status);
    }
    if (err.code == "P2002") {
        const target = err.meta.target[0];
        const message = `El ${target} ingresado ya está en uso`;
        return c.json({ message });
    }
    return c.json({ message: 'Algo salió mal' }, 500);
};
