import express from "express";
import userRoutes from "./routes/route.js";
import taskRoutes from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";

export const app = express();

config({
  path: "./data/config.env",
});

// Using Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Using Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Using Error Middlewares
app.use(errorMiddleware);
