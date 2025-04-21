import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../constants/roles';

export const authorizeRoles = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): any => {
    if (!req.user) {
      return res.status(401).json({ error: 'Yetkisiz erişim: Kullanıcı doğrulanamadı.' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Gerekli rol(ler): [${allowedRoles.join(', ')}], sizin rol: ${req.user.role}`
      });
    }

    next();
  };
};
