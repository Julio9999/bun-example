import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { BlankEnv, HTTPResponseError } from "hono/types";

export const errorHandler = (err: Error | HTTPResponseError | any, c: Context<BlankEnv, any, {}>) => {


  if (err instanceof HTTPException) {
    return c.json({ message: err.message }, err.status);
  }

  if(err.code == "P2002"){
    const target = err.meta.target[0];
    const message = `El ${target} ingresado ya está en uso`;
    return c.json({message})
  }
  
  return c.json({ message: 'Algo salió mal' }, 500);
}