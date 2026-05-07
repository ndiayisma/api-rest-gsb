import { VisiteurModel, IVisiteurDocument } from '../models/Visiteur';
import { PraticienModel } from '../models/Praticien';
import { PortefeuilleModel } from '../models/Portefeuille';
import { ICreateVisiteur } from '../models/interfaces/IVisiteur';
import { Types } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
/**
 * Service pour gérer la logique métier des utilisateurs
 */
export class VisiteurService {
  /**
   * Créer un nouvel utilisateur
   */
  public async creerUnCompte(visiteurData: ICreateVisiteur): Promise<IVisiteurDocument> {


    try {
      // Vérifier si l'email existe déjà
      const existingVisiteur = await VisiteurModel.findOne({ email: visiteurData.email });


      if (existingVisiteur) {
        throw new Error(`Un visiteur avec l'email ${visiteurData.email} existe déjà`);
      }
      // Créer et sauvegarder le visiteur
      const hashedPassword = await bcrypt.hash(visiteurData.password, 10);
      const visiteur = new VisiteurModel({
        email: visiteurData.email,
        password: hashedPassword,
        nom: visiteurData.nom,
        prenom: visiteurData.prenom,
        tel: visiteurData.tel
      });
      await visiteur.save();
      return visiteur
    } catch (error: any) {
      // Gestion des erreurs de validation Mongoose
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((err: any) => err.message);
        const errorMessage = `Validation échouée: ${messages.join(', ')}`;
        console.error('[ValidationError]', errorMessage);
        throw new Error(errorMessage);
      }
      console.error('[Error]', error);
      throw error;
    }
  }


  public async seConnecter(email: string, password: string): Promise<{ token: string; visiteur: IVisiteurDocument }> {
    try {
      const visiteur = await VisiteurModel.findOne({ email });


      if (!visiteur) {
        throw new Error('Email ou mot de passe incorrect');
      }
      const isPasswordValid = await bcrypt.compare(password, visiteur.password);
      if (!isPasswordValid) {
        throw new Error('Email ou mot de passe incorrect');
      }
      const token = jwt.sign(
        { userId: visiteur._id, role: 'visiteur' },
        process.env.JWT_SECRET as string,
        { expiresIn: '30m', algorithm: 'HS256' }
      );
      return { token, visiteur };




    } catch (error: any) {
      if (error.name === 'CastError') {
        throw new Error(`Error lors de la connexion: ${error.message}`);
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
        .select('nom prenom')
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
      const Visiteur = await VisiteurModel.findById(id)
      .select('nom prenom')
      .exec();
     
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

      const alreadyInPortfolio = await PortefeuilleModel.findOne({
        visiteur: visiteurId,
        praticien: praticienId,
      }).exec();
      if (alreadyInPortfolio) {
        return visiteur;
      }

      await PortefeuilleModel.create({
        visiteur: visiteurId,
        praticien: praticienId,
      });
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

      const visiteur = await VisiteurModel.findById(visiteurId).exec();

      if (!visiteur) {
        throw new Error(`Visiteur avec l'ID ${visiteurId} introuvable`);
      }

      const portefeuille = await PortefeuilleModel.find({ visiteur: visiteurId })
        .populate('praticien')
        .exec();

      return portefeuille.map((item) => item.praticien);
    } catch (error: any) {
      throw new Error(error.message || 'Erreur lors de la récupération du portefeuille');
    }
  }
}
