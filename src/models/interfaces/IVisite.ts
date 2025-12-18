import { Types } from "mongoose";

/**
 * Interface représentant une visite
 */
export interface IVisite{
    _id?: string;
    dateVisite: Date;
    motif: string;
    praticienId: Types.ObjectId;
    visiteurId: Types.ObjectId;
    bilan?: string;
    createdAt?: Date;
    updatedAt?: Date;
}


/**
 * Interface pour la création d'un visite
 */
export interface ICreateVisite{
    dateVisite: Date;
    motif: string;
    praticienId: Types.ObjectId;
    visiteurId: Types.ObjectId;
    bilan?: string;
}
