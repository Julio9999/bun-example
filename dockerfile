# Etapa base: Usar la imagen oficial de Bun
FROM oven/bun:1-alpine AS base
WORKDIR /usr/src/app

# Etapa de instalación: Instalar dependencias
FROM base AS install
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile  # Instalar dependencias

# Etapa de construcción: Generar el cliente de Prisma
FROM base AS build
COPY --from=install /usr/src/app/node_modules ./node_modules
COPY . .
RUN bunx prisma generate  # Generar el cliente de Prisma

# Etapa de producción: Crear la imagen final optimizada
FROM oven/bun:1-alpine AS production
WORKDIR /usr/src/app

# Copiar solo lo necesario para producción
COPY --from=install /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/prisma ./prisma  
COPY --from=build /usr/src/app/node_modules/.prisma ./node_modules/.prisma  
COPY --from=build /usr/src/app/src ./src 
COPY package.json bun.lockb ./

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["bun", "run", "src/index.ts"]
