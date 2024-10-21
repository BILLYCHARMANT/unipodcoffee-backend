import { Router } from "express";
import userRoutes from "./api/user.routes";
import authRoutes from "./api/auth.routes";
import itemsRoutes from "./api/item.routes"



const routes = Router();


routes.use('/users', userRoutes);
routes.use('/auth', authRoutes);
routes.use('/items', itemsRoutes);


export default routes;