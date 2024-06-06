import jwt from "jsonwebtoken";
import { z, ZodError } from "zod";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors/CustomError";
import HandleError from "../errors/HandleError";

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.send("Not authorized");
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.send("Not authorized");
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
    return;
  } catch (error) {
    console.error(error);
    res.status(401);
    res.send("Not authorized");
  }
};

export const validateData = (schema: z.ZodObject<any, any>) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        return next(
          new HandleError({
            code: StatusCodes.BAD_REQUEST,
            message: JSON.stringify(errorMessages),
            logging: true,
          })
        );
      } else {
        return next(
          new HandleError({
            code: StatusCodes.BAD_REQUEST,
            message: JSON.stringify(error),
            logging: true,
          })
        );
      }
    }
  };
};

export const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    const { statusCode, errors, logging } = err;
    if (logging) {
      console.error(
        JSON.stringify(
          {
            code: err.statusCode,
            errors: err.errors,
            stack: err.stack,
          },
          null,
          2
        )
      );
    }
    return res.status(statusCode).send({ errors });
  }
  console.error(JSON.stringify(err, null, 2));
  res.status(500).send({ errors: [{ message: "Something went wrong" }] });
};
