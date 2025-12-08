import mongoose, { Schema, Model, Document } from 'mongoose';
import { IVisite } from './interfaces/IVisite';


export type IVisiteDocument = IVisite & Document;
/**
 * Schéma Mongoose pour Visite
 */
const visiteSchema = new Schema<IVisiteDocument>(
  {
    dateVisite: {
      type: Date,
      required: [true, 'La date de visite est obligatoire'],
      default: Date.now
    },
    commentaires: {
      type: String,
      trim: true,
      maxlength: [500, 'Les commentaires ne peuvent pas dépasser 500 caractères']
    },
    visiteur: {
      type: Schema.Types.ObjectId,
      ref: 'Visiteur',
      required: [true, 'Le visiteur est obligatoire']
    },
    praticien: {
      type: Schema.Types.ObjectId,
      ref: 'Praticien',
      required: [true, 'Le praticien est obligatoire']
    }
  },
  {
    versionKey: false
  }
);

export const VisiteModel: Model<IVisiteDocument> = mongoose.model<IVisiteDocument>('Visite', visiteSchema);

export default VisiteModel;