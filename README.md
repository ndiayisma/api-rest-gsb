# GSB-API/Appel d'un Api via Postman

## 💊Contexte

Dans le cadre d'un projet de développement débutant de septembre 2024 à Avril 2025, le but est de réaliser un application mobile avec Android Studio qui permettra aux visiteurs de consulter et voir en détails les visites des praticiens disponibles
Mais Avec L'API d'Express.JS, ces tâches seront facilités la gestion et rapport des visites des praticiens et visiteurs

## 🪛Configuration Système recommandé

- Windows 10/11
- macOS Ventura (Version 13) ou ultérieure
- Version Linux datant d'après 2022
- **16 Go** de Stockage HDD minumum
- **8 Go** de RAM minimum

## 🗃️Architecture utilisés

- **Android Studio** (utilisé pour le développement mobile) : https://developer.android.com/studio?hl=fr
- **Postman** (pour récupérer les APIs et les données)
- **ExpressJS** **(afin de le connecter à l'API)**  : https://nodejs.org/en/download (à le télecharger)
- **MongoDB**
- **JWT (JSON Web Token)** : Pour une authentification plus sécurisé
- **Express-rate-limit** : Protection contre les attaques par force brute sur l’authentification.

## 🔐Avantages d'utiliser une API

L'utilisation d'un API permet de garantir une navigation plus sécurisé et une protection des données chiffrés qui plus est :
- Bcrypt permet de hasher le mot de passe
- Une Authentification avec Token sécurisé selon le délai choisi (1 heure est fortement recommandé)
- Protège contre les attaques tels que les force brutes, XSS, Man-In-The-Middle

## 📈Mode d'emploi pour déployer l'API
1. **Clôner le dépôt du repository suivant :**
```bash
git clone https://github.com/SIO-LGF/gsb-api-ismail.git
cd backend/src
```
2. **Installer les dépendances disponibles**
```bash
# Installer les dépendances
npm init -y
npm install
```
3. **Démarrer le serveur**
```bash
npx ts-node server.ts
```
4. **Créer un fichier .env qui pourrait être utilisé par le biais de MongoDB**
   1. Se Connecter sur MongoDB: https://account.mongodb.com/account/login
   2. Aller dans Cluster puis dans Connect et dans le terminal d'ExpressJS, installer Mongoose avec cette commande 
```bash
npm install mongodb
```
   3. Sur app.ts, collez cette ligne de code
      ```bash
      const uri = "mongodb+srv://ismailndiaye:<db_password>@cluster0.7n7br6p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
      ```
   4.  Ensuite définissez les variables de .env
      ```bash
      # .env
PORT=3000
MONGODB_USERNAME=ragunazaburaddoeji
MONGODB_PASSWORD=non_je_vais_pas_dévoiler
MONGODB_CLUSTER_URL=le_cluster_qui_est_defini_dans_mongodb
MONGODB_DB_NAME=nom_du_bdd
MONGOOSE_ENCRYPTION_SECRET=jouez_a_blazblue
JWT_SECRET="jeton_secret"
      ```

## Exemple avec Postman

Ici, on crée une variable qui permet de se logger et récupérer le token de l'utilisateur
![image](https://github.com/user-attachments/assets/12d061b3-2534-485a-9c3a-363809663e1f)

Sur la requête GetVisites, nous allons utiliser l'autorisation BearerToken afin d'implémenter le token récupéré lors du login
![image](https://github.com/user-attachments/assets/24fa742e-d01c-4efd-9b8e-5c8fc6cd3df4)

A noter que la variable {{API_URL}} est le lien de votre codespace en Sortie
