# Usa la versión LTS de Node.js como base
FROM node:18-alpine AS builder

# Define la carpeta de trabajo
WORKDIR /app

# Copia primero solo los archivos de dependencias
COPY package.json package-lock.json ./

# Instala dependencias sin scripts adicionales
RUN npm install --ignore-scripts


# Copia solo los archivos relevantes del proyecto, evitando archivos innecesarios
COPY public ./public
COPY src ./src
COPY next.config.js ./
COPY tsconfig.json ./
COPY .env ./

# Construye la aplicación Angular en modo producción
RUN npm run build -- --configuration=production

# Usa Nginx para servir la versión estática generada
FROM nginx:alpine

# Copia los archivos generados por Angular al servidor Nginx
COPY --from=builder /app/dist/ /usr/share/nginx/html

# Usa el usuario no-root 'nginx' predefinido
USER nginx

# Expón el puerto por defecto
EXPOSE 80

# Inicia Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
