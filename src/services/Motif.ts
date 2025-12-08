import { MotifModel, IMotifDocument } from '../models/Motif';
import { ICreateMotif } from '../models/interfaces/IMotif';

/**
 * Service pour gérer les motifs
 */
export class MotifService {
  /**
   * Crée un nouveau motif
   * @param motifData Données du motif à créer
   * @returns Le motif créé
   */
  public async createMotif(motifData: ICreateMotif): Promise<IMotifDocument> {
    try {
      const motif = new MotifModel({
        libelle: motifData.libelle
      });
      return await motif.save();
    } catch (error) {
      throw new Error(`Erreur lors de la création du motif : ${error}`);
    }
  }

  /**
   * Récupère tous les motifs
   * @returns Liste des motifs
   */
  public async getAllMotifs(): Promise<IMotifDocument[]> {
    try {
      return await MotifModel.find();
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des motifs : ${error}`);
    }
  }
}