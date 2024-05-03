# Usar la imagen oficial de MongoDB
FROM mongo:latest

# Instalar mongo shell
RUN apt-get update && apt-get install -y mongodb-mongosh

# Establecer variables de entorno para la autenticación de Mongo
ENV MONGO_INITDB_ROOT_USERNAME=admin
ENV MONGO_INITDB_ROOT_PASSWORD=password

# Exponer el puerto por defecto de MongoDB
EXPOSE 27017

# Copiar el archivo de inicialización
COPY mongo-init.js /docker-entrypoint-initdb.d/
