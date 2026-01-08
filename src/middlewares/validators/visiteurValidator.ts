import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';

/**
 * Middleware pour valider les erreurs de validation
 */
const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array() 
    });
  }
  next();
};

/**
 * Validation pour la création d'un visiteur
 */
export const validateCreateVisiteur = [
  body('nom')
    .trim()
    .notEmpty().withMessage('Le nom est obligatoire')
    .isString().withMessage('Le nom doit être une chaîne de caractères')
    .isLength({ min: 2, max: 50 }).withMessage('Le nom doit contenir entre 2 et 50 caractères')
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/).withMessage('Le nom contient des caractères invalides'),
  
  body('prenom')
    .notEmpty().withMessage('Le prénom est obligatoire')
    .isString().withMessage('Le prénom doit être une chaîne de caractères')
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/).withMessage('Le prénom contient des caractères invalides')
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('Le prénom doit contenir entre 2 et 50 caractères'),
  
  body('email')
    .notEmpty().withMessage("L'email est obligatoire")
    .isEmail().withMessage("L'email doit être valide")
    .normalizeEmail()
    .trim(),
  
  body('tel')
    .notEmpty().withMessage('Le numéro de téléphone est obligatoire')
    .trim()
    .matches(/^(?:(?:\+|00)33|0)[1-9](?:[0-9]{8})$/)
    .withMessage('Numéro de téléphone français invalide (ex: 0612345678 ou +33612345678)'),
  
  body('dateEmbauche')
    .optional()
    .isISO8601().withMessage('La date d\'embauche doit être une date valide')
    .toDate(),
  
  handleValidationErrors
];

/**
 * Validation pour la mise à jour d'un visiteur
 */
export const validateUpdateVisiteur = [
  param('id')
    .notEmpty().withMessage("L'ID est obligatoire")
    .isMongoId().withMessage("L'ID doit être un ID MongoDB valide"),
  
  body('nom')
    .optional()
    .isString().withMessage('Le nom doit être une chaîne de caractères')
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('Le nom doit contenir entre 2 et 50 caractères'),
  
  body('prenom')
    .optional()
    .isString().withMessage('Le prénom doit être une chaîne de caractères')
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('Le prénom doit contenir entre 2 et 50 caractères'),
  
  body('email')
    .optional()
    .isEmail().withMessage("L'email doit être valide")
    .normalizeEmail()
    .trim(),
  
  body('tel')
    .optional()
    .trim()
    .matches(/^(?:(?:\+|00)33|0)[1-9](?:[0-9]{8})$/)
    .withMessage('Numéro de téléphone français invalide (ex: 0612345678 ou +33612345678)'),
  
  body('dateEmbauche')
    .optional()
    .isISO8601().withMessage('La date d\'embauche doit être une date valide')
    .toDate(),
  
  handleValidationErrors
];

/**
 * Validation pour récupérer un visiteur par ID
 */
export const validateGetVisiteurById = [
  param('id')
    .notEmpty().withMessage("L'ID est obligatoire")
    .isMongoId().withMessage("L'ID doit être un ID MongoDB valide"),
  
  handleValidationErrors
];

/**
 * Validation pour supprimer un visiteur
 */
export const validateDeleteVisiteur = [
  param('id')
    .notEmpty().withMessage("L'ID est obligatoire")
    .isMongoId().withMessage("L'ID doit être un ID MongoDB valide"),
  
  handleValidationErrors
]; 