# Les Directives d'Attributs en Angular

## Qu'est-ce qu'une Directive d'Attribut ?

En Angular, une directive est une classe qui ajoute ou modifie le comportement d'un élément HTML. Les directives d'attributs sont un type spécifique de directive qui ressemble à un attribut HTML normal et est utilisée pour changer l'apparence ou le comportement d'un élément DOM.

## Types de Directives en Angular

Il existe trois principaux types de directives en Angular :

1. **Composants** : Ce sont des directives avec un template.
2. **Directives d'Attributs** : Elles modifient l'apparence ou le comportement d'un élément DOM. Par exemple, elles peuvent changer la couleur de fond d'un élément ou réagir à des événements comme les clics de souris.
3. **Directives Structurelles** : Elles changent la structure du DOM, comme ajouter ou supprimer des éléments. Exemples courants : `*ngIf` et `*ngFor`.

## Comment Fonctionnent les Directives d'Attributs ?

Les directives d'attributs sont utilisées dans les templates Angular. Elles sont appliquées à des éléments HTML en utilisant leur sélecteur CSS. Quand Angular rend la vue, il identifie ces sélecteurs et applique la logique de la directive à l'élément correspondant.

## Création d'une Directive d'Attribut

### Exemple Pratique : Mise en Évidence de Cartes

Objectif : Créer une directive `appBorderCard` qui ajoute une bordure colorée à une carte lorsqu'elle est survolée par le curseur.

1. **Générer la Directive** :
   - Utilisez Angular CLI pour créer une nouvelle directive :

     ```bash
     ng generate directive border-card
     ```

   - Cette commande crée un fichier `border-card.directive.ts`.

2. **Structure de la Directive** :
   - Ouvrez le fichier `border-card.directive.ts`.
   - Vous y trouverez une classe décorée avec `@Directive`.
   - Le décorateur `@Directive` indique à Angular que c'est une directive, et le `selector` définit comment la directive sera utilisée dans les templates.

     ```ts
     @Directive({
       selector: '[appBorderCard]'
     })
     export class BorderCardDirective {
       constructor() { }
     }
     ```

3. **Manipulation du DOM** :
   - Pour modifier les éléments DOM, Angular utilise `ElementRef`, une référence à l'élément DOM.
   - Injectez `ElementRef` dans le constructeur de la directive pour manipuler l'élément DOM.

     ```ts
     constructor(private el: ElementRef) { }
     ```

4. **Réaction aux Événements avec HostListener** :
   - `HostListener` permet à la directive de réagir aux événements de l'utilisateur.
    Par exemple, la méthode `onClick()` est appelée lorsque l'utilisateur clique sur l'élément DOM :

     ```ts
     @HostListener('click') onClick() {
       console.log("Un clic sur l'élément DOM !");
     }
     ```

   - Par exemple, essayez de changer la couleur de la bordure lors du survol de la souris.
   - Ajoutez les méthodes `onMouseEnter()` et `onMouseLeave()` pour réagir aux événements `mouseenter` et `mouseleave`.

     ```ts
     @HostListener('mouseenter') onMouseEnter() {
       this.el.nativeElement.style.border = '2px solid green';
     }

     @HostListener('mouseleave') onMouseLeave() {
       this.el.nativeElement.style.border = 'none';
     }
     ```

5. **Utilisation de la Directive dans un Template** :
   - Dans votre template (par exemple, dans `app.component.html`), ajoutez la directive à un élément comme un attribut HTML :

     ```html
     <div appBorderCard>Contenu de la carte</div>
     ```

6. **Personnalisation avec @Input** :
   - Si vous voulez personnaliser la couleur de la bordure, utilisez `@Input` pour accepter une valeur du template :

     ```typescript
     @Input('appBorderCard') borderColor: string;
     ```

   - Dans le template, spécifiez la couleur :

     ```html
     <div [appBorderCard]="'red'">Contenu de la carte</div>
     ```

### Résumé

En suivant ces étapes, vous avez créé une directive d'attribut qui change la bordure d'un élément lors du survol de la souris et qui peut être personnalisée via un `@Input`. Cet exemple illustre comment les directives d'attributs peuvent être utilisées pour ajouter des comportements interactifs aux éléments DOM dans une application Angular.
