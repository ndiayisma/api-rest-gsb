import { Request, Response } from 'express';
import { PortefeuilleService } from '../services/Portefeuille';

export class PortefeuilleController {
  private portefeuilleService = new PortefeuilleService();

  // GET /visiteurs/:visiteurId/portefeuille
  public getPortefeuille = async (req: Request, res: Response) => {
    try {
      const { visiteurId } = req.params;
      const portefeuille = await this.portefeuilleService.getPortefeuilleByVisiteur(visiteurId);
      res.status(200).json(portefeuille);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // POST /visiteurs/:visiteurId/portefeuille
  public ajouterPraticien = async (req: Request, res: Response) => {
    try {
      const { visiteurId } = req.params;
      const { praticienId } = req.body; 

      const lien = await this.portefeuilleService.ajouterPraticien({
        visiteur: visiteurId, 
        praticien: praticienId 
      });
      res.status(201).json(lien);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // DELETE /visiteurs/:visiteurId/portefeuille/:praticienId
  public retirerPraticien = async (req: Request, res: Response) => {
    try {
      const { visiteurId, praticienId } = req.params;
      await this.portefeuilleService.retirerPraticien(visiteurId, praticienId);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
  // PATCH /visiteurs/:visiteurId/portefeuille
  public arreterSuiviPraticien = async (req: Request, res: Response) => {
    try {
      const { visiteurId } = req.params;
      const { praticienId } = req.body;

      await this.portefeuilleService.arreterSuiviPraticien(visiteurId, praticienId);
      res.status(200).json({ message: 'Suivi du praticien arrêté avec succès.' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}