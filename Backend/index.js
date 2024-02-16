import express from "express";
import logger from "./src/utils/logger.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRouter from "./src/router/userRoutes.js";
import groupRoutes from "./src/router/groupRoutes.js";
import eventRoutes from "./src/router/eventRoutes.js";
import messageRouter from "./src/router/messageRoutes.js";
import postRouter from "./src/router/postRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.status(200).send("I am very healthy");
});

app.use("/api", userRouter);
app.use("/api", groupRoutes);
app.use("/api", eventRoutes);
app.use("/api", messageRouter);
app.use("/api", postRouter);

app.listen(port, () => {
  logger.info(`Server running on port http://localhost:${port}`);
});
