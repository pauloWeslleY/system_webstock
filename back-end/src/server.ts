import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { route } from "./routes";
import { ServerError } from "./error/ServerError";

const server = express();

server.listen(8080, () => {
   console.log("Server is running on port 8080🚀");
});

server.use(express.json());
server.use(route);
server.use(
   (err: Error, request: Request, response: Response, next: NextFunction) => {
      if (err instanceof ServerError) {
         return response.status(err.statusCode).json({
            status: "error",
            message: err.message,
         });
      }

      return response.status(500).json({
         status: "error",
         message: `Internal server error -> ${err.message}`,
      });
   }
);
