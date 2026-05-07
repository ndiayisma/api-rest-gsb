import { IVisite } from "./IVisite";
import { ISpecialite } from "./ISpecialite";

/**
 * Interface representing a medical practitioner.
 */
export interface IPraticien {
  id: string;
  nom: string;
  prenom: string;
  tel: string;
  email: string;
  rue: string;
  codePostal: string;
  ville: string;
  specialites?: ISpecialite[];
  visites?: IVisite[];
}

export interface ICreatePraticien {
  nom: string;
  prenom: string;
  tel: string;
  email: string;
  rue: string;
  codePostal: string;
  ville: string;
  specialites?: string[];
  visites?: IVisite[];
}