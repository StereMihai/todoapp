import { StatusCodes } from "http-status-codes";
import prisma from "../db";
import HandleError from "../errors/HandleError";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

export const createaNewUser = async (req, res, next) => {
  try {
    const hash = await hashPassword(req.body.password);

    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hash,
      },
    });

    const token = createJWT(user);

    res.json({ token });
  } catch (error) {
    return next(
      new HandleError({
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: JSON.stringify(error),
        logging: true,
      })
    );
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return next(
        new HandleError({
          code: StatusCodes.UNAUTHORIZED,
          message: "Unauthorized",
          logging: true,
        })
      );
    }

    const isValid = await comparePassword(req.body.password, user.password);

    if (!isValid) {
      return next(
        new HandleError({
          code: StatusCodes.UNAUTHORIZED,
          message: "Invalid username or password",
          logging: true,
        })
      );
    }

    const token = createJWT(user);

    res.json({ token });
  } catch (error) {
    return next(
      new HandleError({
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: JSON.stringify(error),
        logging: true,
      })
    );
  }
};
