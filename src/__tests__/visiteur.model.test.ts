import { VisiteurModel } from '../models/Visiteur';

describe('VisiteurModel.isJunior', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-03-12T00:00:00.000Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("retourne true si le visiteur n'a pas de date d'embauche", () => {
    const visiteur = new VisiteurModel({
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@example.com',
      tel: '0612345678',
      dateEmbauche: undefined,
    });

    expect(visiteur.isJunior()).toBe(true);
  });

  test('retourne true si le visiteur a été embauché il y a moins de 1 an', () => {
    const visiteur = new VisiteurModel({
      nom: 'Durand',
      prenom: 'Alice',
      email: 'alice.durand@example.com',
      tel: '0611223344',
      dateEmbauche: new Date('2025-07-01T00:00:00.000Z'),
    });

    expect(visiteur.isJunior()).toBe(true);
  });

  test('retourne false si le visiteur a été embauché il y a plus de 1 an', () => {
    const visiteur = new VisiteurModel({
      nom: 'Martin',
      prenom: 'Paul',
      email: 'paul.martin@example.com',
      tel: '0699887766',
      dateEmbauche: new Date('2024-03-11T00:00:00.000Z'),
    });

    expect(visiteur.isJunior()).toBe(false);
  });

  

   
});
