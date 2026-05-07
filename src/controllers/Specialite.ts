import { Request, Response} from 'express';
import { SpecialiteService } from '../services/Specialite';

export class SpecialiteController {
    private specialiteService: SpecialiteService;
    constructor() {
        this.specialiteService = new SpecialiteService();
    }

    /**
     * POST /api/specialites - Créer une spécialité
     */
    public createSpecialite = async (req: Request, res: Response): Promise<void> => {
        try {
            const specialite = await this.specialiteService.createSpecialite(req.body);

            res.status(201).json({
                success: true,
                message: 'Spécialité créée avec succès',
                data: specialite
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message || 'Erreur lors de la création'
            });
        }
    };

    /**
     * GET /api/specialites - Récupérer toutes les spécialités
     */
    public getAllSpecialites = async (req: Request, res: Response): Promise<void> => {
        try {
            const specialites = await this.specialiteService.getAllSpecialites();
            res.status(200).json({
                success: true,
                data: specialites
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message || 'Erreur lors de la récupération des spécialités'
            });
        }
    };
}
