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
      const lienExistant = await PortefeuilleModel.findOne({
        visiteur: data.visiteur,
        praticien: data.praticien,
      });

      if (lienExistant) {
        throw new Error('Ce praticien est déjà dans le portefeuille de ce visiteur.');
      }

      const nouveauSuivi= new PortefeuilleModel({
        visiteur: data.visiteur,
        praticien: data.praticien,

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
        .populate('praticienId', 'nom prenom') // On récupère les infos complètes du Praticien
        .sort({ createdAt: -1 })  // Trie par ajout le plus récent
        .select('-__v  -createdAt -updatedAt') // Exclure les champs inutiles
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

  /**
   * Arrêter de suivre un praticien (marquer comme inactif)
   */
  public async arreterSuiviPraticien(visiteurId: string, praticienId: string): Promise<void> {
    try {
      const suivi = await PortefeuilleModel.findOneAndUpdate({
        visiteur : visiteurId,
        praticien : praticienId,
      }, {
        dateFinSuivi: new Date(),
      });

      if (!suivi) {
        throw new Error('Lien introuvable dans le portefeuille.');
      }
    } catch (error) {
      throw error;
    }
  }
}