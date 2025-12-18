import { Types } from "mongoose";

export interface IPortefeuille {
    dateDebutSuivi: Date;
    dateFinSuivi?: Date;
    visiteurId: Types.ObjectId | string;
    praticienId: Types.ObjectId | string;
}

export interface IAddPraticienToPortefeuille {
    dateDebutSuivi?: Date;
    dateFinSuivi?: Date;
    visiteurId: Types.ObjectId | string;
    praticienId: Types.ObjectId | string;
}