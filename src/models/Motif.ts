import mongoose, { Schema, Model, Document } from 'mongoose';
import { IMotif } from './interfaces/IMotif';

export type IMotifDocument = IMotif & Document;
/**
 * Schéma Mongoose pour Motif
 */
const motifSchema = new Schema<IMotifDocument>(
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

export const MotifModel: Model<IMotifDocument> = mongoose.model<IMotifDocument>('Motif', motifSchema);

export default MotifModel;