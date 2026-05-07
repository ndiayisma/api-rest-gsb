import { Router } from 'express';
import { PraticienController } from '../controllers/Praticien';
import { authMiddleware } from '../middlewares/auth';

export class PraticienRoutes {
    public router: Router;
    private praticienController: PraticienController;

    constructor() {
        this.router = Router();
        this.praticienController = new PraticienController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/', this.praticienController.createPraticien);
        this.router.get('/', this.praticienController.getAllPraticiens);
        this.router.get('/:id', this.praticienController.getPraticienById);
        this.router.post('/:id/specialite/remove', this.praticienController.removeSpecialiteFromPraticien);
        this.router.post('/:id/specialite', authMiddleware, this.praticienController.addSpecialiteToPraticien);
    }
}