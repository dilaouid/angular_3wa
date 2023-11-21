# Basiques d'Angular - Architecture d'Angular

Bienvenue dans les fondamentaux de l'architecture Angular. Angular est structuré de manière hiérarchique et se compose de plusieurs éléments clés qui travaillent ensemble pour créer des applications web dynamiques. Nous allons explorer ces éléments un par un.

## Composants et Modules

### Composants

Le composant est l'unité de base de l'UI dans Angular. Chaque composant contrôle une partie de l'écran appelée vue. Un composant comprend trois parties :

1. **Template** : Le code HTML qui définit la vue.
2. **Class** : Le code TypeScript qui gère la logique de la vue. Cela inclut les données et le comportement du composant.
3. **Decorator** : Les métadonnées pour le composant, fournies via un décorateur qui le relie à son template.

### Modules

Un module Angular organise un ensemble de fonctionnalités connexes. Chaque application Angular a au moins un module racine, nommé `AppModule`, qui sert à démarrer et à assembler l'application. Les modules peuvent contenir des composants, des services, des directives, des pipes, et même d'autres modules.

## Services et Injection de Dépendances

### Services

Un service est une classe avec un objectif précis. Par exemple, vous pourriez avoir un service de log, un service de données ou un service de messagerie. Ils peuvent être réutilisés dans plusieurs composants.

### Injection de Dépendances

L'injection de dépendances (DI) est un design pattern central dans Angular. DI permet de fournir des instances de classes (services ou objets) à une classe (comme un composant) de manière transparente.

## Directives

Les directives sont des classes qui ajoutent un comportement supplémentaire aux éléments dans vos applications Angular. Il y a trois types de directives dans Angular :

1. **Composants** : Directives avec un template.
2. **Directives structurelles** : Modifient la structure du DOM en ajoutant ou supprimant des éléments.
3. **Directives d'attributs** : Modifient l'apparence ou le comportement d'un élément.

## Binding de données

Le binding de données est le mécanisme qui permet la communication entre le modèle TypeScript et la vue HTML. Il existe quatre formes de binding de données :

1. **Interpolation** : {{ value }} pour afficher des données.
2. **Property Binding** : [property]="value" pour lier une propriété d'un élément DOM à une expression.
3. **Event Binding** : (event)="handler" pour écouter des événements du DOM.
4. **Two-way Binding** : [(ngModel)]="property" pour le binding bidirectionnel.

## Routage

Le système de routage d'Angular permet de définir des routes pour naviguer entre différents composants dans une application. Il permet la création d'une expérience de navigation semblable à celle d'une application de bureau.

## Pipes

Les pipes sont une façon de transformer les données affichées dans le template. Par exemple, vous pouvez utiliser des pipes pour formater des dates, des nombres, des monnaies, etc.
Exemple :

```html
<p>Today is {{ today | date }}</p>
```

Ici, `today` est une variable de type `Date` et `date` est un pipe qui transforme la date en une chaîne de caractères au format `MM/DD/YYYY`.

## Résumé

L'architecture d'Angular est conçue pour favoriser la productivité et la maintenabilité des applications. En comprenant ces éléments clés :

- Modules
- Composants
- Services et DI (Dependency Injection)
- Directives
- Binding de données
- Routage
- Pipes

Vous êtes maintenant équipé pour commencer à construire des applications structurées et modulables avec Angular. Dans les leçons suivantes, nous approfondirons chacun de ces sujets pour que vous puissiez les utiliser efficacement dans vos projets.

## Analogie de la maison

Pour expliquer tout ces différents aspects, de modules, components, etc... Imaginons une maison !

- **Modules** : Ce sont les fondations de la maison. Ils définissent la structure générale.

- **Composants** : Ce sont les différentes pièces de la maison.

- **Services & Injecteur** : Ce sont les services publics comme l'eau et l'électricité. Vous ne voyez pas comment ils arrivent dans votre maison, mais ils sont essentiels.

- **Directives** : Ce sont des modifications ou des ajouts que vous apportez à votre maison, comme un système de sécurité ou un chauffage.

- **Bindings** : Ce sont les interrupteurs et les prises électriques. Ils permettent la communication entre les différentes parties de la maison.

J'espère que cette analogie et ces explications simplifiées rendent le schéma initial plus clair. Si vous souhaitez un schéma graphique, je serais ravi de vous aider, mais je ne peux pas créer des images graphiques directement. Cependant, je peux vous guider sur la manière de créer un schéma plus clair à partir de ces informations.
