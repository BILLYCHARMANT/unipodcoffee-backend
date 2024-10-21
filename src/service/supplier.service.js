import prisma from "../db/prisma";

export const getAllSuppliers = async () => {
  return await prisma.supplier.findMany({
    include: { items: true },
  });
};

export const getSupplierById = async (id) => {
  return await prisma.supplier.findUnique({
    where: { id },
    include: { items: true },
  });
};

export const createSupplier = async (data) => {
  return await prisma.supplier.create({ data });
};

export const updateSupplier = async (id, data) => {
  return await prisma.supplier.update({
    where: { id },
    data,
  });
};

export const deleteSupplier = async (id) => {
  return await prisma.supplier.delete({
    where: { id },
  });
};
