# Express (basique)

## 📘 Introduction à Express.js

Express.js est un framework web léger (qu'on nomme router récemment) et flexible pour Node.js, conçu pour construire des applications web et des API rapidement. Il facilite la création de serveurs robustes grâce à ses fonctions de routage, middlewares, et gestion des requêtes/réponses.

## 🛠️ Configuration de Base

```javascript
// Installation d'Express
import express from 'express';

const app = express();
const PORT = 3000;

app.listen(PORT, () => console.log(`🚀 Server ready at http://localhost:${PORT}`));
```

- Création d'un serveur simple avec Express.

## 🌟 Middlewares

- Les middlewares sont des fonctions exécutées après la réception d'une requête et avant l'envoi d'une réponse.
- **Exemple avec Logger Middleware** :

  ```javascript
  app.use((req, res, next) => {
    console.log(`🔍 Request Type: ${req.method}, Path: ${req.path}`);
    next(); // Passe à la prochaine fonction middleware
  });
  ```

## 🌐 Routage avec Préfixe

- Pour organiser les routes, utilisez des routeurs avec un préfixe.
- **Exemple de Routeur Utilisateur** :

  ```javascript
  const userRouter = express.Router();
  app.use('/users', userRouter);

  userRouter.get('/', (req, res) => res.send('👥 Liste des utilisateurs'));
  ```

## 🔗 Configuration CORS

- CORS (Cross-Origin Resource Sharing) est essentiel pour sécuriser les requêtes entre différentes origines.
- **Configuration CORS Basique** :

  ```javascript
  import cors from 'cors';

  app.use(cors({
    origin: 'http://localhost:4200' // Permet une seule origine
    credentials: true // Permet l'envoi de cookies
  }));
  ```

## 💬 Gestion des Requêtes et Réponses

- **Réponse JSON avec Statut HTTP** :

  ```javascript
  app.get('/info', (req, res) => {
    // Réponse JSON avec statut HTTP 200
    res.status(200).json({ message: '📝 Informations' });
  });
  ```

## 🔎 Lecture des Paramètres

- **Extraction de Paramètres et Query Strings** :

  ```javascript
  app.get('/user/:id', (req, res) => {
    const { id } = req.params; // Accès au paramètre 'id'
    res.send(`🆔 Utilisateur: ${id}`);
  });
  ```
