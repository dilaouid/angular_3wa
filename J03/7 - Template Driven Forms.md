# Template Driven Forms en Angular

## Introduction aux Types de Formulaires en Angular

Angular propose deux approches pour créer des formulaires :

1. **Template Driven Forms** : Les formulaires sont principalement gérés dans le template HTML. Angular crée automatiquement l'objet de formulaire correspondant qui peut être exploité dans le TypeScript.
2. **Reactive Forms** : Les formulaires sont créés et gérés dynamiquement dans le TypeScript, offrant plus de contrôle et de flexibilité.

## Création d'un Template Driven Form

### Objectif

Développer un moteur de recherche simple dans votre application Angular en utilisant un formulaire piloté par le template.

### Préparation

1. **Importation du FormsModule** :
   - Dans votre module principal (habituellement `app.module.ts`), importez `FormsModule` pour activer les formulaires pilotés par le template.

     ```ts
     import { FormsModule } from '@angular/forms';

     @NgModule({
       imports: [
         FormsModule
         // autres imports...
       ],
       // déclarations, providers, bootstrap...
     })
     export class AppModule { }
     ```

### Exercice 16 : Création du Composant de Recherche

1. **Génération du Composant Search** :
   - Utilisez Angular CLI pour générer un nouveau composant `SearchComponent`.
   - Placez le sélecteur de ce composant (`<app-search></app-search>`) dans le template du `PastriesComponent`.

### Exercice 17 : Implémentation du Formulaire de Recherche

1. **Structure du Formulaire** :
   - Dans `SearchComponent`, créez un formulaire avec un champ de recherche et un bouton de soumission.
   - Utilisez `ngModel` pour créer un lien bidirectionnel entre les champs de formulaire et les propriétés du composant. `ngModel` est une directive en Angular qui permet de créer un lien bidirectionnel entre un élément de formulaire HTML (comme un input) et une propriété dans le composant TypeScript. Cette liaison permet à Angular de mettre à jour automatiquement la valeur de la propriété du composant lorsque l'utilisateur modifie la valeur du champ de formulaire, et vice-versa.
        - **Usage dans le HTML** : `<input [(ngModel)]="propertyName">`
        - **Dans le composant TypeScript** : `propertyName` est une propriété qui sera mise à jour à chaque modification du champ input.
   - Ajoutez l'attribut `name` à chaque champ de formulaire pour que Angular puisse suivre les valeurs.
   - Utilisez `ngSubmit` pour définir l'événement de soumission du formulaire qui appelle une méthode dans le TypeScript. `ngSubmit` est un événement que vous pouvez attacher à une balise de formulaire (`<form>`). Il est déclenché lorsque l'utilisateur soumet le formulaire (par exemple, en appuyant sur Enter ou en cliquant sur un bouton de soumission).
        - **Usage dans le HTML** : `<form (ngSubmit)="methodName()">`
        - **Dans le composant TypeScript** : `methodName` est une méthode qui sera appelée lorsque le formulaire est soumis.

   ```html
   <!-- search.component.html -->

    <!--
        Méthode onSubmit à définir dans le fichier search.component.ts.
        Vous devez également définir une référence locale #formSearch.
        Ainsi que les directives ngModel pour lier un champ à son nom (data-binding)
    -->

   <form class="form-inline my-2 my-lg-0 d-inline-flex"
      (ngSubmit)="onSubmit(formSearch)"
      #formSearch="ngForm"
    >
     <input name="word"
            ngModel required
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search">

      <!-- Directive disabled pour désactiver le formulaire si il n'est pas valide -->
     <button
          [disabled]="formSearch.invalid"
          class="btn btn-outline-success my-2 my-sm-0 m-4"
          type="submit"
    >Search</button>
   </form>
   ```

2. **Traitement du Formulaire** :
   - Dans `SearchComponent`, créez une méthode `onSubmit` pour gérer la soumission du formulaire.
   - Utilisez `NgForm` pour accéder aux valeurs du formulaire. `NgForm` est une classe en Angular qui représente un formulaire. Elle permet d'accéder aux valeurs des champs de formulaire, à leur validité, et à d'autres propriétés et méthodes utiles pour la gestion des formulaires.
        - **Usage dans le TypeScript** : Vous pouvez récupérer un objet `NgForm` en le passant comme argument à la méthode appelée lors de la soumission du formulaire : `onSubmit(form: NgForm)`.

   ```ts
   // search.component.ts
   import { Component } from '@angular/core';
   import { NgForm } from '@angular/forms';

   @Component({
     // selector, templateUrl, styleUrls...
   })
   export class SearchComponent {
     onSubmit(form: NgForm) {
        console.log(form); // récupération des données du formulaire
        console.log(form.valid); // Affiche true si le formulaire est valide
        console.log(form.invalid); // Affiche true si le formulaire est invalide
        console.log(form.value['key']); // Affiche un objet avec les valeurs du formulaire (nom des champs en clé)
        console.log(form.value.word); // Affiche le mot recherché
     }
   }
   ```

### Exercice 18 : Méthode de Recherche dans le Service

1. **Mise à Jour de `PastrieService`** :
   - Créez une méthode `search` dans `PastrieService` pour effectuer une recherche basée sur le mot saisi.
   - Testez cette méthode avec `console.log` dans `SearchComponent`.

   ```ts
   // pastrie.service.ts
   export class PastrieService {
     // ...

     search(keyword: string): Pastrie[] {
       // La recherche est effectuée sur le nom de la pâtisserie
     }
   }
   ```

### Exercice 19 : Communication Enfant-Parent

1. **Communication des Résultats de Recherche** :
   - Utilisez `EventEmitter` dans `SearchComponent` pour émettre les résultats de la recherche au `PastriesComponent`.
   - Dans `PastriesComponent`, affichez les résultats de recherche.

### Exercice 20 : Recherche Dynamique avec ngModelChange

1. **Mise en Place de la Recherche Dynamique** :
   - Utilisez la syntaxe "banana in a box" (`[(ngModel)]`) pour créer un lien bidirectionnel avec la propriété `word`. La syntaxe "banana in a box", représentée par `[()]`, est utilisée pour le lien bidirectionnel en Angular. Le "banane" (`()`) représente le binding des événements (comme `ngModelChange`), et la "boîte" (`[]`) représente le property binding. Ensemble, ils permettent une liaison bidirectionnelle entre la vue (template HTML) et le modèle (composant TypeScript).
        - **Usage dans le HTML** : `<input [(ngModel)]="propertyName">`
        - **Fonctionnement** : La valeur du champ input est liée à `propertyName`, et tout changement de `propertyName` dans le composant mettra automatiquement à jour la valeur dans le champ input.
   - Utilisez `ngModelChange` pour détecter les changements et déclencher la recherche à chaque modification. `ngModelChange` est un événement qui est déclenché chaque fois que la valeur d'un champ de formulaire lié avec `ngModel` change. Cet événement peut être utilisé pour exécuter une méthode chaque fois que l'utilisateur modifie la valeur du champ.
        - **Usage dans le HTML** : `<input [ngModel]="propertyName" (ngModelChange)="methodName($event)">`
        - **Dans le composant TypeScript** : `methodName` est une méthode qui sera appelée à chaque modification du champ, et `$event` contient la nouvelle valeur du champ.

   ```html
   <!-- search.component.html -->
   <input name="word" [(ngModel)]="word" (ngModelChange)="onChangeEmit($event)">
   ```

   - Dans `SearchComponent`, créez une méthode `onChangeEmit` pour émettre les résultats de la recherche à chaque modification du champ de recherche.
