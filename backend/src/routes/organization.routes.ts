import { Router } from 'express';
import {
  getAllOrganizations,
  getOrganizationById,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} from '../controllers/organization.controller.js';

const router = Router();

router.get('/', getAllOrganizations);
router.get('/:id', getOrganizationById);
router.post('/', createOrganization);
router.put('/:id', updateOrganization);
router.delete('/:id', deleteOrganization);

export default router;
