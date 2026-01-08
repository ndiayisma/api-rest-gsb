import rateLimit from 'express-rate-limit';

/**
 * Configuration du rate limiter global
 * Limite le nombre de requêtes par IP
 */
export const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // Limite chaque IP à 5 requêtes par fenêtre
  message: {
    error: 'Trop de requêtes depuis cette IP, veuillez réessayer plus tard.',
    retryAfter: '1 minute'
  },
  standardHeaders: true, // Retourne les infos de limite dans les headers `RateLimit-*`
  legacyHeaders: false, // Désactive les headers `X-RateLimit-*`
});

/**
 * Rate limiter pour les routes d'authentification
 * Plus restrictif pour éviter les tentatives de brute force
 */
export const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // Limite chaque IP à 5 tentatives de connexion
  message: {
    error: 'Trop de tentatives de connexion, veuillez réessayer dans 1 minute.',
    retryAfter: '1 minute'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Ne compte pas les requêtes réussies
});

/**
 * Rate limiter pour les routes de création
 * Limite modérée pour les opérations de création
 */
export const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 20, // Limite chaque IP à 20 créations par heure
  message: {
    error: 'Trop de créations depuis cette IP, veuillez réessayer plus tard.',
    retryAfter: '1 heure'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiter pour les routes de lecture
 * Plus permissif pour les opérations de lecture
 */
export const readLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 200, // Limite chaque IP à 200 lectures par fenêtre
  message: {
    error: 'Trop de requêtes de lecture depuis cette IP, veuillez réessayer plus tard.',
    retryAfter: '1 minute'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
