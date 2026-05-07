import { Router } from 'express';
import { SpecialiteController } from '../controllers/Specialite';
import { authMiddleware } from '../middlewares/auth';

export class SpecialiteRoutes {
    public router: Router;
    private specialiteController: SpecialiteController;

    constructor() {
        this.router = Router();
        this.specialiteController = new SpecialiteController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/', authMiddleware, this.specialiteController.createSpecialite);
        this.router.get('/', authMiddleware,this.specialiteController.getAllSpecialites);
    }
}
