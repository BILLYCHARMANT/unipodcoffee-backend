import prisma from "../db/prisma";
import { StatusCodes } from "http-status-codes";
import { getAllItems, getItemById, updateItem, deleteItem } from "../service/item.service";

export const createItemController = async (req, res) => {
  const { name, unitPrice, categoryId, supplierId } = req.body;

  try {
    const itemExist = await prisma.item.findUnique({
      where: { name },
    });

    if (itemExist) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        message: "An item with this  name already exists.",
      });
    }

    const newItem = await prisma.item.create({
      data: {
        name,
        unitPrice,
        categoryId,
        supplierId,
      },
    });
    return res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      message: "Item created successfully",
      data: newItem,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message:"Error creating Item",
    });
  }
};

export const getItemsController = async (req, res) => {
  try {
    const items = await getAllItems();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: "Error fetching items" });
  }
};

export const getItemByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await getItemById(id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: "Error fetching item" });
  }
};

export const updateItemController = async (req, res) => {
  try {
    const { id } = req.params;
    const itemData = req.body;
    const updatedItem = await updateItem(id, itemData);
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Error updating item" });
  }
};

export const deleteItemController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteItem(id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting item" });
  }
};
