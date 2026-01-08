import { Types } from "mongoose";

export interface IPortefeuille {
    dateDebutSuivi: Date;
    dateFinSuivi?: Date;
    visiteur: Types.ObjectId | string;
    praticien: Types.ObjectId | string;
}

export interface IAddPraticienToPortefeuille {
    dateDebutSuivi?: Date;
    dateFinSuivi?: Date;
    visiteur: string;
    praticien: string;
}