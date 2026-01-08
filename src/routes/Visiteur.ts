import { Router } from 'express';
import { VisiteurController } from '../controllers/Visiteur';
import { PortefeuilleController } from '../controllers/Portefeuille';
import { generalLimiter } from '../middlewares/rateLimiter';
import { validateCreateVisiteur } from '../middlewares/validators/visiteurValidator';

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
    this.router.post('/', validateCreateVisiteur, this.visiteurController.createVisiteur);
        // GET /api/visiteurs - Récupérer tous les visiteurs
    this.router.get('/', generalLimiter, this.visiteurController.getAllVisiteurs);
        // GET /api/visiteurs/:id - Récupérer un visiteur par ID
    this.router.get('/:id', generalLimiter, this.visiteurController.getVisiteurById);


    // --- Gestion du Portefeuille ---
    // POST /api/visiteurs/:id/portefeuille - Ajouter un praticien au portefeuille
       this.router.post('/:visiteurId/portefeuille', this.portefeuilleController.ajouterPraticien);
    // GET /api/visiteurs/:id/portefeuille - Voir le portefeuille d'un visiteur
    this.router.get('/:visiteurId/portefeuille', this.portefeuilleController.getPortefeuille);
    // DELETE /api/visiteurs/:id/portefeuille/:praticienId - Retirer un praticien
    this.router.delete('/:visiteurId/portefeuille/:praticienId', this.portefeuilleController.retirerPraticien);
    //PATCH /api/visiteurs/:id/portefeuille - Arrêter de suivre un praticien (marquer comme inactif)
    this.router.patch('/:visiteurId/portefeuille', this.portefeuilleController.arreterSuiviPraticien);
  }
}


