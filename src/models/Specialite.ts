import mongoose, { Schema, Model, Document } from 'mongoose';
import { ISpecialite } from './interfaces/ISpecialite';

export type ISpecialiteDocument = ISpecialite & Document;
/**
 * Schéma Mongoose pour Specialite
 */
const specialiteSchema = new Schema<ISpecialiteDocument>(
  {
    libelle: {
      type: String,
      required: [true, 'Le libellé est obligatoire'],
      trim: true,
      minlength: [2, 'Le libellé doit contenir au moins 2 caractères'],
      maxlength: [100, 'Le libellé ne peut pas dépasser 100 caractères']
    }
  },
  {
    versionKey: false
  }
);

export const SpecialiteModel: Model<ISpecialiteDocument> = mongoose.model<ISpecialiteDocument>('Specialite', specialiteSchema);

export default SpecialiteModel;
