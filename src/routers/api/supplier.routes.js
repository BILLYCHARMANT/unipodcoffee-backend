import { Router } from "express";
import { getSuppliers, getSupplierByIdController, createSupplierController, updateSupplierController,deleteSupplierController } from "../../controllers/supplierController";

const router = Router();


router.get('/', getSuppliers);
router.get('/:id', getSupplierByIdController);
router.post('/', createSupplierController);
router.put('/:id', updateSupplierController);
router.delete('/:id', deleteSupplierController);

export default router;