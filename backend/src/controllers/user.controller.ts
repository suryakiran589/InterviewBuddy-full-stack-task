import type { Request, Response } from 'express';
import * as userService from '../services/user.service.js';

export const getAllUsers = async (_req: Request, res: Response) => {
  const data = await userService.getAll();
  res.json(data);
};

export const getUsersByOrg = async (req: Request, res: Response) => {
  const data = await userService.getByOrganization(Number(req.params.orgId));
  res.json(data);
};

export const addUser = async (req: Request, res: Response) => {
  const data = await userService.create(req.body);
  res.status(201).json(data);
};

export const updateUser = async (req: Request, res: Response) => {
  const data = await userService.update(Number(req.params.id), req.body);
  res.json(data);
};

export const deleteUser = async (req: Request, res: Response) => {
  await userService.remove(Number(req.params.id));
  res.json({ message: 'User deleted' });
};
