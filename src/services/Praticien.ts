import { PraticienModel } from '../models/Praticien';
import { IPraticienDocument } from '../models/Praticien';
import { ICreatePraticien } from '../models/interfaces/IPraticien';
import { Types } from 'mongoose';

/**
 * Service pour gérer les praticiens
 */
export class PraticienService {
  /**
   * Crée un nouveau praticien
   * @param praticienData Données du praticien à créer
   * @returns Le praticien créé
   */
  public async createPraticien(praticienData: ICreatePraticien): Promise<IPraticienDocument> {
    try {
      const praticien = new PraticienModel({
        nom: praticienData.nom,
        prenom: praticienData.prenom,
        tel: praticienData.tel,
        email: praticienData.email,
        rue: praticienData.rue,
        codePostal: praticienData.codePostal,
        ville: praticienData.ville
      });
      return await praticien.save();
    } catch (error) {
      throw new Error(`Erreur lors de la création du praticien : ${error}`);
    }
  }

  /**
   * Récupère tous les praticiens
   * @returns Liste des praticiens
   */
  public async getAllPraticiens(): Promise<IPraticienDocument[]> {
    try {
      return await PraticienModel.find();
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des praticiens : ${error}`);
    }
  }
    /**
     * Récupère un praticien par son ID
     * @param id ID du praticien
     * @returns Le praticien trouvé ou null
     */
    public async getPraticienById(id: string): Promise<IPraticienDocument | null> {
      try {
        return await PraticienModel.findById(id);
      } catch (error) {
        throw new Error(`Erreur lors de la récupération du praticien : ${error}`);
      }
    }

    /**
     * Supprime un praticien par son ID
     * @param id ID du praticien à supprimer
     * @returns Le praticien supprimé ou null
     */
    public async deletePraticienById(id: string): Promise<IPraticienDocument | null> {
      try {
        return await PraticienModel.findByIdAndDelete(id);
      } catch (error) {
        throw new Error(`Erreur lors de la suppression du praticien : ${error}`);
      }
    }
}