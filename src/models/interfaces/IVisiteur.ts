import { Types } from "mongoose";
import { IVisite } from "./IVisite"; 
import { IPortefeuille } from "./IPortefeuille"; 


/**
 * Interface représentant un visiteur
 */
export interface IVisiteur{
  _id?: string;
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  dateEmbauche?: Date;
  createdAt?: Date;
  updatedAt?: Date;

  visites?: IVisite[]; 
  portefeuille?: IPortefeuille[];

}


/**
 * Interface pour la création d'un visiteur
 */
export interface ICreateVisiteur {
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  dateEmbauche?: Date;
}
