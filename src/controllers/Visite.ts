import { Request, Response } from 'express';
import { VisiteService } from '../services/Visite';

export class VisiteController {
    private visiteService: VisiteService;
    constructor() {
        this.visiteService = new VisiteService();
    }

    /**
     * POST /api/visites - Créer une visite
     */
    public createVisite = async (req: Request, res: Response): Promise<void> => {
        try {
            const visite = await this.visiteService.createVisite(req.body);

            res.status(201).json({
                success: true,
                message: 'Visite créée avec succès',
                data: visite
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message || 'Erreur lors de la création'
            });
        }
    };
    /**
     * GET /api/visites - Récupérer tous les visites
     */

    /**
     * GET /api/visites - Récupérer toutes les visites
     */
    public getAllVisites = async (req: Request, res: Response): Promise<void> => {
        try {
            const visites = await this.visiteService.getAllVisites();
            res.status(200).json({
                success: true,
                data: visites
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message || 'Erreur lors de la récupération des visites'
            });
        }
    };

    /**
     * GET /api/visites/:id - Récupérer une visite par son ID
     */
    public getVisiteById = async (req: Request, res: Response): Promise<void> => {
        try {
            const visite = await this.visiteService.getVisiteById(req.params.id);
            if (!visite) {
                res.status(404).json({
                    success: false,
                    message: 'Visite non trouvée'
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: visite
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message || 'Erreur lors de la récupération de la visite'
            });
        }
    };




}