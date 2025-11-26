import mongoose from "mongoose";
import logger from "./logger";

async function connect() {
  const dbUri =
    process.env.DB_URI ||
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gy7gp98.mongodb.net/`;

  try {
    await mongoose.connect(dbUri);
    logger.info("connected to DataBase");
  } catch (error) {
    logger.error("Could not connect to DataBase");
    console.error(error);
    process.exit(1);
  }
}

export default connect;
