import prisma from "../db/prisma";


export const getAllItems = async () => {
    return await prisma.item.findMany({
      include: { category: true, supplier: true, stock: true, stockIn: true, stockOut: true }
    });
  }


export const  getItemById = async (id) => {
    return await prisma.item.findUnique({
      where: { id },
      include: { category: true, supplier: true, stock: true, stockIn: true, stockOut: true }
    });
  }


export  const createItem = async (data) => {
    return await prisma.item.create({ data });
  }


export const updateItem = async (id, data) => {
    return await prisma.item.update({
      where: { id },
      data,
    });
  }

  
export const deleteItem = async (id) => {
    return await prisma.item.delete({
      where: { id },
    });
  }
