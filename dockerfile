# Usar una imagen más ligera con Alpine
FROM oven/bun:1-alpine AS base
WORKDIR /usr/src/app

# Instalar dependencias solo para producción
FROM base AS install
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production

# Etapa de construcción: Copiar el código y compilar TypeScript
FROM base AS build
COPY --from=install /usr/src/app/node_modules ./node_modules
COPY . . 
RUN bunx tsc

# Etapa de producción: Solo copiar lo necesario
FROM oven/bun:1-alpine AS production
WORKDIR /usr/src/app

# Copiar dependencias y archivos compilados
COPY --from=install /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

# Ejecutar la aplicación
ENTRYPOINT ["bun", "dist/index.js"]