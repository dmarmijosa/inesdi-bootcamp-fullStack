# Usar la imagen base oficial de Node.js
FROM node:18

# Crear el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar los archivos de configuración de paquetes npm
COPY package*.json ./

# Instalar todas las dependencias
RUN npm install

# Copiar el resto del código fuente de la aplicación
COPY . .

# Exponer el puerto que usa la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "server.js"]
