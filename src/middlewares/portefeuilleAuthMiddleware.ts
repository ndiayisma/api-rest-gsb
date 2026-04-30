import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/authenticatedRequest';

/**
 * Middleware pour vérifier que le visiteur accède uniquement à son propre portefeuille
 */
export const portefeuilleAuthMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Vérifier que le middleware d'authentification a été appliqué
    if (!req.auth) {
      res.status(401).json({ error: 'Authorization required' });
      return;
    }

    const { visiteurId } = req.params;
    const { userId } = req.auth;

    // Vérifier que l'ID du visiteur dans l'URL correspond à celui du token
    if (visiteurId !== userId) {
      res.status(403).json({ error: 'Access denied. You can only access your own portfolio.' });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
