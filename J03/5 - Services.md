# Les Services en Angular

## Introduction aux Services

Les services en Angular sont des classes qui centralisent et partagent la logique métier, les données et les fonctions entre les composants. Ils suivent le principe de la séparation des préoccupations et aident à rendre votre application plus modulaire et maintenable.
La logique métier, c'est quoi ? C'est la logique qui permet à votre application de fonctionner. Par exemple, si vous avez une application de gestion de tâches, la logique métier pourrait être de créer, mettre à jour et supprimer des tâches. C'est la logique qui permet à votre application de fonctionner.

## Création d’un Service

### Pourquoi un Service ?

Un service permet de :

- Séparer la logique de traitement des données des composants.
- Partager des données et des méthodes entre plusieurs composants.
- Rendre le code plus réutilisable et testable.

### Création d'un Service `PastrieService`

1. **Générez le Service** :
   - Utilisez Angular CLI :

     ```bash
     ng generate service pastrie
     ```

   - Ceci crée un fichier `pastrie.service.ts`.

2. **Structure du Service** :
   - Le fichier contient une classe `PastrieService` décorée avec `@Injectable`.
   - `@Injectable` indique que cette classe peut être injectée dans d'autres classes via la dépendance.

     ```typescript
     @Injectable({
         providedIn: 'root' // Le service est disponible globalement
     })
     export class PastrieService {
         constructor() { }
         // Méthodes du service à ajouter ici...
     }
     ```

## Exercice 13 : Implémentation des Méthodes du Service

### Méthodes à Créer dans `PastrieService`

1. **getPastries()** : Retourne toutes les pâtisseries.
2. **getPastrie(id: string)** : Retourne une pâtisserie par son ID.
3. **getPastrieIngredientsList(id: string)** : Retourne la liste des ingrédients d'une pâtisserie.

### Injection du Service dans les Composants

- Injectez `PastrieService` dans les composants qui nécessitent des données sur les pâtisseries.
- Déclarez le service comme privé dans le constructeur du composant pour l'encapsuler.

  ```ts
  constructor(private pastrieService: PastrieService) { }
  ```

### Utilisation du Service dans `ngOnInit`

- Dans `PastriesComponent`, utilisez `ngOnInit` pour récupérer les pâtisseries à l'aide du service et les passer au template.

## Exercice 14.1 : Compter les Pâtisseries

### Création de la Méthode `count`

- Ajoutez une méthode `count` dans `PastrieService` pour retourner le nombre total de pâtisseries différentes.
- Utilisez `console.log` dans `PastriesComponent` pour tester cette méthode.
