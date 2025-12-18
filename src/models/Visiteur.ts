import mongoose, { Schema, Model, Document } from 'mongoose';
import { IVisiteur } from './interfaces/IVisiteur';


export type IVisiteurDocument = IVisiteur & Document;
/**
 * Schéma Mongoose pour Visiteur
 */
const visiteurSchema = new Schema<IVisiteurDocument>(
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
    dateEmbauche: {
      type: Date,
      default: Date.now
    },
  
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },   
    toObject: { virtuals: true },
    id: false 
  }
);

visiteurSchema.virtual('visites', {
  ref: 'Visite',           
  localField: '_id',      
  foreignField: 'visiteurId', 
});

visiteurSchema.virtual('portefeuille', {
  ref: 'Portefeuille',           
  localField: '_id',      
  foreignField: 'visiteurId', 
});


export const VisiteurModel: Model<IVisiteurDocument> = mongoose.model<IVisiteurDocument>('Visiteur', visiteurSchema);