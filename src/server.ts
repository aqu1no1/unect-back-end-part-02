import express from "express";
import dotenv from "dotenv";
import logger from "./utils/logger";
import connect from "./utils/connect";
import UserRoutes from "./routes/user.routes";
import PetRoutes from "./routes/pet.routes";
//import { setupSwagger } from "./utils/swagger";

dotenv.config();

const app = express();

//setupSwagger(app);
app.use(express.json());

//Routes
app.use("/users", UserRoutes);
app.use("/pets", PetRoutes);

app.listen(process.env.PORT, async () => {
  logger.info("Server is running");

  await connect();
});
