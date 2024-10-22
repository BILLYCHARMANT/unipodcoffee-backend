import prisma from "../db/prisma";
import { StatusCodes } from "http-status-codes";
import {
  addNewItemsInStock,
  getAllItemsInStock,
} from "../service/stock.service";

export const getItemsInStockController = async (req, res) => {
  try {
    const items = await getAllItemsInStock();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: "Error fetching items" });
  }
};

export const addNewItemInStockController = async (req, res) => {
  try {
    const stockTranctionDetails = req.body;
    const newStockInRecord = await addNewItemsInStock(stockTranctionDetails);
    if (!newStockInRecord) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
          status: StatusCodes.BAD_REQUEST,
          message: "This item already recorded in stock",
        });
    }
    return res.status(201).json(newStockInRecord);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "Error creating stock record" });
  }
};
