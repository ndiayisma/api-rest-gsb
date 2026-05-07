import { Router } from 'express';
import { VisiteurController } from '../controllers/Visiteur';
import { PortefeuilleController } from '../controllers/Portefeuille';
import { generalLimiter } from '../middlewares/rateLimiter';
import { validateCreateVisiteur } from '../middlewares/validators/visiteurValidator';
import { authMiddleware } from '../middlewares/auth';
import { portefeuilleAuthMiddleware } from '../middlewares/portefeuilleAuthMiddleware';

/**
 * Configuration des routes pour les visiteurs
 */
export class VisiteurRoutes {
  public router: Router;
  private visiteurController: VisiteurController;
  private portefeuilleController: PortefeuilleController;

  constructor() {
    this.router = Router();
    this.visiteurController = new VisiteurController();
    this.portefeuilleController = new PortefeuilleController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
 
    
    // POST /api/visiteurs - Créer un visiteur
    this.router.post('/', validateCreateVisiteur, this.visiteurController.creerUnCompte);
    // POST /api/visiteurs/login - Connexion du visiteur
    this.router.post('/connexion', this.visiteurController.seConnecter);
        // GET /api/visiteurs - Récupérer tous les visiteurs
    this.router.get('/', generalLimiter, authMiddleware, this.visiteurController.getAllVisiteurs);
        // GET /api/visiteurs/:id - Récupérer un visiteur par ID
    this.router.get('/:id', generalLimiter, this.visiteurController.getVisiteurById);


    // --- Gestion du Portefeuille ---
    // POST /api/visiteurs/:visiteurId/portefeuille - Ajouter un praticien au portefeuille
       this.router.post('/:visiteurId/portefeuille', authMiddleware, portefeuilleAuthMiddleware, this.portefeuilleController.ajouterPraticien);
    // GET /api/visiteurs/:visiteurId/portefeuille - Voir le portefeuille d'un visiteur
    this.router.get('/:visiteurId/portefeuille', authMiddleware, portefeuilleAuthMiddleware, this.portefeuilleController.getPortefeuille);
    // GET /api/visiteurs/:visiteurId/portefeuille?specialite=specialiteId - Filtrer le portefeuille par spécialité
    this.router.get('/:visiteurId/portefeuille/filter/specialite', authMiddleware, portefeuilleAuthMiddleware, this.portefeuilleController.getPortefeuilleBySpecialite);
    // DELETE /api/visiteurs/:visiteurId/portefeuille/:praticienId - Retirer un praticien
    this.router.delete('/:visiteurId/portefeuille/:praticienId', authMiddleware, portefeuilleAuthMiddleware, this.portefeuilleController.retirerPraticien);
    //PATCH /api/visiteurs/:visiteurId/portefeuille - Arrêter de suivre un praticien (marquer comme inactif)
    this.router.patch('/:visiteurId/portefeuille', authMiddleware, portefeuilleAuthMiddleware, this.portefeuilleController.arreterSuiviPraticien);
  }
}


