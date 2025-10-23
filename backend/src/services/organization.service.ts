import {prisma} from '../config/db.js'

export const getAll = async () => {
  return prisma.organization.findMany({
    include: { users: true },
  });
};

export const getById = async (id: number) => {
  return prisma.organization.findUnique({
    where: { id },
    include: { users: true },
  });
};

export const create = async (data: any) => {
  return prisma.organization.create({ data });
};

export const update = async (id: number, data: any) => {
  return prisma.organization.update({ where: { id }, data });
};

export const remove = async (id: number) => {
  return prisma.organization.delete({ where: { id } });
};