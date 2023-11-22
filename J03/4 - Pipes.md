# Les Pipes en Angular

## Introduction aux Pipes

Les pipes en Angular sont des outils qui transforment, formatent ou manipulent des données directement dans les templates. Angular fournit plusieurs pipes intégrés, et vous pouvez également créer vos propres pipes personnalisés.

## Utilisation des Pipes Intégrés

Angular inclut une variété de pipes intégrés pour des tâches courantes :

1. **Pipe `uppercase`** : Transforme une chaîne de caractères en majuscules.

   ```html
   <div>{{ 'hello world' | uppercase }}</div>
   <!-- Résultat : HELLO WORLD -->
   ```

2. **Pipe `date`** : Formate une date.

   ```html
   <div>{{ today | date:'fullDate' }}</div>
   <div>{{ today | date:'longDate' }}</div>
   <div>{{ today | date:'mediumDate' }}</div>
   <div>{{ today | date:'shortDate' }}</div>
   <!-- Résultat : samedi 18 septembre 2021 (par exemple) -->
   ```

   Ne pas oublier de déclarer `today` dans le composant :

   ```ts
      today: number = Date.now();
   ```

3. **Pipe `currency`** : Formate un nombre en format monétaire.

   ```html
   <div>{{ 150 | currency:'EUR':'symbol' }}</div>
   <!-- Résultat : €150.00 -->
   ```

Vous pouvez voir la documentation complète des pipes intégrés nativement [ici](https://angular.io/api?type=pipe).

## Création d'un Pipe Personnalisé

### Objectif

Créer un pipe personnalisé `pastrieTagColor` pour appliquer des styles de couleur aux badges de tags.

### Génération et Structure de Base

1. Générez le pipe avec Angular CLI :

   ```bash
   ng generate pipe pastrie-tag-color
   ```

2. Le fichier `pastrie-tag-color.pipe.ts` contient une classe `PastrieTagColorPipe` décorée avec `@Pipe`.

### Implémentation du Pipe Personnalisé

1. **Définir la Logique de Transformation** :
   Utilisez `switch...case` dans `transform` pour retourner une classe CSS en fonction de la valeur de `tag`.

   ```ts
   transform(tag: string): string {
     switch (tag) {
       case 'sweet': return 'sweet-class';
       case 'salty': return 'salty-class';
       default: return 'default-class';
     }
   }
   ```

2. **Définir les Classes CSS** :
   Dans votre fichier SCSS, définissez les classes correspondantes.

   ```scss
   .sweet-class { background-color: pink; }
   .salty-class { background-color: lightblue; }
   .default-class { background-color: gray; }
   ```

### Utilisation dans un Template

1. **Appliquer le Pipe** :

   ```html
   <span class="badge {{ tag | pastrieTagColor }}">{{ tag }}</span>
   ```

## Conclusion

Les pipes sont des outils puissants en Angular pour transformer, formater ou manipuler des données directement dans les templates. L'utilisation de pipes intégrés simplifie les tâches courantes telles que la mise en majuscule de texte, la mise en forme de dates ou de monnaies, tandis que la création de pipes personnalisés permet une flexibilité et une personnalisation accrues pour des besoins spécifiques.
