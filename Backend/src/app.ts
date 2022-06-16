import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import config from "./01-utils/config";
import errorsHandler from "./02-middleware/errors-handler";
import usersController from "./06-controllers/users-controller";
import authController from "./06-controllers/auth-controller";
import todoTagsController from "./06-controllers/todo-tags-controller";
import todoStatusController from "./06-controllers/todo-status-controller";
import todoController from "./06-controllers/todo-controller";
import tagsController from "./06-controllers/tags-controller";

const server = express();

server.use(cors());
server.use(express.json());
server.use("/api/users", usersController);
server.use("/api/auth", authController);
server.use("/api/todo-tags", todoTagsController);
server.use("/api/todo-status", todoStatusController);
server.use("/api/todos", todoController);
server.use("/api/tags", tagsController);
server.use(errorsHandler);

server.listen(config.port, () => console.log("Listening..."));    
