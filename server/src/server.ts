import express from "express";
import bodyParser from "body-parser";
import todoRouter from "./router/todo/todoRouter";
import userRouter from "./router/user/userRouter";
import { errorHandler, protect } from "./modules/middleware";

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', protect,  todoRouter);
app.use('/', userRouter);

app.use(errorHandler);

export default app;
