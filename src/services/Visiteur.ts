import { VisiteurModel, IVisiteurDocument } from '../models/Visiteur';
import { PraticienModel } from '../models/Praticien';
import { ICreateVisiteur } from '../models/interfaces/IVisiteur';
import { Types } from 'mongoose';
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

  /**
   * Ajoute un praticien au portefeuille d'un visiteur
   */
  public async addPraticienToVisiteur(visiteurId: string, praticienId: string): Promise<IVisiteurDocument> {
    try {
      if (!Types.ObjectId.isValid(visiteurId) || !Types.ObjectId.isValid(praticienId)) {
        throw new Error('Identifiant invalide fourni');
      }

      const praticien = await PraticienModel.findById(praticienId).exec();
      if (!praticien) {
        throw new Error(`Praticien avec l'ID ${praticienId} introuvable`);
      }

      const visiteur = await VisiteurModel.findById(visiteurId).exec();
      if (!visiteur) {
        throw new Error(`Visiteur avec l'ID ${visiteurId} introuvable`);
      }

      const alreadyInPortfolio = (visiteur.praticiens || []).some((id) => id.toString() === praticienId);
      if (alreadyInPortfolio) {
        return visiteur;
      }

      visiteur.praticiens?.push(praticienId as any);
      await visiteur.save();
      return visiteur;
    } catch (error: any) {
      throw new Error(error.message || "Erreur lors de l'ajout du praticien au portefeuille");
    }
  }

  /**
   * Récupère les praticiens du portefeuille d'un visiteur
   */
  public async getPraticiensPortefeuille(visiteurId: string): Promise<any[]> {
    try {
      if (!Types.ObjectId.isValid(visiteurId)) {
        throw new Error('Identifiant invalide fourni');
      }

      const visiteur = await VisiteurModel.findById(visiteurId)
        .populate('praticiens')
        .exec();

      if (!visiteur) {
        throw new Error(`Visiteur avec l'ID ${visiteurId} introuvable`);
      }

      return visiteur.praticiens || [];
    } catch (error: any) {
      throw new Error(error.message || 'Erreur lors de la récupération du portefeuille');
    }
  }
}
