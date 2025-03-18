# Usa la versión LTS de Node.js como base
FROM node:18-alpine AS builder

# Define la carpeta de trabajo
WORKDIR /app

# Copia los archivos de dependencias primero para instalar módulos
COPY Registro/package.json Registro/package-lock.json ./

# Instala dependencias
RUN npm install

# Copia todos los archivos del proyecto
COPY Registro ./

# Construye la aplicación Next.js
RUN npm run build

# Genera una versión estática optimizada
RUN npm run export

# Usa Nginx para servir el contenido estático generado por Next.js
FROM nginx:alpine

# Copia la salida estática generada al servidor de Nginx
COPY --from=builder /app/out /usr/share/nginx/html

# Expón el puerto de Nginx
EXPOSE 80

# Inicia Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
