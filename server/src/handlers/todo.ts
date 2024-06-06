import { StatusCodes } from "http-status-codes";
import prisma from "../db";
import HandleError from "../errors/HandleError";


export const createTodo = async (req, res, next) => {
  try {
    const data = req.body;
    const todo = await prisma.todo.create({
        data: {
            title: data.title,
            body: data.body,
            belongsToId: data.userId,
            status: data.status
        }
    })

    res.json({data: todo});
  } catch (error) {
    return next(
        new HandleError({
          code: StatusCodes.BAD_REQUEST,
          message: JSON.stringify(error),
          logging: true,
        })
      );
  }
}

export const getToDo = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id
            },
            include: {
                todos: true,
            }
        })

        res.json({data: user.todos});
    } catch (error) {
        return next(
            new HandleError({
              code: StatusCodes.BAD_REQUEST,
              message: JSON.stringify(error),
              logging: true,
            })
          );
    }
}

export const getTodoById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const todo = await prisma.todo.findFirst({
            where: {
                id,
                belongsToId: req.user.id
            }
        })

        res.json({data: todo})
    } catch (error) {
        return next(
            new HandleError({
              code: StatusCodes.BAD_REQUEST,
              message: JSON.stringify(error),
              logging: true,
            })
          );
    }
}

export const updateToDo = async (req, res, next) => {
  try {
    const updated = await prisma.todo.update({
        where: {
            id: req.params.id,
            belongsToId: req.user.id,
        },
        data: req.body
    })
   
    res.json({data: updated})
  } catch (error) {
    return next(
        new HandleError({
          code: StatusCodes.BAD_REQUEST,
          message: JSON.stringify(error),
          logging: true,
        })
      );
  }
}

export const deleteToDo = async (req, res, next) => {
    try {
        const deleted = await prisma.todo.delete({
            where: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        })
        res.json({data: deleted})
    } catch (error) {
        return next(
            new HandleError({
              code: StatusCodes.BAD_REQUEST,
              message: JSON.stringify(error),
              logging: true,
            })
          );
    }
}