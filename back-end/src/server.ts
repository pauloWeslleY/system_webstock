import express, { NextFunction, Request, Response } from "express";
import { route } from "./routes";
import { ServerError } from "./error/ServerError";
import { PrismaClient } from "@prisma/client";

const server = express();
const prisma = new PrismaClient({
   log: ['query']
})

server.listen(8080, () => {
   console.log("Server is running on port 8080 🚀!");
});

server.use(express.json());
server.use(route);
server.use((error: Error, request: Request, response: Response, next: NextFunction) => {
   if (error instanceof ServerError) {
      return response.status(error.statusCode).json({
         status: "error",
         message: error.message
      });
   }

   return response.status(500).json({
      status: "error",
      message: `Internal server error -> ${error.message}`,
   })
})

