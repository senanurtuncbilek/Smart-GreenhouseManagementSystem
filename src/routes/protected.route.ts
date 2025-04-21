import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';
import { UserRole } from '../constants/roles';

const router = Router();

router.get('/profile', authenticateToken, (req, res) => {
  res.json({
    message: `Hoş geldin ${req.user?.role}, kimliğin başarıyla doğrulandı!`,
    user: req.user,
  });
});

router.get('/admin-only', authenticateToken, authorizeRoles(UserRole.Admin), (req, res) => {
  res.json({ message: `Admin paneline erişim sağladınız, ${req.user?.role}!` });
});

router.get('/farmer-only', authenticateToken, authorizeRoles(UserRole.Farmer), (req, res) => {
  res.json({ message: `Merhaba çiftçi, hoş geldin ${req.user?.role}!` });
});

router.get('/report', authenticateToken, authorizeRoles(UserRole.Admin, UserRole.Farmer), (req, res) => {
  res.json({ message: `Raporlara erişiminiz var, sayın ${req.user?.role}!` });
});

export default router;
