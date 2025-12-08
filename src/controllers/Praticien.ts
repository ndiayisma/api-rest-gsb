import { Request, Response} from 'express';
import { PraticienService } from '../services/Praticien';

export class PraticienController {
    private praticienService: PraticienService;
    constructor() {
        this.praticienService = new PraticienService();
    }

    /**
     * POST /api/praticiens - Créer un praticien
     */
    public createPraticien = async (req: Request, res: Response): Promise<void> => {
        try {
            const praticien = await this.praticienService.createPraticien(req.body);

            res.status(201).json({
                success: true,
                message: 'Praticien créé avec succès',
                data: praticien
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message || 'Erreur lors de la création'
            });
        }
    };

    /**
     * GET /api/praticiens - Récupérer tous les praticiens
     */
    public getAllPraticiens = async (req: Request, res: Response): Promise<void> => {
        try {
            const praticiens = await this.praticienService.getAllPraticiens();
            res.status(200).json({
                success: true,
                data: praticiens
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message || 'Erreur lors de la récupération des praticiens'
            });
        }
    };

    /**
     * GET /api/praticiens/:id - Récupérer un praticien par son ID
     */
    public getPraticienById = async (req: Request, res: Response): Promise<void> => {
        try {
            const praticien = await this.praticienService.getPraticienById(req.params.id);
            if (!praticien) {
                res.status(404).json({
                    success: false,
                    message: 'Praticien non trouvé'
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: praticien
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message || 'Erreur lors de la récupération du praticien'
            });
        }
    };

    /**
     * DELETE /api/praticiens/:id - Supprimer un praticien par son ID
     */
    public deletePraticien = async (req: Request, res: Response): Promise<void> => {
        try {
            const deletedPraticien = await this.praticienService.deletePraticienById(req.params.id);
            if (!deletedPraticien) {
                res.status(404).json({
                    success: false,
                    message: 'Praticien non trouvé'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Praticien supprimé avec succès',
                data: deletedPraticien
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message || 'Erreur lors de la suppression du praticien'
            });
        }
    };
}