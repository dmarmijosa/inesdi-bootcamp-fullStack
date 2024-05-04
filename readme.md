
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
   git clone https://github.com/dmarmijosa/inesdi-bootcamp-fullStack.git
   ```

   Accede al directorio.

2. **Construir la imagen**

   Desde el directorio raíz del proyecto, ejecuta:

   ```bash
   docker-compose build
   ```

   Este comando construirá la imagen de Docker basada en las especificaciones del Dockerfile.

3. **Levantar el Contenedor**

   Para iniciar el contenedor de MongoDB, ejecuta:

   ```bash
   docker-compose up -d
   ```

   Este comando inicia el contenedor en modo desatendido. La base de datos, las colecciones y los documentos se inicializarán automáticamente si es la primera vez que se levanta el contenedor.

4. **Conectar con MongoDB Shell**

   Para conectar a la base de datos utilizando MongoDB Shell, ejecuta:

   ```bash
   docker exec -it mongodb mongosh -u admin -p password
   ```

   Esto abrirá una sesión de shell en la que puedes ejecutar comandos de MongoDB.

5. **Parar y Eliminar el Contenedor**

   Si necesitas detener y eliminar el contenedor, puedes usar:

   ```bash
   docker-compose down
   ```

   Esto detendrá y eliminará el contenedor, pero tus datos permanecerán seguros en el volumen Docker.

## Persistencia de datos

La persistencia de datos está configurada mediante un volumen Docker especificado en el `docker-compose.yml`. Los datos persisten entre reinicios del contenedor, garantizando que no se pierdan tus datos.
