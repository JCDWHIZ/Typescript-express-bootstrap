import { Application } from "express";
require("dotenv").config();
import express from "express";
import cors from "cors";
const app: Application = express();
import path from "path";
app.use(cors());

// connectDB();

app.listen(process.env.PORT, () => {
  console.log("Server running on port: ", process.env.PORT);
});
