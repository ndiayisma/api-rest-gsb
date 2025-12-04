import { VisiteurModel, IVisiteurDocument } from '../models/Visiteur';
import { ICreateVisiteur } from '../models/interfaces/IVisiteur';
/**
 * Service pour gérer la logique métier des utilisateurs
 */
export class VisiteurService {
  /**
   * Créer un nouvel utilisateur
   */
  public async createVisiteur(VisiteurData: ICreateVisiteur): Promise<IVisiteurDocument> {
    try {
      // Vérifier si l'email existe déjà
      const existingVisiteur = await VisiteurModel.findOne({ email: VisiteurData.email });
     
      if (existingVisiteur) {
        throw new Error(`Un utilisateur avec l'email ${VisiteurData.email} existe déjà`);
      }
      // Créer et sauvegarder l'utilisateur
      const Visiteur = new VisiteurModel(VisiteurData);
      await Visiteur.save();
      return Visiteur;
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
   * Récupérer tous les utilisateurs
   */
  public async getAllVisiteurs(): Promise<IVisiteurDocument[]> {
    try {
      const Visiteurs = await VisiteurModel.find()
        .sort({ dateCreation: -1 })
        .exec();
      return Visiteurs;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des utilisateurs');
    }
  }


  /**
   * Récupérer un utilisateur par son ID
   */
  public async getVisiteurById(id: string): Promise<IVisiteurDocument | null> {
    try {
      const Visiteur = await VisiteurModel.findById(id).exec();
     
      if (!Visiteur) {
        throw new Error(`Utilisateur avec l'ID ${id} introuvable`);
      }
      return Visiteur;
    } catch (error: any) {
      if (error.name === 'CastError') {
        throw new Error(`ID invalide: ${id}`);
      }
      throw error;
    }
  }

  /**
   * Supprimer un utilisateur par son ID
   */
  public async deleteVisiteur(id: string): Promise<void> {
    try {
      const Visiteur = await VisiteurModel.findByIdAndDelete(id).exec();

      if (!Visiteur) {
        throw new Error(`Visiteur avec l'ID ${id} introuvable`);
      }
    } catch (error: any) {
      if (error.name === 'CastError') {
        throw new Error(`ID invalide: ${id}`);
      }
      throw error;
    }
  }
}
