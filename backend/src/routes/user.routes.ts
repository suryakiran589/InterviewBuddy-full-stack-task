import { Router } from 'express';
import {
  getAllUsers,
  getUsersByOrg,
  addUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';

const router = Router();

router.get('/', getAllUsers);
router.get('/organization/:orgId', getUsersByOrg);
router.post('/', addUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
