# Introduction aux Components en Angular

## Qu'est-ce qu'un Component ?

Dans Angular, un component est un élément clé de l'architecture. Il s'agit d'une classe TypeScript décorée par le décorateur `@Component`. Chaque component est normalement associé à un template (HTML) et à ses styles (CSS ou SCSS).

Un component est souvent utilisé pour définir une partie de la page web, comme un en-tête, un pied de page, une barre latérale, etc. Ils peuvent être utilisés isolément ou intégrés dans d'autres components, créant ainsi une hiérarchie.

## Notre exemple: Components de Pâtisserie

Dans ce cours, nous allons créer deux components: `PastriesComponent` pour lister les pâtisseries et `PastrieDetailsComponent` pour afficher les détails d'une pâtisserie spécifique.

Visualisez-le comme une arborescence :

- `AppComponent` (Component racine)
  - `PastriesComponent`
    - `PastrieDetailsComponent`

Notons également que ces components sont enregistrés dans un module, ici `AppModule`, qui est en quelque sorte le conteneur principal de notre application.

## Création d'un Component

Angular CLI nous facilite la tâche avec des commandes prêtes à l'emploi :

1. **Commande longue** :

```bash
ng generate component pastries
```

2. **Commande abrégée** :

```bash
ng g c pastries
```

Lorsque vous exécutez l'une de ces commandes, plusieurs fichiers sont créés dans un nouveau dossier `pastries` sous `src/app`. Regardez à l'intérieur, et vous trouverez:

- Un fichier TypeScript pour la logique du component (`pastries.component.ts`)
- Un fichier HTML pour le template (`pastries.component.html`)
- Un fichier SCSS pour les styles (`pastries.component.scss`)
- Un fichier de test (`pastries.component.spec.ts`)

De plus, Angular CLI met à jour automatiquement le fichier `app.module.ts` pour enregistrer ce nouveau component.

## Modélisation des données

Pour représenter une pâtisserie, nous créons un modèle. Il s'agit d'une simple classe TypeScript. Utilisez la commande CLI :

```bash
ng generate class Pastrie
```

Maintenant, définissez les attributs de la classe `Pastrie` comme indiqué dans l'exercice 9. Assurez-vous de typer chaque attribut pour une meilleure lisibilité et maintenabilité.

## Affichage des données

### Les sélecteurs

Un sélecteur est un nom unique donné à chaque component. Il permet d'insérer ce component dans un autre template. Par exemple, `<app-pastries></app-pastries>` est le sélecteur pour `PastriesComponent`.
La notation `<app-pastries/>` est également acceptée.

### Interpolation

L'interpolation est une fonctionnalité d'Angular qui permet d'afficher dynamiquement des valeurs de votre code TypeScript dans votre template HTML. Utilisez des doubles accolades `{{ variable }}` pour cela.

### Directives Structurelles

`*ngIf` et `*ngFor` sont des directives structurelles fournies par Angular pour ajouter ou supprimer des éléments du DOM en fonction de certaines conditions.

- `*ngIf`: Sert à afficher ou cacher un élément en fonction d'une condition.
- `*ngFor`: Sert à itérer sur un tableau et à afficher un élément pour chaque élément du tableau.

Suivez l'exercice 10 pour voir comment elles fonctionnent en pratique. Assurez-vous de bien comprendre chaque étape et de consulter la documentation officielle si nécessaire.
