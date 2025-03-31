import { Application } from "express";
require("dotenv").config();
import express from "express";
import cors from "cors";
const app: Application = express();
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger_output.json";
import path from "path";
app.use(cors());

// connectDB();

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Example Route
app.get("/api/test", (req, res) => {
  /**
   * @swagger
   * /api/test:
   *   get:
   *     description: Test endpoint
   *     responses:
   *       200:
   *         description: Success
   */
  res.json({ message: "Hello World" });
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port: ", process.env.PORT);
});
