import { app } from "./app.js";
import { config } from "dotenv";
import { connectDatabase } from "./config/database.js";

config({
  path: "./config/config.env",
});

connectDatabase();

//👇🏻 New imports
import { createServer } from "http";
import cors from "cors";

const server = createServer(app);
app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});