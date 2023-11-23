# Sujet d'évaluation : Création d'une application Angular One-Page avec communication entre composants

## Objectif du TP

Développez une application Angular à page unique en démontrant votre compréhension des composants Angular, ainsi que l'utilisation des décorateurs `@Input` et `@Output` pour la communication entre composants. Vous êtes libre de choisir le thème de l'application.

Vous créerez votre application à partir de zéro en utilisant la commande:

```bash
ng new (nom-du-projet) --no-standalone
```

et vous l'ajouterez à un dépôt GitHub (obligatoire), ou GitLab ou n'importe quelle plateforme Git en fait. Pensez à ajouter un fichier `.gitignore` pour ne pas inclure les fichiers inutiles dans votre dépôt (comme `node_modules` par exemple). Et n'oubliez pas de faire des commits réguliers avec des messages clairs et concis.

Profitez en pour faire en sorte que vous puissiez réutiliser ce projet pour un side project ou pour entraîner vos compétences en Angular par la suite avec les notions qu'on verra les semaines suivantes.

## Détails du projet

Votre application doit comprendre plusieurs composants. Une communication claire doit être établie entre au moins deux composants en utilisant à la fois `@Input` et `@Output`, des directives structurelles, des pipes et des formulaires pilotés par le template (Template Driven Form).

## Fonctionnalités requises

1. **Composants de l'application** :
   - Créez une application avec au moins trois composants.
   - Établissez une communication entre au moins deux composants en utilisant à la fois `@Input` et `@Output` (pas forcément dans le même composant)

2. **Interaction utilisateur et formulaire** :
   - Implémentez un formulaire piloté par le template (Template Driven Form) pour recueillir des données utilisateur.
   - **(Bonus)** Le formulaire doit interagir avec d'autres composants de l'application.

3. **Affichage dynamique des données** :
   - Utilisez les directives structurelles telles que `*ngFor` ou `*ngIf` pour afficher des éléments.
   - Employez des pipes pour formater les données affichées.

4. **Utilisation de services** :
   - Utilisez un service pour récupérer des données à partir d'un mock ou de n'importe quelle source de données.

## Critères d'évaluation

- **Structure et organisation** : Bonne architecture des composants et clarté du code.
- **Communication entre composants** : Mise en œuvre correcte des décorateurs `@Input` et `@Output`.
- **Gestion des formulaires** : Création d'un formulaire piloté par le template avec interaction appropriée avec les composants.
- **Manipulation des données** : Utilisation efficace des directives structurelles et/ou des pipes.
- **Conception de l'UI** : Interface simple et intuitive. L'utilisation de Bootstrap ou autre librarie CSS (chakra-ui, tailwind, etc...) est autorisée et encouragée pour le style.

## Tâches Bonus

1. **Style et Design** :
   - Quelque chose de beau visuellement compte comme un bonus.

2. **Validation de Formulaire** :
   - Ajoutez une validation au formulaire et affichez des messages d'erreur pour les entrées utilisateur non valides, c'est sympa si c'est dynamique :)

Ce TP est une votre opportunité pour vous de mettre en pratique vos compétences en Angular acquises cette semaine, en particulier dans la communication entre composants et la gestion de formulaires. Bon travail et bon courage !
