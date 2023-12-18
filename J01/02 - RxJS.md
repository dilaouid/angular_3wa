# Introduction à RxJS dans Angular

## Section 1: Qu'est-ce que RxJS ?

### 1.1 Définition

- **RxJS** (Reactive Extensions for JavaScript) est une bibliothèque pour la programmation réactive. Elle permet de travailler avec des flux de données asynchrones ou synchrones.

### 1.2 Pourquoi l'utiliser dans Angular ?

- Angular l'intègre pour gérer des événements tels que les requêtes HTTP ou les interactions utilisateur.

### Section 2: Concepts Clés de RxJS

## 2.1 Les Observables

- **Définition** : Un Observable est un producteur de données qui émet des valeurs au fil du temps. Il peut émettre trois types de valeurs : des données utiles (`next`), une erreur (`error`), ou un signal de complétude (`complete`).

| Termes         | Description |
|----------------|-------------|
| `next`         | Émet une nouvelle donnée. |
| `error`        | Émet une erreur. |
| `complete`     | Signale la fin de l'émission des données. |

### 2.2 Souscription aux Observables

- Pour recevoir les données d'un Observable, un **Observer** doit y souscrire (`subscribe`).
- **Souscription** : Pour que l'Observer (consommateur de données) reçoive les données de l'Observable, il doit y souscrire en utilisant la méthode `subscribe()`. La souscription déclenche l'exécution de l'Observable et commence à recevoir les données ou les notifications.

### 2.3 Les Opérateurs

- Les opérateurs permettent de transformer, filtrer ou combiner les données émises.

| Opérateurs    | Description |
|---------------|-------------|
| `map`         | Transforme les données émises. |
| `filter`      | Filtre les données selon une condition. |
| `scan`/`reduce`| Accumule des valeurs au fil du temps. |

- **Rôle des Opérateurs** : Les opérateurs sont des fonctions utilisées pour manipuler ou transformer les données émises par un Observable avant qu'elles ne soient reçues par l'Observer. Ils peuvent filtrer, transformer, combiner ou effectuer d'autres opérations sur les flux de données.

### Section 3: Exemples de Base

### 3.1 Création d'un Observable

```ts
import { Observable } from 'rxjs';

// Création d'un Observable qui émet un nombre toutes les secondes
const observable = new Observable(subscriber => {
  let count = 0;
  setInterval(() => {
    subscriber.next(count++);
  }, 1000);
});
```

### 3.2 Souscription à l'Observable

```ts
// Exemple: Création d'un Observable simple
const observable = new Observable(subscriber => {
  // Émettre une valeur toutes les secondes
  let count = 0;
  const interval = setInterval(() => {
    subscriber.next(count++); // Utilisation de next pour émettre une valeur
    if (count > 5) {
      subscriber.complete(); // Signal de complétude
    }
  }, 1000);

  // Fonction de nettoyage appelée lors de la désinscription
  return () => clearInterval(interval);
});

// Souscription à l'Observable
observable.subscribe({
  next(num) { console.log(`Valeur reçue: ${num}`); },
  error(err) { console.log(`Erreur: ${err}`); },
  complete() { console.log('Flux completé'); }
});
```

### 3.3 Utilisation des Opérateurs

```ts
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

// Création de l'Observable
const observable = new Observable(subscriber => {
  let count = 0;
  const interval = setInterval(() => {
    subscriber.next(count++);
    if (count > 5) {
      subscriber.complete();
    }
  }, 1000);

  return () => clearInterval(interval);
});

// Utilisation des opérateurs map et filter
const processedObservable = observable.pipe(
  map(num => num * 10),
  filter(num => num % 20 === 0)
);

// Transformation et filtrage des données émises
processedObservable.pipe(
  map(num => num * 10),    // Multiplie chaque valeur émise par 10
  filter(num => num % 20 === 0) // Filtre les nombres divisibles par 20
).subscribe(console.log); // Affichage des résultats

// Souscription à l'Observable transformé
processedObservable.subscribe({
  next: val => console.log(`Valeur traitée: ${val}`),
  complete: () => console.log('Flux transformé completé')
});
```
