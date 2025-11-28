import swaggerJsdoc from "swagger-jsdoc";
import { SwaggerDefinition } from "swagger-jsdoc";

const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API - PetShop",
    version: "1.0.0",
  },

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },

    schemas: {
      User: {
        type: "object",
        required: ["name", "email", "password", "phone", "confirmpassword"], // <-- ADICIONADO
        properties: {
          name: { type: "string", example: "João Silva" },
          email: { type: "string", example: "joao@gmail.com" },
          password: { type: "string", example: "123" },
          confirmpassword: { type: "string", example: "123" },
          phone: { type: "string", example: "11987654321" },
        },
      },

      Pet: {
        type: "object",
        properties: {
          name: { type: "string", example: "Rex" },
          age: { type: "number", example: 3 },
          weight: { type: "number", example: 12.5 },
          color: { type: "string", example: "Brown" },
          available: { type: "boolean", example: true },
          user: { type: "string", example: "6731c06c2af3ad4b7fb224a1" },
          adopter: {
            type: "string",
            nullable: true,
            example: null,
          },
        },
      },
    },
  },

  security: [{ bearerAuth: [] }],
};

export const swaggerOptions = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

export default swaggerJsdoc(swaggerOptions);
