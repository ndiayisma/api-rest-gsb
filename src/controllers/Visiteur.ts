import { Request, Response } from 'express';
import { VisiteurService } from '../services/Visiteur';


export class VisiteurController {
    private visiteurService: VisiteurService;
    constructor() {
        this.visiteurService = new VisiteurService();
    }

    /**
     * POST /api/visiteurs - Créer un visiteur
     */
    public createVisiteur = async (req: Request, res: Response): Promise<void> => {
        try {
            const visiteur = await this.visiteurService.createVisiteur(req.body);

            res.status(201).json({
                success: true,
                message: 'Visiteur créé avec succès',
                data: visiteur
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message || 'Erreur lors de la création'
            });
        }
    };

    /**
     * GET /api/visiteurs - Récupérer tous les visiteurs
     */
    public getAllVisiteurs = async (req: Request, res: Response): Promise<void> => {
        try {
            const visiteurs = await this.visiteurService.getAllVisiteurs();

            res.status(200).json({
                success: true,
                count: visiteurs.length,
                data: visiteurs
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message || 'Erreur lors de la récupération'
            });
        }
    };

    /**
     * GET /api/visiteurs/:id - Récupérer un visiteur par ID
     */
    public getVisiteurById = async (req: Request, res: Response): Promise<void> => {
        try {
            const visiteur = await this.visiteurService.getVisiteurById(req.params.id);

            res.status(200).json({
                success: true,
                data: visiteur
            });
        } catch (error: any) {
            res.status(404).json({
                success: false,
                message: error.message || 'Visiteur non trouvé'
            });
        }
    };

    /**
     * DELETE /api/visiteurs/:id - Supprimer un visiteur par ID
     */
    public deleteVisiteur = async (req: Request, res: Response): Promise<void> => {
        try {
            await this.visiteurService.deleteVisiteur(req.params.id);

            res.status(200).json({
                success: true,
                message: 'Visiteur supprimé avec succès'
            });
        } catch (error: any) {
            res.status(404).json({
                success: false,
                message: error.message || 'Erreur lors de la suppression'
            });
        }
    };

    /**
     * POST /api/visiteurs/:visiteurId/praticiens - Ajoute un praticien au portefeuille
     */
    public addPraticienToPortefeuille = async (req: Request, res: Response): Promise<void> => {
        const { visiteurId } = req.params;
        const { praticienId } = req.body;

        try {
            const visiteur = await this.visiteurService.addPraticienToVisiteur(visiteurId, praticienId);

            res.status(200).json({
                success: true,
                message: 'Praticien ajouté au portefeuille',
                data: visiteur
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message || "Erreur lors de l'ajout du praticien"
            });
        }
    };

    /**
     * GET /api/visiteurs/:visiteurId/praticiens - Récupérer les praticiens du portefeuille
     */
    public getPraticiensPortefeuille = async (req: Request, res: Response): Promise<void> => {
        const { visiteurId } = req.params;

        try {
            const praticiens = await this.visiteurService.getPraticiensPortefeuille(visiteurId);

            res.status(200).json({
                success: true,
                count: praticiens.length,
                data: praticiens
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message || 'Erreur lors de la récupération du portefeuille'
            });
        }
    };
}