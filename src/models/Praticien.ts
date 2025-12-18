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
    email: {
      type: String,
      required: [true, "L'email est obligatoire"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Email invalide']
    },
    tel: {
      type: String,
      required: [true, 'Le numéro de téléphone est obligatoire'],
      trim: true,
      match: [/^(?:(?:\+|00)33|0)[1-9](?:[0-9]{8})$/, 'Numéro de téléphone français invalide (ex: 0612345678 ou +33612345678)']
    },
    rue: {
      type: String,
      trim: true,
      minlength: [2, 'La rue doit contenir au moins 2 caractères'],
      maxlength: [100, 'La rue ne peut pas dépasser 100 caractères']
    },
    ville: {
      type: String,
      trim: true,
      minlength: [2, 'La ville doit contenir au moins 2 caractères'],
      maxlength: [100, 'La ville ne peut pas dépasser 100 caractères']
    },
    codePostal: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Index sur email pour optimiser les recherches
praticienSchema.index({ email: 1 });

export const PraticienModel: Model<IPraticienDocument> = mongoose.model<IPraticienDocument>('Praticien', praticienSchema);