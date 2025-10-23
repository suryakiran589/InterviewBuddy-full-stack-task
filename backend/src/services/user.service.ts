import {prisma} from '../config/db.js'

export const getAll = async () => {
  return prisma.user.findMany({
    include: { organization: true },
  });
};

export const getByOrganization = async (orgId: number) => {
  return prisma.user.findMany({
    where: { organizationId: orgId },
  });
};

export const create = async (data: any) => {
  return prisma.user.create({ data });
};

export const update = async (id: number, data: any) => {
  return prisma.user.update({ where: { id }, data });
};

export const remove = async (id: number) => {
  return prisma.user.delete({ where: { id } });
};