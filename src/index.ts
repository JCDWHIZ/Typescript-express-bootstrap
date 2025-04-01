import { Application, Request, Response } from "express";
require("dotenv").config();
import express from "express";
import cors from "cors";
const app: Application = express();
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger_output.json";
const EmailRoutes = require("./routes/index");
import path from "path";
app.use(cors());

// connectDB();

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));

app.use("/api/email", EmailRoutes);

app.use(cors());

app.get("/images/:filename", (req: Request, res: Response) => {
  const imagePath = path.resolve(__dirname, "uploads", req.params.filename);

  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send("Image not found");
    }
  });
});

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
