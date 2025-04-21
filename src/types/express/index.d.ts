import type { UserRole } from '../../constants/roles';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: UserRole;
        [key: string]: any;
      };
    }
  }
}

export {};
