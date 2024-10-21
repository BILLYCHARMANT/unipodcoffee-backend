import { getAllSuppliers, getSupplierById, createSupplier, updateSupplier, deleteSupplier } from "../service/supplier.service";


export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await getAllSuppliers();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ error: "Error fetching suppliers" });
  }
};

export const getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await getSupplierById(id);
    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }
    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ error: "Error fetching supplier" });
  }
};

export const createSupplier = async (req, res) => {
  try {
    const supplierData = req.body;
    const newSupplier = await createSupplier(supplierData);
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(500).json({ error: "Error creating supplier" });
  }
};

export const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const supplierData = req.body;
    const updatedSupplier = await updateSupplier(id, supplierData);
    res.status(200).json(updatedSupplier);
  } catch (error) {
    res.status(500).json({ error: "Error updating supplier" });
  }
};

export const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteSupplier(id);
    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting supplier" });
  }
};
