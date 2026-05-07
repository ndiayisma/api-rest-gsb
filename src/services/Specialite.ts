import { SpecialiteModel, ISpecialiteDocument } from '../models/Specialite';
import { ICreateSpecialite } from '../models/interfaces/ISpecialite';

/**
 * Service pour gérer les spécialités
 */
export class SpecialiteService {
  /**
   * Crée une nouvelle spécialité
   * @param specialiteData Données de la spécialité à créer
   * @returns La spécialité créée
   */
  public async createSpecialite(specialiteData: ICreateSpecialite): Promise<ISpecialiteDocument> {
    try {
      const specialite = new SpecialiteModel({
        libelle: specialiteData.libelle
      });
      return await specialite.save();
    } catch (error) {
      throw new Error(`Erreur lors de la création de la spécialité : ${error}`);
    }
  }

  /**
   * Récupère toutes les spécialités
   * @returns Liste des spécialités
   */
  public async getAllSpecialites(): Promise<ISpecialiteDocument[]> {
    try {
      return await SpecialiteModel.find();
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des spécialités : ${error}`);
    }
  }
}
