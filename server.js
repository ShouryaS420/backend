import { app } from "./app.js";
import { config } from "dotenv";
import { connectDatabse } from "./config/database.js";

config({
  path: "./config/config.env",
});

connectDatabse();

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
