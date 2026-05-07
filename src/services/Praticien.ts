import { PraticienModel, IPraticienDocument } from '../models/Praticien';
import { ICreatePraticien } from '../models/interfaces/IPraticien';
/**PraticienModel
 * Service pour gérer la logique métier des praticiens
 */
export class PraticienService {
  /**
   * Créer un nouveau praticien
   */
  public async createPraticien(praticienData: ICreatePraticien): Promise<IPraticienDocument> {
    try {
      // Vérifier si l'email existe déjà
      const existingPraticien = await PraticienModel.findOne({ email: praticienData.email });
     
      if (existingPraticien) {
        throw new Error(`Un praticien avec l'email ${praticienData.email} existe déjà`);
      }
      // Créer et sauvegarder le praticien
      const praticien = new PraticienModel(praticienData);
      await praticien.save();
      return praticien;
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
   * Récupérer tous les praticiens
   */
  public async getAllPraticiens(): Promise<IPraticienDocument[]> {
    try {
      const praticiens = await PraticienModel.find()
        .populate('specialites', 'id libelle')
        .sort({ dateCreation: -1 })
        .exec();
      return praticiens;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des praticiens');
    }
  }


  /**
   * Récupérer un praticien par son ID
   */
  public async getPraticienById(id: string): Promise<IPraticienDocument | null> {
    try {
      const praticien = await PraticienModel.findById(id)
        .populate('specialites', 'id libelle')
        .exec();
     
      if (!praticien) {
        throw new Error(`Praticien avec l'ID ${id} introuvable`);
      }
      return praticien;
    } catch (error: any) {
      if (error.name === 'CastError') {
        throw new Error(`ID invalide: ${id}`);
      }
      throw error;
    }
  }

  /**
   * Ajouter une spécialité à un praticien
   */
  public async addSpecialiteToPraticien(id: string, specialiteId: string): Promise<IPraticienDocument | null> {
    try {
      const praticien = await PraticienModel.findByIdAndUpdate(
        id,
        { $addToSet: { specialites: specialiteId } },
        { new: true, runValidators: true }
      )
        .populate('specialites', 'id libelle')
        .exec();
     
      if (!praticien) {
        throw new Error(`Praticien avec l'ID ${id} introuvable`);
      }
      return praticien;
    } catch (error: any) {
      if (error.name === 'CastError') {
        throw new Error(`ID invalide: ${id}`);
      }
      throw error;
    }
  }

  /**
   * Retirer une spécialité d'un praticien
   */
  public async removeSpecialiteFromPraticien(id: string, specialiteId: string): Promise<IPraticienDocument | null> {
    try {
      const praticien = await PraticienModel.findByIdAndUpdate(
        id,
        { $pull: { specialites: specialiteId } },
        { new: true, runValidators: true }
      )
        .populate('specialites', 'id libelle')
        .exec();
     
      if (!praticien) {
        throw new Error(`Praticien avec l'ID ${id} introuvable`);
      }
      return praticien;
    } catch (error: any) {
      if (error.name === 'CastError') {
        throw new Error(`ID invalide: ${id}`);
      }
      throw error;
    }
  }
}
