import { IVisiteur } from './IVisiteur';
import { IPraticien } from './IPraticien';
/**
 * Interface représentant un visiteur
 */
export interface IVisite {
  id: string;
  dateVisite: Date;
  commentaires?: string;
  visiteur : IVisiteur;
  praticien : IPraticien;
}


export interface ICreateVisite{
    dateVisite: Date;
    commentaires?: string;
    visiteur? : string;
    praticien? : string;
}