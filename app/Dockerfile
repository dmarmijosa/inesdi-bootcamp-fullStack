# Establecer la imagen base para Node.js
FROM node:20

# Crear y establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar el archivo de dependencias primero para aprovechar la caché de Docker
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos del proyecto al contenedor
COPY . .

# Exponer el puerto que utilizará la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "server.js"]
