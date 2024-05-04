// swaggerOptions.js
module.exports = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Node MongoDB API for INESDI',
        version: '1.0.0',
        description: 'This is a simple CRUD API application made with Express and documented with Swagger',
        contact: {
          name: "INESDI",
          url: "https://www.inesdi.com",
        }
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development Server'
        }
      ],
    },
    apis: ['./routes/*.js'], // paths to files with documentation
  };
  