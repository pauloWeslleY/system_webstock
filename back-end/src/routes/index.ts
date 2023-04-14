import { Router } from "express";
import { userRoutes } from "./user.routes";
import { productRoutes } from "./product.routes";

const route = Router();

route.use("/users", userRoutes);
route.use("/products", productRoutes);

export { route };