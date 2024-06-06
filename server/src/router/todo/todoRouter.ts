import { Router } from "express";
import { createToDoSchema, updateToDoSchema } from "../../schemas/todosSchema";
import { validateData } from "../../modules/middleware";
import { createTodo, deleteToDo, getToDo, getTodoById, updateToDo } from "../../handlers/todo";

const todoRouter = Router();

/**
 * TODO ROUTES
 */

todoRouter.get("/todo",  getToDo);
todoRouter.get("/todo/:id", getTodoById);
todoRouter.post("/todo", validateData(createToDoSchema), createTodo);
todoRouter.put("/todo/:id", validateData(updateToDoSchema), updateToDo);
todoRouter.delete("/todo/:id", deleteToDo);

export default todoRouter;
