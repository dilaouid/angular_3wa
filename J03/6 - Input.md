# Communication entre composants avec @Input en Angular

## Introduction

Dans Angular, les composants peuvent communiquer entre eux de plusieurs façons. L'une des méthodes les plus courantes est l'utilisation du décorateur `@Input`, qui permet de passer des données du composant parent au composant enfant.

## Exercice 10 : Créer une interaction de sélection

Nous allons créer une interaction entre deux composants : `PastriesComponent` (parent) et `PastrieDetailsComponent` (enfant) pour afficher les détails d'une pâtisserie spécifique.

### Étape 1 : Préparer le Composant Parent

Dans le `PastriesComponent`, ajoutez une méthode `onSelect` qui sera déclenchée lorsqu'un utilisateur clique sur une pâtisserie. Cette méthode mettra à jour une propriété `selectedPastrie`, qui stockera la pâtisserie actuellement sélectionnée.

```ts
// pastries.component.ts
export class PastriesComponent {
  selectedPastrie: Pastrie | null = null;

  onSelect(pastrie: Pastrie): void {
    this.selectedPastrie = pastrie;
    console.log(pastrie);
  }
}
```

### Étape 2 : Ajouter la Réactivité dans le Template

Dans le template du `PastriesComponent`, attachez l'événement `(click)` à chaque élément représentant une pâtisserie pour appeler la méthode `onSelect`.

```html
<!-- pastries.component.html -->
<div *ngFor="let pastrie of pastries" (click)="onSelect(pastrie)">
  {{ pastrie.name }}
</div>
```

## Exercice 11 : Afficher les Détails de la Pâtisserie

### Étape 1 : Créer le Composant Enfant

Utilisez Angular CLI pour générer un nouveau composant `PastrieDetailsComponent`.

```bash
ng g c pastrie-details
```

### Étape 2 : Utiliser @Input pour la Communication

Dans le `PastrieDetailsComponent`, utilisez le décorateur `@Input()` pour recevoir la pâtisserie sélectionnée du composant parent.

```ts
// pastrie-details.component.ts
export class PastrieDetailsComponent {
  @Input() pastrie: Pastrie | null = null;
}
```

### Étape 3 : Intégrer le Composant Enfant dans le Parent

Dans le template du `PastriesComponent`, ajoutez le sélecteur du `PastrieDetailsComponent` et liez la propriété `selectedPastrie` à l'input du composant enfant.

```html
<!-- pastries.component.html -->
<app-pastrie-details [pastrie]="selectedPastrie"></app-pastrie-details>
```

### Étape 4 : Afficher les Détails dans le Composant Enfant

Dans le template du `PastrieDetailsComponent`, utilisez l'interpolation pour afficher les détails de la `pastrie`.

```html
<!-- pastrie-details.component.html -->
<h2>{{ pastrie?.name }}</h2>
<p>{{ pastrie?.description }}</p>
<!-- Utilisez le pipe json pour du débogage -->
<div *ngIf="pastrie">
  {{ pastrie | json }}
</div>
```

## Gérer le Cycle de Vie du Composant

Le cycle de vie d'un composant est crucial pour comprendre quand et comment les données sont mises à jour. Utilisez `ngOnChanges` pour réagir aux changements des inputs.

```ts
// pastrie-details.component.ts
export class PastrieDetailsComponent implements OnChanges {
  @Input() pastrie: Pastrie | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pastrie']) {
      console.log('Pastrie changed:', this.pastrie);
    }
  }
}
```
