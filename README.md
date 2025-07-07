
# 🎬 TMDB Movies App

## 📄 Descripció

Aquesta aplicació consisteix en un explorador de pel·lícules basat en l'API pública de The Movie Database (TMDB). 

Funcionalitats principals:

* Registre i login d'usuari (Firebase Auth)

* Visualització de pel·lícules populars

* Accés al detall de cada pel·lícula

* Llistat d'actors principals

* Detall d'actors i la seva filmografia

* Navegació dinàmica entre pel·lícules i actors

* Rutes protegides per a usuaris autenticats


## 💻 Tecnologies Utilitzades

* React
* TypeScript
* React Router DOM
* Vite
* Firebase (Auth)

## 📋 Requisits

* Node.js (versió 18 o superior)
* npm o yarn
* Compte gratuït a [TMDB](https://www.themoviedb.org/) per obtenir una API key
* Navegador web modern

## 🛠️ Instal·lació

1. Clona el repositori:

   ```bash
   git clone https://github.com/el-teu-usuari/tmdb-movies-app.git
   ```


2. Instal·la les dependències:

   ```bash
   npm install
   # o
   yarn install
   ```
   

3. Crea un fitxer `.env` a l’arrel del projecte amb el contingut següent:

   ```env
   # API de The Movie Database
   VITE_TMDB_API_KEY=your_tmdb_api_key_here

   # Configuració de Firebase
   VITE_FIREBASE_API_KEY=your_firebase_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```


## ▶️ Execució

Per executar el projecte en entorn de desenvolupament:

```bash
npm run dev
# o
yarn dev
```

Accedeix a `http://localhost:5173` per veure l'aplicació.


---
