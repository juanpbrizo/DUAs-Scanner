# Primera etapa: Construir la aplicación
FROM node:20 AS builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Construye la aplicación
RUN npm run build

# Segunda etapa: Configurar Nginx para servir la aplicación estática
FROM nginx:latest

# Copia el archivo de configuración de Nginx
COPY vite.conf /etc/nginx/conf.d/

# Copia los archivos construidos desde la etapa de construcción
COPY --from=builder /app/dist /usr/share/nginx/html

# Expone el puerto 80 para que la aplicación pueda ser accesible
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]