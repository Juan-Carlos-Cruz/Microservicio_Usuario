# Usa la versión LTS de Node.js como base
FROM node:18-alpine AS builder

# Define la carpeta de trabajo
WORKDIR /app

# Copia archivos de dependencias primero (package.json y package-lock.json)
COPY Registro/package.json Registro/package-lock.json ./

# Instala dependencias evitando scripts potencialmente maliciosos
RUN npm install --ignore-scripts

# Copia todo el proyecto
COPY Registro ./

# Construye y exporta la aplicación Next.js
RUN npm run build
RUN npm run export

# Usa Nginx para servir la versión estática generada
FROM nginx:alpine

# Copia los archivos estáticos generados por Next.js
COPY --from=builder /app/out /usr/share/nginx/html

# Usa el usuario no-root 'nginx' predefinido
USER nginx

# Expón el puerto por defecto
EXPOSE 80

# Inicia Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
