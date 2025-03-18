FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --ignore-scripts

# Copia solo los archivos relevantes del proyecto, evitando archivos innecesarios
COPY public ./public
COPY src ./src
COPY next.config.js ./
COPY tsconfig.json ./
COPY .env ./

RUN npm run build

# Usa directamente la build generada (sin export!)
FROM nginx:alpine
COPY --from=builder /app/.next/static /usr/share/nginx/html/_next/static
COPY --from=builder /app/.next/standalone /usr/share/nginx/html
COPY --from=builder /app/public /usr/share/nginx/html/public

# Configuración del usuario no-root
USER nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
