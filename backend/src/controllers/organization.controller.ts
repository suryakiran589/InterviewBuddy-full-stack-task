import type { Request, Response } from 'express';
import * as orgService from '../services/organization.service.js';
import {prisma} from '../config/db.js'

export const getAllOrganizations = async (req: Request, res: Response) => {
  const data = await orgService.getAll();
  res.json(data);
};

export const getOrganizationById = async (req: Request, res: Response) => {
  const data = await orgService.getById(Number(req.params.id));
  res.json(data);
};

export const createOrganization = async (req: Request, res: Response) => {
  const data = await orgService.create(req.body);
  res.status(201).json(data);
};

export const updateOrganization = async (req: Request, res: Response) => {
  const data = await orgService.update(Number(req.params.id), req.body);
  res.json(data);
};

export const deleteOrganization = async (req: Request, res: Response) => {
  await orgService.remove(Number(req.params.id));
  res.json({ message: 'Organization deleted' });
};

