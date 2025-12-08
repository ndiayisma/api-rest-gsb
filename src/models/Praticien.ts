import mongoose, { Schema, Model, Document } from 'mongoose';
import { IPraticien } from './interfaces/IPraticien';

export type IPraticienDocument = IPraticien & Document;
/**
 * Schéma Mongoose pour Praticien
 */
const praticienSchema = new Schema<IPraticienDocument>(
  {
    nom: {
      type: String,
      required: [true, 'Le nom est obligatoire'],
      trim: true,
      minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
      maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères']
    },
    prenom: {
      type: String,
      required: [true, 'Le prénom est obligatoire'],
      trim: true,
      minlength: [2, 'Le prénom doit contenir au moins 2 caractères'],
      maxlength: [50, 'Le prénom ne peut pas dépasser 50 caractères']
    },
    tel: {
      type: String,
      required: [false, 'Le numéro est facultative']
    },
    email: {
      type: String,
      required: [true, "L'email est obligatoire"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Email invalide']
    },
    rue: {
      type: String,
      required: [true, 'La rue est obligatoire'],
      trim: true
    },
    codePostal: {
      type: String,
      required: [true, 'Le code postal est obligatoire'],
      trim: true
    },
    ville: {
      type: String,
      required: [true, 'La ville est obligatoire'],
      trim: true
    },
    visites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visite'
      }
    ]
  },
  {
    versionKey: false
  }
);

export const PraticienModel: Model<IPraticienDocument> = mongoose.model<IPraticienDocument>('Praticien', praticienSchema);

export default PraticienModel;