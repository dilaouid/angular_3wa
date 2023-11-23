# Cheatsheet Angular

## Table des Matières

1. [Introduction](#introduction)
2. [`@Input()`](#input)
3. [`@Output()`](#output)
4. [Pipe](#pipe)
5. [`ngOnInit`](#ngoninit)
6. [Directives d'Attributs](#directives-dattributs)
7. [Directives Structurelles](#directives-structurelles)
8. [Classes/Attributs HTML Conditionnels](#classesattributs-html-conditionnels)

### `@Input()`

**Explication brève:** Permet à un composant enfant de recevoir des données de son composant parent.  

**Exemple d'utilisation:**  
Dans le composant enfant:  

```ts
// child.component.ts
@Component({...})
export class ChildComponent {
  @Input() inputData: any;
}
```

Dans le template du composant parent:  

```html
<!-- parent.component.html -->
<app-child [inputData]="parentData"></app-child>
```

Dans le composant parent:  

```ts
// parent.component.ts
@Component({...})
export class ParentComponent {
  parentData = 'some data';
}
```

---

### `@Output()`

**Explication brève:** Permet à un composant enfant d'envoyer des données ou des événements à son composant parent.

**Exemple d'utilisation:**  
Dans le composant enfant:  

```ts
// child.component.ts
@Component({...})
export class ChildComponent {
  @Output() outputEvent = new EventEmitter<any>(); // remplace any par le type de données à envoyer
  sendData() {
    this.outputEvent.emit(data); // remplace data par les données à envoyer
  }
}
```

Dans le template du composant parent:  

```html
<!-- parent.component.html -->
<app-child (outputEvent)="handleEvent($event)"></app-child>
```

Dans le composant parent:  

```ts
// parent.component.ts
@Component({...})
export class ParentComponent {
  handleEvent(data: any) {
    // Code à exécuter lorsque l'événement est reçu
  }
}
```

---

### `pipe`

**Explication brève:** Transforme les données affichées dans le template. Utilisé pour formater des textes, des dates, des montants, etc.  

**Exemple d'utilisation:**  
Dans le template:  

```html
<!-- some.component.html -->
{{ data | pipeName:arg1:arg2 }}
```

Exemple avec une date:  

```html
<!-- some.component.html -->
{{ today | date:'fullDate' }}
```

---

### `ngOnInit`

**Explication brève:** Une méthode du cycle de vie d'un composant Angular appelée après la création du composant et l'initialisation de ses propriétés liées aux données.  

**Exemple d'utilisation:**  
Dans le composant:

```ts
// some.component.ts
@Component({...})
export class SomeComponent implements OnInit {
  ngOnInit() {
    // Code d'initialisation qui s'exécute après la création du composant
  }
}
```

### Directives d'Attributs

**Explication brève:** Les directives d'attributs sont des classes avec le décorateur `@Directive` qui modifient le comportement ou l'apparence des éléments du DOM sur lesquels elles sont appliquées. Elles sont utilisées comme des attributs HTML normaux.  

**Exemple d'utilisation:**  
Création d'une directive d'attribut personnalisée `HighlightDirective` :  

```typescript
// some.component.ts
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
  }
}
```

Utilisation dans le template :  

```html
<!-- some.component.html -->
<div appHighlight>Texte surligné en jaune</div>
```

---

### Directives Structurelles

**Explication brève:** Changent la structure du DOM en ajoutant, supprimant ou manipulant des éléments.  

**Exemple d'utilisation:**  

Directive `*ngIf` pour conditionner l'affichage d'un élément:  

```html
<!-- some.component.html -->
<div *ngIf="condition">Affiché si 'condition' est vrai</div>
```

Directive `*ngFor` pour répéter un élément:  

```html
<!-- some.component.html -->
<div *ngFor="let item of items">{{item}}</div>
```

N'oubliez pas cependant, que `*ngFor` répétera l'élement auquel il est attaché.

---

### Classes/Attributs HTML Conditionnels

**Explication brève:** Permettent de modifier les classes ou les attributs d'un élément HTML de manière conditionnelle.  

**Exemple d'utilisation:**  
Utilisation de `[class.nom-classe]` pour ajouter une classe basée sur une condition:  

```html
<!-- some.component.html -->
<div [class.active]="isActive">Active si 'isActive' est vrai</div>
```

Utilisation de `[ngClass]` pour ajouter plusieurs classes:  

```html
<!-- some.component.html -->
<div [ngClass]="{'active': isActive, 'disabled': isDisabled}">Classes multiples conditionnelles</div>
```
