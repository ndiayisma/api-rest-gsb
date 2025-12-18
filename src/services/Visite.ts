
import { VisiteModel, IVisiteDocument } from '../models/Visite';
import { ICreateVisiteur } from '../models/interfaces/IVisiteur';
/**VisiteModel
 * Service pour gérer la logique métier des visites
 */
export class VisiteService {
  /**
   * Créer une nouvelle visite
   */
  public async createVisite(visiteData: ICreateVisiteur): Promise<IVisiteDocument> {
    try {
      
      // Créer et sauvegarder la visite
      const visite = new VisiteModel(visiteData);
      await visite.save();
      return visite;
    } catch (error: any) {
      // Gestion des erreurs de validation Mongoose
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((err: any) => err.message);
        throw new Error(`Validation échouée: ${messages.join(', ')}`);
      }
      throw error;
    }
  }


  /**
   * Récupérer toutes les visites
   */
  public async getAllVisites(): Promise<IVisiteDocument[]> {
    try {
      const visites = await VisiteModel.find().populate('visiteurId')
        .sort({ dateVisite: -1 })
        .exec();
      return visites;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des visites');
    }
  }


  /**
   * Récupérer une visite par son ID
   */
  public async getVisiteById(id: string): Promise<IVisiteDocument | null> {
    try {
      const visite = await VisiteModel.findById(id).exec();

      if (!visite) {
        throw new Error(`Visite avec l'ID ${id} introuvable`);
      }
      return visite;
    } catch (error: any) {
      if (error.name === 'CastError') {
        throw new Error(`ID invalide: ${id}`);
      }
      throw error;
    }
  }
}
