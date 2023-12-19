# Mongoose et Express

## Introduction

Aujourd'hui, nous allons plonger dans la création d'un serveur Express avec Mongoose. Express est un framework web rapide pour Node.js, et Mongoose est une bibliothèque ODM (Object Data Modeling) pour MongoDB et Node.js.

## 🛠️ Prérequis

- Node.js installé sur votre machine.
- MongoDB installé localement ou un cluster MongoDB Atlas.

## 🌟 Étape 1: Création d'un Projet Express

1. **Initialiser un projet Node.js**:

   ```bash
   mkdir myExpressApp
   cd myExpressApp
   npm init -y
   ```

   Ici, nous avons utilisé l'option `-y` pour accepter toutes les valeurs par défaut. Nous allons donc avoir un fichier `package.json` avec les valeurs par défaut.
   Nous y rajouterons néanmoins le "type" et le "script" pour "npm start":

    ```json
    {
      "name": "myExpressApp",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "type": "module", // ainsi, nous pourrons utiliser la syntaxe ES6 dans notre projet pour les imports
      "scripts": {
         "start": "node server.js"
      },
      "keywords": [],
      "author": "",
      "license": "ISC"
    }
    ```

    En bonus, on peut installer globalement `nodemon`, qui va nous permettre de relancer automatiquement le serveur à chaque modification du code:

    ```bash
    npm i nodemon -g
    ```

    Maintenant, nous pouvons changer le script "start" dans le `package.json`:

    ```json
    {
      "scripts": {
         "start": "nodemon server.js"
      }
    }
    ```

    Désormais, nous pourrons lancer notre serveur avec la commande `npm start`, et il se relancera automatiquement à chaque modification du code.

2. **Installer Express**:

   ```bash
   npm install express
   ```

3. **Créer le Serveur Express** (`server.js`):

   ```js
   const express = require('express');
   const app = express();

   app.get('/', (req, res) => {
     res.send('Hello World!');
   });

   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });
   ```

## 🐍 Étape 2: Intégration de Mongoose

1. **Installer Mongoose**:

   ```bash
   npm install mongoose
   ```

2. **Connexion à MongoDB**:
   - Ajoutez Mongoose à votre `server.js`:

     ```js
     const mongoose = require('mongoose');

     mongoose.connect('mongodb://localhost/myDatabase', {
       useNewUrlParser: true,
       useUnifiedTopology: true
     });

     const db = mongoose.connection;
     db.on('error', console.error.bind(console, 'connection error:'));
     db.once('open', function() {
       console.log("We're connected to the database!");
     });
     ```

## 📚 Étape 3: Création de Modèles Mongoose

1. **Définir un Schéma**:
   - Créez un fichier pour votre modèle, par exemple `User.js`:

     ```js
     const mongoose = require('mongoose');
     const { Schema } = mongoose;

     const userSchema = new Schema({
       name: String,
       age: Number,
       email: String
     });

     const User = mongoose.model('User', userSchema);
     module.exports = User;
     ```

## 🌐 Étape 4: Requêtes Find avec Mongoose

La méthode `find` de Mongoose est essentielle pour interroger des données dans MongoDB. Voici comment vous pouvez l'utiliser efficacement dans votre serveur Express.

1. **Utilisation Basique de Find**:
   - Pour récupérer tous les documents d'une collection :

     ```js
     app.get('/users', (req, res) => {
       User.find({}, (err, users) => {
         if (err) res.status(500).send(err);
         else res.status(200).json(users);
       });
     });
     ```

2. **Find avec Conditions**:
   - Pour filtrer les documents selon des critères spécifiques :

     ```js
     app.get('/users/:age', (req, res) => {
       User.find({ age: req.params.age }, (err, users) => {
         // Gestion des erreurs et réponse
       });
     });
     ```

3. **Sélection de Champs Spécifiques**:
   - Pour sélectionner uniquement certains champs :

     ```js
     User.find({}, 'name age', (err, users) => {
       // Renvoyer uniquement les noms et âges des utilisateurs
     });
     ```

4. **Chainage de Méthodes**:
   - Mongoose permet de chaîner plusieurs méthodes pour des requêtes complexes :

     ```js
     User.find().sort({ age: -1 }).limit(5).exec((err, users) => {
       // Récupérer les 5 utilisateurs les plus âgés
     });
     ```

5. **Gestion des Promesses**:
   - Mongoose `find` renvoie une promesse, permettant d'utiliser `async/await` pour un code plus lisible :

     ```js
     app.get('/users', async (req, res) => {
       try {
         const users = await User.find();
         res.json(users);
       } catch (err) {
         res.status(500).send(err);
       }
     });
     ```

6. **Ajout d'un Utilisateur**:
   - Pour ajouter un nouvel utilisateur :

     ```hs
     app.post('/addUser', (req, res) => {
       const newUser = new User({ name: 'Alice', age: 30, email: 'alice@example.com' });
       newUser.save().then(() => console.log('User created'));
       res.send('User added');
     });
     ```

## 🧩 Étape 5: Middleware et Routes Express

- Utilisez Express middleware pour gérer les requêtes, les réponses et les erreurs.
- Exemple : Logging des requêtes.

  ```js
  app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
  });
  ```

## 🚦 Conclusion

Félicitations ! Vous avez maintenant un serveur Express fonctionnel avec une intégration Mongoose. Vous pouvez créer des modèles, interagir avec MongoDB, et définir des routes pour votre application web.

N'oubliez pas de consulter la documentation officielle d'Express et Mongoose pour approfondir vos connaissances. Bon codage ! 🎉
