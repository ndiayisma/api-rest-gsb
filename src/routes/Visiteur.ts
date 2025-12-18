import { Router } from 'express';
import { VisiteurController } from '../controllers/Visiteur';
import { PortefeuilleController } from '../controllers/Portefeuille';

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
    this.router.post('/', this.visiteurController.createVisiteur);
        // GET /api/visiteurs - Récupérer tous les visiteurs
    this.router.get('/', this.visiteurController.getAllVisiteurs);
        // GET /api/visiteurs/:id - Récupérer un visiteur par ID
    this.router.get('/:id', this.visiteurController.getVisiteurById);


    // --- Gestion du Portefeuille ---
    // POST /api/visiteurs/:id/portefeuille - Ajouter un praticien au portefeuille
       this.router.post('/:visiteurId/portefeuille', this.portefeuilleController.ajouterPraticien);
    // GET /api/visiteurs/:id/portefeuille - Voir le portefeuille d'un visiteur
    this.router.get('/:visiteurId/portefeuille', this.portefeuilleController.getPortefeuille);
    // DELETE /api/visiteurs/:id/portefeuille/:praticienId - Retirer un praticien
    this.router.delete('/:visiteurId/portefeuille/:praticienId', this.portefeuilleController.retirerPraticien);
  }
}


