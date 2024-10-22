import { Router } from "express";
import userRoutes from "./api/user.routes";
import authRoutes from "./api/auth.routes";
import itemsRoutes from "./api/item.routes";
import categoriesRoutes from "./api/categories.routes";
import supplierRoutes from "./api/supplier.routes";
import stockRoutes from "./api/stock.routes"



const routes = Router();


routes.use('/users', userRoutes);
routes.use('/auth', authRoutes);
routes.use('/items', itemsRoutes);
routes.use('/categories', categoriesRoutes);
routes.use('/suppliers', supplierRoutes);
routes.use('/stocks', stockRoutes);


export default routes;