import { VisiteModel, IVisiteDocument } from "../models/Visite";
import { ICreateVisite } from "../models/interfaces/IVisite";
import { Types } from "mongoose";
import { VisiteurModel, IVisiteurDocument } from "../models/Visiteur";

/**
 * Service pour gérer les visites
 */
export class VisiteService {
  /**
   * Crée une nouvelle visite
   * @param visiteData Données de la visite à créer
   * @returns La visite créée
   */
public async createVisite(visiteData: ICreateVisite): Promise<IVisiteDocument> {
    try {
      const visite = new VisiteModel({
        dateVisite: visiteData.dateVisite,
        commentaires: visiteData.commentaires,
        visiteur: new Types.ObjectId(visiteData.visiteur)
      });
      return await visite.save();
    } catch (error) {
      throw new Error(`Erreur lors de la création de la visite : ${error}`);
    }
  }

  /**
   * Récupère tous les visiteurs
   * @returns Liste des visiteurs
   */
  public async getAllVisites(): Promise<IVisiteDocument[]> {
    try {
      return await VisiteModel.find();
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des visiteurs : ${error}`);
    }
  }

  /**
   * Récupère un visiteur par son ID
   * @param id ID du visiteur
   * @returns Le visiteur trouvé ou null
   */
  public async getVisiteById(id: string): Promise<IVisiteDocument | null> {
    try {
      return await VisiteModel.findById(id);
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de la visite : ${error}`);
    }
  }
}

