import express from "express";
import dotenv from "dotenv";
import logger from "./utils/logger";
import connect from "./utils/connect";
import UserRoutes from "./routes/user.routes";
import PetRoutes from "./routes/pet.routes";
import { swaggerOptions } from "./config/swagger";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config();

const app = express();
app.use(express.json());

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Routes
app.use("/users", UserRoutes);
app.use("/pets", PetRoutes);

app.listen(process.env.PORT, async () => {
  logger.info("Server is running");

  await connect();
});
