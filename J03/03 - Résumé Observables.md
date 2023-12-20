# RxJS en Angular : Cheat Sheet Détaillé

## Observable et Subscription

- **Observable**: Un flux de données qui émet des valeurs au fil du temps, en lecture seule.
- **Subscription**: Mécanisme d'écoute des valeurs émises par un Observable.

### Exemple

```typescript
const observable = new Observable(subscriber => {
  subscriber.next('Hello');
  subscriber.complete();
});

const subscription = observable.subscribe(val => console.log(val));
```

## BehaviorSubject et asObservable

- **BehaviorSubject**: Un type spécial d'Observable qui garde en mémoire la dernière valeur émise, on peut s'y abonner pour recevoir la dernière valeur émise, et émettre une nouvelle valeur.
- **asObservable**: Transforme un BehaviorSubject en Observable classique.

### Exemple

```ts
const behaviorSubject = new BehaviorSubject(0); // 0 est la valeur initiale
const observable = behaviorSubject.asObservable(); // On transforme le BehaviorSubject en Observable et devient donc accessible en lecture seule
```

## `tap()` et `of()`

- **tap()**: Utilisé pour exécuter un effet secondaire, comme un log, sans altérer les données émises.
- **of()**: Crée un Observable à partir d'une liste de valeurs.

### Exemple avec `tap()`

```ts
observable.pipe(
  tap(val => console.log(`Avant la transformation: ${val}`)), // On log la valeur avant la transformation
  map(val => val * 2), // On multiplie la valeur par 2
  tap(val => console.log(`Après la transformation: ${val}`)) // On log la valeur après la transformation
).subscribe();
```

## `pipe()` et `map()`

- **pipe()**: Permet de combiner plusieurs opérateurs RxJS. Par exemple, `pipe(map(...), tap(...))`. Ce qui se traduit par : "Applique l'opérateur `map` puis l'opérateur `tap`".
- **map()**: Transforme les valeurs émises par un Observable. Par exemple, `map(val => val * 2)`. Ce qui se traduit par : "Multiplie la valeur reçue par 2".

### Exemple avec `pipe()` et `map()`

```ts
const numbers = of(1, 2, 3);
numbers.pipe(
  map(n => n * 10)
).subscribe(console.log);
```

## Conclusion

RxJS offre une gestion puissante des flux de données asynchrones en Angular. Comprendre ces concepts clés, tels que Observable, BehaviorSubject, et les opérateurs comme `tap()`, `pipe()`, et `map()`, est essentiel pour créer des applications réactives et efficaces.
