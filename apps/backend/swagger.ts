import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import type { Express } from 'express';

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bike Market API',
      version: '1.0.0',
      description: 'API documentation for the Bike Marketplace',
    },
    components: {
      schemas: {
        BikeListing: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            price: { type: 'number' },
            description: { type: 'string' },
          },
          required: ['id', 'title', 'price', 'description'],
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], // Adjust if your routes are elsewhere
});

export function setupSwagger(app : Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
