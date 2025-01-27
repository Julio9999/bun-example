# Etapa base: Usar la imagen oficial de Bun
FROM oven/bun:1-alpine AS base
WORKDIR /usr/src/app

# Copiar archivos esenciales para instalación
COPY package.json bun.lock ./

# Instalar dependencias de producción
RUN bun install --frozen-lockfile --production

# Etapa final: Imagen de producción
FROM oven/bun:1-alpine AS production
WORKDIR /usr/src/app

# Copiar dependencias de la etapa base
COPY --from=base /usr/src/app/node_modules ./node_modules

# Copiar solo los archivos necesarios
COPY src ./src
COPY package.json bun.lock ./

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["bun", "run", "src/index.ts"]
