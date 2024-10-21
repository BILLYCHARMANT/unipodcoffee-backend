import { Router } from "express";
import { getItemByIdController, getItemsController, createItemController, updateItemController, deleteItemController } from '../../controllers/itemController';

const router = Router();


router.get('/', getItemsController);
router.get('/:id', getItemByIdController);
router.post('/', createItemController);
router.put('/:id', updateItemController);
router.delete('/:id', deleteItemController);

export default router;