import { Router } from "express";
import { getItemsInStockController, addNewItemInStockController } from "../../controllers/stockController";

const router = Router();


router.get("/items-available", getItemsInStockController);
router.post("/", addNewItemInStockController);

export default router;