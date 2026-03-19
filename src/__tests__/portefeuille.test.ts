jest.mock('../models/Portefeuille');

import { PortefeuilleService } from '../services/Portefeuille';
import { PortefeuilleModel } from '../models/Portefeuille';

describe('PortefeuilleService.getNombrePortefeuille', () => {
  test('retourne 2 pour un visiteur avec 2 praticiens dans son portefeuille', async () => {
    //ARRANGE
    const portefeuilleService = new PortefeuilleService();
    const visiteurId = 'fake-visiteur-id';
    const expectedCount = 2;

    // Mock de la méthode countDocuments pour retourner 2
    (PortefeuilleModel.countDocuments as jest.Mock).mockResolvedValue(expectedCount);

    //ACT
    const result = await portefeuilleService.getNombrePortefeuille(visiteurId);

    //ASSERT
    expect(PortefeuilleModel.countDocuments).toHaveBeenCalledWith({ visiteur: visiteurId });
    expect(result).toBe(expectedCount);
  });

  test('retourne 5 pour un visiteur avec 5 praticiens dans son portefeuille', async () => {
    //ARRANGE
    const portefeuilleService = new PortefeuilleService();
    const visiteurId = 'fake-visiteur-id';
    const expectedCount = 5;

    // Mock de la méthode countDocuments pour retourner 5
    (PortefeuilleModel.countDocuments as jest.Mock).mockResolvedValue(expectedCount);

    //ACT
    const result = await portefeuilleService.getNombrePortefeuille(visiteurId);

    //ASSERT
    expect(PortefeuilleModel.countDocuments).toHaveBeenCalledWith({ visiteur: visiteurId });
    expect(result).toBe(expectedCount);
  });

});