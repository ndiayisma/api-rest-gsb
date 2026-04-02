/// <reference types="jest" />

import { VisiteurService } from '../services/Visiteur';
import { VisiteurModel } from '../models/Visiteur';
import { ICreateVisiteur } from '../models/interfaces/IVisiteur';

jest.mock('../models/Visiteur', () => {
  const mockFindOne = jest.fn();
  const mockFindById = jest.fn();
  const mockSave = jest.fn();

  const mockChain = {
    select: jest.fn().mockReturnThis(),
    exec: jest.fn(),
  };

  const MockVisiteurModel = jest.fn().mockImplementation((data: unknown) => ({
    ...((data as Record<string, unknown>) || {}),
    save: mockSave,
  }));

  Object.assign(MockVisiteurModel, {
    findOne: mockFindOne,
    findById: mockFindById.mockReturnValue(mockChain),
  });

  return {
    VisiteurModel: MockVisiteurModel,
  };
});

describe('VisiteurService.createVisiteur', () => {
  const visiteurData: ICreateVisiteur = {
    nom: 'Dupont',
    prenom: 'Jean',
    email: 'jean.dupont@example.com',
    password: 'password',
    tel: '0612345678',
  };

  const MockedVisiteurModel = VisiteurModel as unknown as jest.Mock & {
    findOne: jest.Mock;
  };

  let service: VisiteurService;

  beforeEach(() => {
    service = new VisiteurService();
    MockedVisiteurModel.mockClear();
    MockedVisiteurModel.findOne.mockReset();
  });

  test('cas nominal: crée un visiteur quand l\'email est libre', async () => {
    MockedVisiteurModel.findOne.mockResolvedValue(null);

    const createdVisiteur = {
      ...visiteurData,
      _id: 'fake-id',
      save: jest.fn().mockResolvedValue(undefined),
    };

    MockedVisiteurModel.mockImplementationOnce(() => createdVisiteur);

    const result = await service.creerUnCompte(visiteurData);

    expect(MockedVisiteurModel.findOne).toHaveBeenCalledWith({ email: visiteurData.email });
    expect(createdVisiteur.save).toHaveBeenCalledTimes(1);
    expect(result).toBe(createdVisiteur);
  });

  test('cas d\'erreur: lève une erreur si email déjà existant', async () => {
    MockedVisiteurModel.findOne.mockResolvedValue({ _id: 'already-exists' });

    await expect(service.creerUnCompte(visiteurData)).rejects.toThrow(
      `Un visiteur avec l'email ${visiteurData.email} existe déjà`
    );

    expect(MockedVisiteurModel.findOne).toHaveBeenCalledWith({ email: visiteurData.email });
    expect(MockedVisiteurModel).not.toHaveBeenCalled();
  });

  test('cas d\'erreur: reformate les erreurs de validation Mongoose', async () => {
    MockedVisiteurModel.findOne.mockResolvedValue(null);

    const validationError = {
      name: 'ValidationError',
      errors: {
        email: { message: 'Email invalide' },
        nom: { message: 'Le nom est obligatoire' },
      },
    };

    const createdVisiteur = {
      ...visiteurData,
      save: jest.fn().mockRejectedValue(validationError),
    };

    MockedVisiteurModel.mockImplementationOnce(() => createdVisiteur);

    await expect(service.creerUnCompte(visiteurData)).rejects.toThrow(
      'Validation échouée: Email invalide, Le nom est obligatoire'
    );

    expect(MockedVisiteurModel.findOne).toHaveBeenCalledWith({ email: visiteurData.email });
    expect(createdVisiteur.save).toHaveBeenCalledTimes(1);
  });
});

describe('VisiteurService.getVisiteurById', () => {
  const visiteurId = '507f1f77bcf86cd799439011';

  const MockedVisiteurModel = VisiteurModel as unknown as jest.Mock & {
    findById: jest.Mock;
  };

  let service: VisiteurService;

  beforeEach(() => {
    service = new VisiteurService();
    jest.clearAllMocks();
  });

  test('cas nominal: récupère un visiteur par son ID', async () => {
    const mockVisiteur = {
      _id: visiteurId,
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@example.com',
    };

    const mockChain = {
      select: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(mockVisiteur),
    };

    MockedVisiteurModel.findById.mockReturnValue(mockChain);

    const result = await service.getVisiteurById(visiteurId);

    expect(MockedVisiteurModel.findById).toHaveBeenCalledWith(visiteurId);
    expect(mockChain.select).toHaveBeenCalledWith('nom prenom');
    expect(mockChain.exec).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockVisiteur);
  });

  test('cas d\'erreur: lève une erreur si le visiteur n\'existe pas', async () => {
    const mockChain = {
      select: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(null),
    };

    MockedVisiteurModel.findById.mockReturnValue(mockChain);

    await expect(service.getVisiteurById(visiteurId)).rejects.toThrow(
      `Utilisateur avec l'ID ${visiteurId} introuvable`
    );

    expect(MockedVisiteurModel.findById).toHaveBeenCalledWith(visiteurId);
    expect(mockChain.exec).toHaveBeenCalledTimes(1);
  });

  test('cas d\'erreur: gère les IDs invalides avec CastError', async () => {
    const invalidId = 'invalid-id';
    const castError = new Error('Invalid ObjectId');
    castError.name = 'CastError';

    const mockChain = {
      select: jest.fn().mockReturnThis(),
      exec: jest.fn().mockRejectedValue(castError),
    };

    MockedVisiteurModel.findById.mockReturnValue(mockChain);

    await expect(service.getVisiteurById(invalidId)).rejects.toThrow(
      `ID invalide: ${invalidId}`
    );

    expect(MockedVisiteurModel.findById).toHaveBeenCalledWith(invalidId);
    expect(mockChain.exec).toHaveBeenCalledTimes(1);
  });
});
