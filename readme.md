# MongoDB Docker Setup con Persistencia y MongoDB Shell

Este proyecto configura un contenedor Docker para ejecutar una base de datos MongoDB con persistencia de datos y acceso al MongoDB Shell (mongosh). Ideal para desarrollo y pruebas.

## Requisitos Previos

Antes de comenzar, asegúrate de tener Docker instalado en tu sistema. Puedes descargar e instalar Docker desde [Docker Hub](https://www.docker.com/products/docker-desktop).

## Configuración

El proyecto utiliza `docker-compose` para facilitar la configuración y manejo del contenedor de MongoDB. Aquí se detallan los pasos para levantar el contenedor:

### Estructura de Archivos

El proyecto contiene los siguientes archivos:

- `Dockerfile`: Define la imagen de Docker personalizada basada en la imagen oficial de MongoDB.
- `docker-compose.yml`: Configura los servicios necesarios para correr el contenedor de MongoDB.
- `mongo-init.js`: Un script de JavaScript que se ejecuta cuando el contenedor es inicializado por primera vez para crear una base de datos, colecciones e insertar documentos iniciales.
- `README.md`: Este archivo.

### Instrucciones de Uso

1. **Clonar el Repositorio**

   Clona este repositorio en tu máquina local usando:

   ```bash
   git clone [URL-del-repositorio]
   cd [nombre-del-directorio]
