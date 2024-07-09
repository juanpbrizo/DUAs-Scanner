# Usa la imagen oficial de Nginx como base
FROM node:20

#Crea el directorio /home/app
RUN mkdir -p /home/app

#Establece /home/app como el area de trabajo
WORKDIR /home/app

#Copia los archivos packege.json y package-lock.json
COPY package*.json ./

#Instala todas las dependencias
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]