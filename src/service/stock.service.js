import prisma from "../db/prisma";
import { getItemById } from "./item.service";

export const getAllItemsInStock = async () => {
  return await prisma.stock.findMany({
    where: {
      balanceInStock: {
        gt: 0,
      },
    },
  });
};

export const getItemsEmptyInStock = async (id) => {
  return await prisma.stock.findMany({
    where: {
      balanceInStock: {
        lt: 1,
      },
    },
  });
};

export const addNewItemsInStock = async (data) => {
  const { receiveDate, quarter, quantity, itemId, specification, location } =
    data;

  const itemInfo = await getItemById(itemId);
  const itemExistInStock = await prisma.stock.findUnique({
    where: { itemId },
  });


  if (!itemInfo || itemExistInStock) {
    return null;
  }

  const isoReceiveDate = new Date(receiveDate).toISOString();

  await prisma.stockIn.create({
    data: {
      receiveDate: isoReceiveDate,
      quarter,
      itemId,
      quantity,
      totalPrice: quantity * itemInfo.unitPrice,
      specification,
    },
  });

  return await prisma.stock.create({
    data: {
      location,
      itemId,
      quantityInStock: quantity,
      quantityOutStock: 0,
      balanceInStock: quantity,
      totalValueReceived: quantity * itemInfo.unitPrice,
      totalBalance: quantity * itemInfo.unitPrice,
    },
  });
};

export const addItemInStock = async (data) => {
  const { quantity, itemId, receiveDate, quarter, specification } = data;
  const itemInfo = await getItemById(itemId);
  const itemExistInStock = await prisma.stock.findUnique({
    where: { itemId },
  });

  if (!itemExistInStock) {
    return null;
  }

  await prisma.stockIn.create({
    data: {
      receiveDate,
      quarter,
      itemId,
      quantity,
      specification,
    },
  });

  return await prisma.stock.update({
    where: { itemId },
    data: {
      quantityInStock: itemExistInStock.quantityInStock + quantity,
      balanceInStock: itemExistInStock.balanceInStock + quantity,
      totalValueReceived:
        (itemExistInStock.quantityInStock + quantity) * itemInfo.unitPrice,
      totalBalance:
        (itemExistInStock.balanceInStock + quantity) * itemInfo.unitPrice,
    },
  });
};

export const removeItemFromStock = async (data) => {
  const {
    quantity,
    itemId,
    requestDate,
    quarter,
    requestPerson,
    requestReason,
  } = data;
  const itemInfo = await getItemById(itemId);
  const itemExistInStock = await prisma.stock.findUnique({
    where: { itemId },
  });

  if (!itemExistInStock) {
    return null;
  }

  await prisma.stockOut.create({
    data: {
      requestDate,
      quarter,
      itemId,
      quantity,
      requestPerson,
      requestReason,
    },
  });

  return await prisma.stock.update({
    where: { itemId },
    data: {
      quantityOutStock: quantity,
      balanceInStock: itemExistInStock.balanceInStock - quantity,
      totalBalance:
        (itemExistInStock.balanceInStock - quantity) * itemInfo.unitPrice,
    },
  });
};

export const updateStockIn = async (id, data) => {
  const { quantity, itemId, receiveDate, quarter, specification } = data;
  const itemInfo = await getItemById(itemId);
  const itemExistInStock = await prisma.stock.findUnique({
    where: { itemId },
  });

  if (!itemExistInStock) {
    return null;
  }

  await prisma.stockIn.update({
    data: {
      receiveDate,
      quarter,
      itemId,
      quantity,
      specification,
    },
  });

  return await prisma.stock.update({
    where: { id },
    data: {
      quantityInStock: itemExistInStock.quantityInStock + quantity,
      balanceInStock: itemExistInStock.balanceInStock + quantity,
      totalValueReceived:
        (itemExistInStock.quantityInStock + quantity) * itemInfo.unitPrice,
      totalBalance:
        (itemExistInStock.balanceInStock + quantity) * itemInfo.unitPrice,
    },
  });
};
