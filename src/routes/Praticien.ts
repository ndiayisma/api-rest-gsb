import { Router } from 'express';
import { PraticienController } from '../controllers/Praticien';

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
    }
}