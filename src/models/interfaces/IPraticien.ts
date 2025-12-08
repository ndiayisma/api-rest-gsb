import { IVisite } from "./IVisite";

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
  visites?: IVisite[];
}