import { Request, Response } from 'express';
import { VisiteurService } from '../services/Visiteur';


export class VisiteurController {
  private visiteurService: VisiteurService;

  constructor() {
    this.visiteurService = new VisiteurService();
  }


  /**
   * POST /api/visiteurs - Créer un visiteur
   */
  public creerUnCompte = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log('Données reçues pour la création du visiteur:', req.body);
    const { nom, prenom, email, password, tel, dateEmbauche } = req.body;
   
    const visiteurData = {
      nom,
      prenom,
      email,
      password,
      tel,
      dateEmbauche
    };


    console.log('Données du visiteur à créer:', visiteurData);


      const visiteur = await this.visiteurService.creerUnCompte(visiteurData);
     
      res.status(201).json({
        success: true,
        message: 'Visiteur créé avec succès',
        data: visiteur
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Erreur lors de la création'
      });
    }
  };


 public seConnecter = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log('Données reçues pour la connexion du visiteur:', req.body);
    const { email, password } = req.body;


      const { token, visiteur } = await this.visiteurService.seConnecter(email, password);


      res.status(200).json({
        success: true,
        message: 'Connexion réussie',
        token,
        email: visiteur.email,
        nom: visiteur.nom,
        prenom: visiteur.prenom
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message || 'Erreur lors de la connexion'
      });
    }
  };

  /**
   * GET /api/visiteurs - Récupérer tous les visiteurs
   */
  public getAllVisiteurs = async (req: Request, res: Response): Promise<void> => {
    try {
      const visiteurs = await this.visiteurService.getAllVisiteurs();
     
      res.status(200).json({
        success: true,
        count: visiteurs.length,
        data: visiteurs
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Erreur lors de la récupération'
      });
    }
  };
  /**
   * GET /api/visiteurs/:id - Récupérer un visiteur par ID
   */
  public getVisiteurById = async (req: Request, res: Response): Promise<void> => {
    try {
      const visiteur = await this.visiteurService.getVisiteurById(req.params.id);
     
      res.status(200).json({
        success: true,
        data: visiteur
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || 'Visiteur introuvable'
      });
    }
  };



}
