# Introduction à Angular - Installation et environnement de travail

Pour commencer à développer avec Angular, vous devez configurer votre environnement de travail. Cela implique d'installer Node.js, le gestionnaire de paquets npm, et le CLI d'Angular (Command Line Interface). Suivez ces étapes pour préparer votre système à l'utilisation d'Angular.

## Étape 1 : Installation de Node.js et npm

Angular nécessite Node.js pour l'exécution de son environnement côté serveur, et npm (node package manager) pour gérer les dépendances du projet.

1. Téléchargez et installez Node.js depuis le [site officiel](https://nodejs.org/). L'installation de Node.js inclut npm automatiquement.
2. Pour vérifier que Node.js et npm sont bien installés, ouvrez votre terminal et exécutez :

   ```sh
   node --version
   npm --version
   ```

   Ces commandes doivent afficher les versions de Node.js et npm installées.

## Étape 2 : Installation de Angular CLI

Angular CLI est un outil en ligne de commande qui vous aide à créer et gérer vos projets Angular.

1. Installez Angular CLI en exécutant la commande suivante dans votre terminal :

   ```sh
   npm install -g @angular/cli
   ```

2. Vérifiez que l'installation a réussi en vérifiant la version du CLI :

   ```sh
   ng version
   ```

   Cela devrait afficher la version d'Angular CLI que vous venez d'installer.

## Étape 3 : Création d'un nouveau projet

Avec Angular CLI, vous pouvez facilement générer un nouveau projet Angular.

1. Créez un nouveau projet en exécutant :

   ```sh
   ng new nom-du-projet [...options]
   ```

   Remplacez `nom-du-projet` par le nom souhaité pour votre projet.
2. Lorsque vous exécutez cette commande, Angular CLI vous posera quelques questions sur les fonctionnalités que vous souhaitez inclure dans votre projet (par exemple, le routage, le format de style, etc.).

## Étape 4 : Démarrage de l'application Angular

Pour démarrer votre application Angular :

1. Accédez au dossier de votre projet avec :

   ```sh
   cd nom-du-projet
   ```

2. Lancez le serveur de développement avec :

   ```sh
   ng serve
   ```

3. Ouvrez votre navigateur et allez à `http://localhost:4200`. Vous devriez voir l'application Angular en cours d'exécution.

## Conclusion

Vous avez maintenant mis en place l'environnement nécessaire pour développer des applications avec Angular. L'outil CLI va être central dans votre flux de travail, car il vous permet de générer des composants, des services, des classes et d'autres entités, et aussi de construire et déployer votre application.

Dans le prochain cours, nous aborderons l'architecture d'Angular, ce qui vous donnera un aperçu de la structure d'une application Angular et de la façon dont ses différentes parties interagissent.
