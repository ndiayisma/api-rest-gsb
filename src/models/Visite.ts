import mongoose, { Schema, Model, Document } from 'mongoose';
import { IVisite } from './interfaces/IVisite';


export type IVisiteDocument = IVisite & Document;
/**
 * Schéma Mongoose pour Visiteur
 */
const visiteSchema = new Schema<IVisiteDocument>(
  {
    dateVisite: {
        type: Date,
        default: Date.now,
        required: [true, 'La date de visite est obligatoire']
  },
    motif: {
        type: String,
        required: [true, 'Le motif de la visite est obligatoire'],
        trim: true,
        minlength: [5, 'Le motif doit contenir au moins 5 caractères'],
        maxlength: [200, 'Le motif ne peut pas dépasser 200 caractères']
    },
    praticienId: {
        type: Schema.Types.ObjectId,
        ref: 'Praticien',
        required: [true, 'L\'ID du praticien est obligatoire']
    },
    visiteurId: {
        type: Schema.Types.ObjectId,
        ref: 'Visiteur',
        required: [true, 'L\'ID du visiteur est obligatoire']
    },
    bilan: {
        type: String,
        trim: true,
        maxlength: [500, 'Le bilan ne peut pas dépasser 500 caractères']
    }
  },        
  {
    timestamps: true,
    versionKey: false
  }
);


export const VisiteModel: Model<IVisiteDocument> = mongoose.model<IVisiteDocument>('Visite', visiteSchema);