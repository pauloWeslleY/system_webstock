import { Router } from "express";
import { userRoutes } from "./user.routes";
import { productRoutes } from "./product.routes";
import { categoryRoutes } from "./category.routes";

const route = Router();

route.use("/users", userRoutes);
route.use("/products", productRoutes);
route.use("/category", categoryRoutes);

export { route };
