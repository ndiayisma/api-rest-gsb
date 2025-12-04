/**
 * Interface représentant un visiteur
 */
export interface IVisiteur {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  tel : string;
  dateEmbauche?: Date;
}


export interface ICreateVisiteur{
    nom: string;
    prenom: string;
    email: string;
    tel : string;
    dateEmbauche?: Date;
}