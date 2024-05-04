
# Node MongoDB API de INESDI

Este proyecto consiste en una API desarrollada con Node.js y MongoDB para gestionar una colección de datos de usuarios. Utiliza Docker para facilitar el despliegue y la gestión del entorno de desarrollo y producción.

## Estructura del Proyecto

- `/app`: Contiene el código fuente de la aplicación Node.js.
- `/mongo`: Contiene configuraciones para el contenedor de MongoDB, incluyendo scripts de inicialización.
- `docker-compose.yml`: Define los servicios, redes y volúmenes para Docker.

## Tecnologías Utilizadas

- Node.js
- MongoDB
- Docker
- Express
- Mongoose

## Configuración con Docker

El proyecto utiliza `docker-compose` para orquestar los contenedores de Node.js y MongoDB.

### Dockerfile para Node.js

```dockerfile
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
CMD ["npm", "start"]
```

### Dockerfile para MongoDB

```dockerfile
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
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  nodeapp:
    build:
      context: ./app
    container_name: nodeapp
    ports:
      - "3000:3000"
    depends_on:
      - mongodb
    environment:
      - NODE_ENV=production
      - DB_URL=mongodb://admin:password@mongodb:27017/testdb

  mongodb:
    image: mongo
    container_name: mongodb
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
    ports:
      - "27017:27017"
    volumes:
      - mongodata:/data/db

volumes:
  mongodata:
```

## Instrucciones de Uso

1. **Construir y levantar los servicios:**
   ```bash
   docker-compose up --build
   ```

2. **Acceder a la documentación de la API:**
   Navegar a `http://localhost:3000/api-docs` para ver la documentación de Swagger y probar los endpoints de la API.

3. **Detener y remover los servicios:**
   ```bash
   docker-compose down
   ```

Este setup asegura que puedes trabajar con un entorno completamente aislado y reproducible, ideal para desarrollo y pruebas.
