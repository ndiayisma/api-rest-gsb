import { PortefeuilleModel, IPortefeuilleDocument } from '../models/Portefeuille';
import { IAddPraticienToPortefeuille } from '../models/interfaces/IPortefeuille';
import { Types } from 'mongoose';
/**
 * Service pour gérer la logique métier du portefeuille
 */
export class PortefeuilleService {
  
  /**
   * Ajoute un praticien au portefeuille d'un visiteur (Création du lien)
   */
  public async ajouterPraticien(data: IAddPraticienToPortefeuille): Promise<IPortefeuilleDocument> {
    try {
      // Validation des IDs
      if (!data.visiteurId || !data.praticienId) {
        throw new Error('visiteurId et praticienId sont requis');
      }
      const visiteurIdObj = typeof data.visiteurId === 'string' ? new Types.ObjectId(data.visiteurId) : data.visiteurId;
      const praticienIdObj = typeof data.praticienId === 'string' ? new Types.ObjectId(data.praticienId) : data.praticienId;

      const lienExistant = await PortefeuilleModel.findOne({
        visiteurId: visiteurIdObj,
        praticienId: praticienIdObj
      });

      if (lienExistant) {
        throw new Error('Ce praticien est déjà dans le portefeuille de ce visiteur.');
      }

      const nouveauSuivi= new PortefeuilleModel({
        visiteurId: visiteurIdObj,
        praticienId: praticienIdObj,
      });

      await nouveauSuivi.save();
      
      return await nouveauSuivi.populate('praticienId');

    } catch (error: any) {
      if (error.code === 11000) { // Erreur duplicata MongoDB si index unique composite
         throw new Error('Ce lien existe déjà.');
      }
      throw error;
    }
  }

  /**
   * Récupère tout le portefeuille d'un visiteur spécifique
   */
  public async getPortefeuilleByVisiteur(visiteurId: string): Promise<IPortefeuilleDocument[]> {
    try {
      const portefeuille = await PortefeuilleModel.find({ visiteurId })
        .populate('praticienId') // On récupère les infos complètes du Praticien
        .sort({ createdAt: -1 })  // Trie par ajout le plus récent
        .exec();

      return portefeuille;
    } catch (error) {
      throw new Error('Erreur lors de la récupération du portefeuille.');
    }
  }

  /**
   * Retire un praticien du portefeuille
   */
  public async retirerPraticien(visiteurId: string, praticienId: string): Promise<void> {
    try {
      const result = await PortefeuilleModel.findOneAndDelete({
        visiteurId,
        praticienId
      });

      if (!result) {
        throw new Error('Lien introuvable dans le portefeuille.');
      }
    } catch (error) {
      throw error;
    }
  }
}