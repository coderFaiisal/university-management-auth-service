import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Database connect successfully");

    app.listen(config.port, () => {
      console.log(`Application is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log("Failed to connect database", err);
  }
}

bootstrap();
