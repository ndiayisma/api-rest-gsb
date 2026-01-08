import mongoose, { Schema, Model, Document } from 'mongoose';
import { IPortefeuille } from './interfaces/IPortefeuille';


export type IPortefeuilleDocument = IPortefeuille & Document;
/**
 * Schéma Mongoose pour Portefeuille
 */
const portefeuilleSchema = new Schema<IPortefeuilleDocument>(
  {
    dateDebutSuivi: {
        type: Date,
        default: Date.now,
        required: [true, 'La date de début de suivi est obligatoire']
  },
    dateFinSuivi: {
        type: Date,
        required: false
    },
    praticien: {
        type: Schema.Types.ObjectId,
        ref: 'Praticien',
        required: [true, 'L\'ID du praticien est obligatoire']
    },
    visiteur: {
        type: Schema.Types.ObjectId,
        ref: 'Visiteur',
        required: [true, 'L\'ID du visiteur est obligatoire']
    }
  },        
  {
    timestamps: true,
    versionKey: false
  }
);


export const PortefeuilleModel: Model<IPortefeuilleDocument> = mongoose.model<IPortefeuilleDocument>('Portefeuille', portefeuilleSchema);