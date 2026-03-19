import { VisiteurService } from '../services/Visiteur';
import { VisiteurModel } from '../models/Visiteur';
import { ICreateVisiteur } from '../models/interfaces/IVisiteur';

jest.mock('../models/Visiteur', () => {
  const mockFindOne = jest.fn();
  const mockSave = jest.fn();

  const MockVisiteurModel = jest.fn().mockImplementation((data: unknown) => ({
    ...((data as Record<string, unknown>) || {}),
    save: mockSave,
  }));

  Object.assign(MockVisiteurModel, {
    findOne: mockFindOne,
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

    const result = await service.createVisiteur(visiteurData);

    expect(MockedVisiteurModel.findOne).toHaveBeenCalledWith({ email: visiteurData.email });
    expect(createdVisiteur.save).toHaveBeenCalledTimes(1);
    expect(result).toBe(createdVisiteur);
  });

  test('cas d\'erreur: lève une erreur si email déjà existant', async () => {
    MockedVisiteurModel.findOne.mockResolvedValue({ _id: 'already-exists' });

    await expect(service.createVisiteur(visiteurData)).rejects.toThrow(
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

    await expect(service.createVisiteur(visiteurData)).rejects.toThrow(
      'Validation échouée: Email invalide, Le nom est obligatoire'
    );

    expect(MockedVisiteurModel.findOne).toHaveBeenCalledWith({ email: visiteurData.email });
    expect(createdVisiteur.save).toHaveBeenCalledTimes(1);
  });
});
