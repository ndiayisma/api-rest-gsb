import { Router } from 'express';
import { MotifController } from '../controllers/Motif';

export class MotifRoutes {
    public router: Router;
    private motifController: MotifController;

    constructor() {
        this.router = Router();
        this.motifController = new MotifController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/', this.motifController.createMotif);
        this.router.get('/', this.motifController.getAllMotifs);
    }
}