# 🚀 RxJS dans Angular

## 📚 Introduction à RxJS

### Objectifs du Cours

- 🎯 Comprendre les concepts clés de RxJS : Observables, Observers, Souscriptions.
- 🛠 Apprendre à intégrer RxJS dans des projets Angular.
- 🧐 Explorer les bonnes pratiques et l'architecture réactive.
- 🔄 Examiner l'utilisation de RxJS comme alternative aux `@Input()` et `@Output()` pour une communication inter-composants plus efficace.

---

## 📖 Section 1 : Fondamentaux de RxJS

### 1.1 🌟 Introduction à RxJS

- **Observables** : Cœur de RxJS, représentent des flux de données pouvant émettre des valeurs, des erreurs, ou un signal de complétude. Ils sont utiles pour gérer des données asynchrones comme les réponses HTTP, les entrées utilisateur, etc.

  ```ts
  const observable = new Observable(subscriber => {
    subscriber.next('Hello RxJS!');
    subscriber.complete();
  });
  ```

- **Observers** : Consommateurs des données émises par les Observables. Ils réagissent aux données, erreurs, et signaux de complétude.
- **Souscriptions** : Mécanisme pour relier un Observer à un Observable. Cela déclenche l'Observable qui commence à émettre des données.

### 1.2 🔧 Opérateurs RxJS

- **Transformation** (`map`, `flatMap`, `switchMap`) : Modifient les données émises, par exemple, en changeant leur format ou en combinant les données de plusieurs Observables.

  ```ts
  observable.pipe(map(data => data.toUpperCase())).subscribe(console.log);
  ```

- **Filtrage** (`filter`, `distinctUntilChanged`) : Sélectionnent certaines valeurs basées sur des conditions, permettant de ne réagir qu'à certains types de données.

  ```ts
  observable.pipe(filter(num => num % 2 === 0)).subscribe(console.log);
  ```

- **Combinaison** (`merge`, `concat`, `combineLatest`) : Combinez ou fusionnez plusieurs flux de données en un seul flux.

---

## 🌐 Section 2 : RxJS dans Angular

### 2.1 🌍 Intégration avec HttpClient

La gestion des requêtes HTTP est un aspect crucial dans le développement d'applications web modernes. Angular offre un puissant client HTTP qui peut être encore amélioré avec RxJS pour une manipulation plus flexible et réactive des requêtes et réponses.

#### Gestion des Requêtes HTTP avec RxJS

1. **Pourquoi Utiliser RxJS avec HttpClient ?**
   - RxJS permet de traiter les réponses HTTP de manière déclarative et fonctionnelle.
   - Il fournit des outils pour composer facilement des opérations asynchrones, telles que la transformation des données, la gestion des erreurs et même l'annulation des requêtes.

2. **Exemple de Requête HTTP avec Transformation de Réponse**
   - **Fichier**: Typiquement placé dans un service Angular (par exemple, `data.service.ts`).
   - **Code**:

     ```ts
     import { HttpClient } from '@angular/common/http';
     import { map } from 'rxjs/operators';

     constructor(private httpClient: HttpClient) {}

     fetchData() {
       this.httpClient.get('https://api.exemple.com/data') // L'URL de votre API
         .pipe(
           map(response => {
             // Transformation de la réponse
             // Par exemple, filtrer ou reformater les données
             return response;
           })
         ).subscribe(
           data => {
             // Manipulation des données transformées
             console.log(data);
           },
           error => {
             // Gestion des erreurs de la requête
             console.error(error);
           }
         );
     }
     ```

   - **Explication**: Ici, `httpClient.get` retourne un Observable. Le `pipe` avec l'opérateur `map` est utilisé pour transformer la réponse. Ensuite, la méthode `subscribe` est utilisée pour traiter les données.

#### Gestion des Erreurs avec `catchError`

1. **Utilisation de `catchError`**
   - `catchError` est un opérateur RxJS qui intercepte les erreurs survenant dans l'Observable.
   - Il permet de gérer ces erreurs de manière élégante, par exemple, en retournant une valeur par défaut, en redirigeant l'utilisateur, ou en enregistrant l'erreur.

2. **Exemple de Gestion des Erreurs**
   - **Code**:

     ```ts
     import { catchError } from 'rxjs/operators';

     fetchData() {
       this.httpClient.get('https://api.exemple.com/data')
         .pipe(
           catchError(err => {
             // Gestion de l'erreur
             // Par exemple, retourner une valeur par défaut ou propager l'erreur
             console.error('Une erreur est survenue', err);
             return throwError(err); // Propage l'erreur
           })
         ).subscribe(
           data => console.log(data),
           error => {
             // Réagit à l'erreur propagée
             console.error('Erreur capturée dans subscribe', error);
           }
         );
     }
     ```

   - **Explication**: Dans cet exemple, `catchError` est utilisé pour intercepter une erreur potentielle dans la requête HTTP. Si une erreur se produit, elle est traitée dans le `catchError`, puis propagée pour être gérée dans le `subscribe`.

---

### Intégration de HttpClient avec RxJS dans un Composant Angular

Après avoir configuré notre service pour gérer les requêtes HTTP avec RxJS, voyons comment ce service peut être intégré dans un composant Angular pour effectuer des appels de données et traiter les réponses.

#### Création d'un Service pour les Requêtes HTTP

**Service Angular (`data.service.ts`)**:

- Ce service encapsule la logique de requête HTTP.
- Utilise `HttpClient` pour effectuer des requêtes et RxJS pour manipuler les données reçues.

   ```ts
   // data.service.ts
   import { Injectable } from '@angular/core';
   import { HttpClient } from '@angular/common/http';
   import { catchError, map, throwError } from 'rxjs';

   @Injectable({
     providedIn: 'root'
   })
   export class DataService {
     constructor(private httpClient: HttpClient) {}

     fetchData() {
       return this.httpClient.get('https://api.exemple.com/data')
         .pipe(
           map(response => {
             // Transformation de la réponse
             return response;
           }),
           catchError(err => {
             // Gestion de l'erreur
             console.error('Une erreur est survenue', err);
             return throwError(err);
           })
         );
     }
   }
   ```

#### Utilisation du Service dans un Composant

**Composant Angular (`my-component.component.ts`)**:

- Injectez le service `DataService` dans le composant.
- Appelez `fetchData()` pour récupérer les données.
- Gérez la souscription pour réagir aux données ou aux erreurs.

   ```ts
   // my-component.component.ts
   import { Component, OnInit, OnDestroy } from '@angular/core';
   import { DataService } from './data.service';
   import { Subscription } from 'rxjs';

   @Component({
     selector: 'app-my-component',
     templateUrl: './my-component.component.html'
   })
   export class MyComponent implements OnInit, OnDestroy {
     data: any;
     private subscription: Subscription;

     constructor(private dataService: DataService) {}

     ngOnInit() {
       this.subscription = this.dataService.fetchData().subscribe(
         responseData => {
           // Traitez les données ici
           this.data = responseData;
         },
         error => {
           // Traitez l'erreur ici
           console.error('Erreur lors de la récupération des données', error);
         }
       );
     }

     ngOnDestroy() {
       // Se désabonner pour éviter les fuites de mémoire
       this.subscription.unsubscribe();
     }
   }
   ```

#### Pourquoi cette approche ?

- **Séparation des préoccupations** : Le service `DataService` gère les détails de la requête HTTP et de la manipulation des données, tandis que le composant consomme ces données et les intègre dans la logique de l'interface utilisateur.
- **Réactivité** : Les changements dans les données reçues du serveur sont automatiquement reflétés dans l'interface utilisateur, grâce à la nature réactive des Observables de RxJS.
- **Gestion des erreurs** : Les erreurs survenues pendant les requêtes HTTP sont gérées de manière élégante, évitant ainsi des plantages de l'application et permettant une meilleure expérience utilisateur.
- **Maintenance et Testabilité** : Cette approche rend le code plus facile à tester et à maintenir en isolant la logique de récupération de données dans un service dédié.

### 2.2 🎛 Gestion des Événements

- **Événements du DOM** : `fromEvent` crée un Observable à partir d'événements DOM, offrant une manière réactive de gérer des actions utilisateur comme les clics ou les frappes au clavier.

  ```ts
  fromEvent(document, 'click').subscribe(() => console.log('Clicked!'));
  ```

---

## 🛠 Section 3 : Bonnes Pratiques avec RxJS

### 3.1 💧 Gestion des Souscriptions

La gestion des souscriptions dans Angular avec RxJS est un élément crucial pour éviter les fuites de mémoire et assurer que les ressources sont libérées de manière appropriée. Une fuite de mémoire se produit lorsqu'une application continue de consommer de la mémoire sans la libérer, ce qui peut entraîner des performances réduites et, dans les cas extrêmes, un crash de l'application.

#### Éviter les Fuites de Mémoire

1. **Pourquoi c'est Important** :
   - Les Observables RxJS émettent des valeurs au fil du temps. Si un composant Angular souscrit à un Observable mais ne se désabonne pas, il peut continuer à recevoir des valeurs même après sa destruction. Cela signifie que le composant et l'Observable ne sont pas nettoyés par le garbage collector de JavaScript, menant à une consommation inutile de mémoire.

2. **Utilisation de `takeUntil`** :
   - `takeUntil` est un opérateur RxJS qui permet de compléter un Observable lorsque un autre Observable émet une valeur.
   - **Exemple de Code** :

     ```ts
     import { Subject, takeUntil } from 'rxjs';

     export class MyComponent implements OnInit, OnDestroy {
       private destroy$ = new Subject();

       ngOnInit() {
         observable.pipe(
           takeUntil(this.destroy$)
         ).subscribe(value => {
           // Traiter la valeur
         });
       }

       ngOnDestroy() {
         this.destroy$.next(); // Signale à takeUntil de compléter l'Observable
         this.destroy$.complete(); // Nettoie le Subject
       }
     }
     ```

   - **Explication** : Dans cet exemple, lorsque le composant est détruit (`ngOnDestroy`), `destroy$.next()` est appelé, ce qui provoque l'arrêt de toutes les souscriptions utilisant `takeUntil` avec `destroy$`.

#### Unsubscribe Automatique avec `AsyncPipe`

1. **Utilisation de `AsyncPipe` dans les Templates** :
   - `AsyncPipe` est un pipe fourni par Angular qui souscrit automatiquement à un Observable et renvoie sa dernière valeur émise.
   - Il gère également la désinscription automatique, ce qui est idéal pour prévenir les fuites de mémoire dans les templates Angular.

2. **Exemple d'Utilisation de `AsyncPipe`** :
   - **Template HTML (`my-component.component.html`)** :

     ```html
     <!-- Utilisation de AsyncPipe pour souscrire automatiquement à l'Observable -->
     <div>{{ dataObservable$ | async }}</div>
     ```

   - **Composant ts (`my-component.component.ts`)** :

     ```ts
     export class MyComponent {
       dataObservable$ = this.dataService.fetchData();
       // fetchData() retourne un Observable
     }
     ```

   - **Explication** : Ici, `AsyncPipe` souscrit automatiquement à `dataObservable$` et affiche sa dernière valeur émise. Lorsque le composant est détruit, `AsyncPipe` se désabonne automatiquement, empêchant les fuites de mémoire.

---

### 🗑️ Garbage Collector et Fuites de Mémoire (Memory Leak)

#### Qu'est-ce que le Garbage Collector ?

- **Définition** :
  - Le garbage collector (GC) est un processus de gestion de la mémoire automatique présent dans de nombreux langages de programmation, y compris JavaScript, qui est le langage sous-jacent d'Angular.
  - Son rôle est d'identifier et de libérer la mémoire qui n'est plus utilisée par l'application, ce qui aide à prévenir l'utilisation excessive de mémoire et les fuites de mémoire.

- **Fonctionnement** :
  - Le GC surveille toutes les variables et objets alloués en mémoire. Lorsqu'il détecte qu'une variable ou un objet n'est plus accessible ou référencé dans l'application, il libère automatiquement cette mémoire.

#### Fuites de Mémoire dans Angular

- **Origine des Fuites de Mémoire** :
  - Dans le contexte d'Angular et RxJS, les fuites de mémoire peuvent survenir si les Observables ne sont pas correctement gérés. Par exemple, lorsqu'un composant Angular souscrit à un Observable mais ne se désabonne pas de celui-ci lors de sa destruction, le composant et l'Observable restent en mémoire.
  - Puisque le composant est toujours abonné à l'Observable, même après qu'il soit censé être détruit, le GC ne peut pas libérer sa mémoire, entraînant une fuite.

- **Impact** :
  - Les fuites de mémoire peuvent entraîner une utilisation accrue de la mémoire, des performances réduites et, dans les cas graves, peuvent causer le plantage de l'application.

#### Stratégies pour Éviter les Fuites de Mémoire

- **Utilisation de `takeUntil` et `unsubscribe`** :
  - Ces méthodes sont des pratiques courantes dans la gestion des Observables en Angular pour s'assurer que les souscriptions sont correctement fermées et que les objets sont éligibles pour la collecte par le GC.
  - En utilisant `takeUntil` dans `ngOnDestroy`, vous indiquez explicitement au GC que l'Observable et le composant peuvent être nettoyés de la mémoire une fois que le composant est détruit.

- **`AsyncPipe` pour la Gestion Automatique** :
  - Lorsque vous utilisez `AsyncPipe` dans les templates Angular, il gère automatiquement les souscriptions et désinscriptions des Observables, permettant au GC de fonctionner efficacement sans fuite de mémoire.

### 3.2 🛠 Création d'Observables Personnalisés

La création d'Observables personnalisés est une technique avancée dans RxJS qui permet une grande flexibilité et puissance dans la gestion de flux de données asynchrones. Voici une explication détaillée sur quand et comment créer des Observables personnalisés, avec un exemple concret.

#### Quand Créer des Observables Personnalisés ?

- **Intégration de Sources de Données Externes** : Lorsque vous avez besoin de travailler avec des sources de données qui ne sont pas immédiatement compatibles avec les Observables existants. Par exemple, des WebSockets, des événements personnalisés, ou d'autres API asynchrones.
- **Encapsulation de Comportements Complexes** : Pour encapsuler et gérer des séquences d'opérations asynchrones complexes au sein de votre application.

#### Comment Créer des Observables Personnalisés ?

- Utilisez le constructeur `new Observable()` pour créer un nouvel Observable.
- À l'intérieur du constructeur, vous définissez la logique de production des données.
- Utilisez `subscriber.next()` pour émettre une valeur.
- Utilisez `subscriber.error()` pour signaler une erreur.
- Utilisez `subscriber.complete()` pour signaler que l'Observable a terminé d'émettre les données.

#### Exemple : Observable pour une Réponse de WebSocket

Imaginons que vous vouliez créer un Observable qui écoute les messages d'un WebSocket.

1. **Fichier** : Créez un fichier dédié, par exemple `websocket.service.ts`, pour y encapsuler la logique de WebSocket.
2. **Service WebSocket** : Créez un service qui encapsule la logique de connexion WebSocket et la création de l'Observable.

   ```ts
   // websocket.service.ts
   import { Injectable } from '@angular/core';
   import { Observable } from 'rxjs';

   @Injectable({
     providedIn: 'root'
   })
   export class WebSocketService {
     private socket: WebSocket;

     constructor() {
       this.socket = new WebSocket('wss://exemple-websocket.com');
     }

     getMessages(): Observable<any> {
       return new Observable(subscriber => {
         this.socket.onmessage = (event) => {
           subscriber.next(event.data);
         };

         this.socket.onerror = (error) => {
           subscriber.error(error);
         };

         this.socket.onclose = () => {
           subscriber.complete();
         };

         // Nettoyage si le consommateur se désabonne
         return () => {
           this.socket.close();
         };
       });
     }
   }
   ```

3. **Utilisation dans un Composant** : Injectez `WebSocketService` dans un composant Angular pour consommer l'Observable.

   ```ts
   // my.component.ts
   @Component({...})
   export class MyComponent implements OnInit {
     constructor(private webSocketService: WebSocketService) {}

     ngOnInit() {
       this.webSocketService.getMessages().subscribe({
         next: message => console.log('Nouveau message:', message),
         error: error => console.error('Erreur WebSocket:', error),
         complete: () => console.log('Connexion WebSocket fermée')
       });
     }
   }
   ```

#### Avantages de cette Approche

- **Réactivité** : Les composants peuvent réagir en temps réel aux données provenant du WebSocket.
- **Dé-couplage** : Le service WebSocket agit comme un intermédiaire isolant les composants des détails de la gestion de la connexion WebSocket.
- **Réutilisabilité** : Le service peut être injecté et réutilisé dans plusieurs composants.

---

## 🔄 Section 4 : RxJS pour la Communication entre Composants

### 4.1 🔄 Alternative aux @Input() et @Output() avec RxJS

L'utilisation des Observables RxJS en combinaison avec les services Angular offre une alternative puissante aux mécanismes de communication traditionnels basés sur `@Input()` et `@Output()`. Cette approche est particulièrement utile pour gérer des interactions complexes entre composants de manière plus élégante et réactive.

#### Approche RxJS pour la Communication entre Composants

1. **Concept** :
   - Au lieu de passer des données via `@Input()` et d'émettre des événements avec `@Output()`, cette approche utilise un service Angular pour centraliser la logique et les données.
   - Les données ou les événements sont encapsulés dans des Observables au sein du service. Les composants peuvent s'abonner à ces Observables pour recevoir des mises à jour ou émettre des valeurs.

2. **Exemple de Mise en Œuvre** :
   - Supposons que nous avons plusieurs composants qui doivent partager et réagir aux mêmes données (par exemple, un statut d'utilisateur). Celui-ci va valoir `initial` au démarrage de l'application, puis `updated` lorsqu'un bouton est cliqué.

   - **Service de Partage de Statut** (`status.service.ts`) :

     ```ts
     // status.service.ts
     import { Injectable } from '@angular/core';
     import { BehaviorSubject } from 'rxjs';

     @Injectable({ providedIn: 'root' })
     export class StatusService {
       private statusSubject = new BehaviorSubject<string>('initial');
       status$ = this.statusSubject.asObservable();

       updateStatus(newStatus: string) {
         this.statusSubject.next(newStatus);
       }
     }
     ```

   - **Composant Consommateur** (`status-display.component.ts`) :

     ```ts
     // status-display.component.ts
     import { Component, OnInit } from '@angular/core';
     import { StatusService } from './status.service';

     @Component({
       selector: 'app-status-display',
       template: `<div>Status: {{ status | async }}</div>`
     })
     export class StatusDisplayComponent implements OnInit {
       status = this.statusService.status$;

       constructor(private statusService: StatusService) {}

       ngOnInit() {
         // L'Observable status$ est directement utilisé dans le template avec AsyncPipe.
       }
     }
     ```

   - **Composant Émetteur** (`status-update.component.ts`) :

     ```ts
     // status-update.component.ts
     import { Component } from '@angular/core';
     import { StatusService } from './status.service';

     @Component({
       selector: 'app-status-update',
       template: `<button (click)="updateStatus()">Update Status</button>`
     })
     export class StatusUpdateComponent {
       constructor(private statusService: StatusService) {}

       updateStatus() {
         this.statusService.updateStatus('updated');
       }
     }
     ```

#### Avantages de l'Approche RxJS

- **Découplage** : Les composants sont moins couplés les uns aux autres, ce qui simplifie la maintenance et le test.
- **Réactivité** : Les mises à jour des données sont transmises de manière réactive et immédiate à tous les abonnés, permettant des interfaces utilisateur dynamiques.
- **Flexibilité** : Cette méthode facilite la gestion des interactions complexes, telles que les flux de données dépendant de plusieurs sources ou les conditions de filtrage.

### 4.2 🧩 Exemples Pratiques : Service de Panier d'Achat avec RxJS

#### Contexte

Dans une application Angular, partager des données entre différents composants peut parfois être complexe, surtout si ces composants n'ont pas de relations directes de parent à enfant. RxJS offre une solution élégante à travers l'utilisation de services et d'Observables.

#### Service de Panier d'Achat

1. **Création du Service** :
   - Fichier : `cart.service.ts`
   - Le service `CartService` va centraliser la logique de gestion du panier d'achat.

2. **Utilisation de BehaviorSubject** :
   - `BehaviorSubject` est un type spécial d'Observable qui garde en mémoire la dernière valeur émise. Il est parfait pour des cas comme le panier d'achat où les composants consommateurs (c'est à dire les composants qui affichent le dit panier) peuvent avoir besoin de l'état actuel du panier dès leur initialisation.
   - Le `$` à la fin de `cart$` est une convention de nommage en RxJS indiquant qu'il s'agit d'un Observable.

3. **Structure du Service** :

   ```ts
   // cart.service.ts
   import { BehaviorSubject } from 'rxjs';

   export class CartService {
     // BehaviorSubject initialisé avec un panier vide
     private cartSubject = new BehaviorSubject([]);

     // Observable public exposé pour la souscription
     cart$ = this.cartSubject.asObservable();

     addToCart(product) {
       // Logique d'ajout au panier
       const updatedCart = /* ajoute le produit au panier */;
       this.cartSubject.next(updatedCart); // Émet le nouveau panier
     }
   }
   ```

#### Intégration dans les Composants

1. **Injection du Service dans les Composants** :
   - Dans vos composants Angular (par exemple, `cart.component.ts`), injectez `CartService` via le mécanisme de dépendance d'injection d'Angular.

2. **Souscription au Panier** :
   - Les composants peuvent s'abonner à `cart$` pour recevoir les dernières mises à jour du panier.
   - Utilisez `ngOnInit` pour initialiser la souscription et `ngOnDestroy` pour se désabonner et éviter les fuites de mémoire.

3. **Exemple de Souscription dans un Composant** :

   ```ts
   // cart.component.ts
   import { Component, OnInit, OnDestroy } from '@angular/core';
   import { CartService } from './cart.service';
   import { Subscription } from 'rxjs';

   @Component({
     selector: 'app-cart',
     templateUrl: './cart.component.html'
   })
   export class CartComponent implements OnInit, OnDestroy {
     cartItems = [];
     private subscription: Subscription;

     constructor(private cartService: CartService) {}

     ngOnInit() {
       this.subscription = this.cartService.cart$.subscribe(
         products => {
           this.cartItems = products;
         }
       );
     }

     ngOnDestroy() {
       if (this.subscription) {
         this.subscription.unsubscribe();
       }
     }
   }
   ```

#### Pourquoi Utiliser RxJS pour cela ?

- **Réactivité** : Les changements dans le panier sont automatiquement propagés à tous les composants abonnés.
- **Modularité** : Le service de panier encapsule toute la logique de gestion du panier, rendant les composants plus légers et plus concentrés sur leur rôle de présentation.
- **Maintenabilité** : Cela simplifie la gestion de l'état et la communication entre composants, surtout dans des applications complexes.

---

## 📋 Conclusion

### Récapitulatif des points clés

- 🌟 Comprendre RxJS et son intégration dans Angular est essentiel pour développer des applications modernes, réactives et modulaires.
- 🔍 Utilisez RxJS pour améliorer la gestion des données asynchrones, la communication entre composants et pour créer des interfaces utilisateur dynamiques.

### 📚 Ressources Supplémentaires

- [Documentation RxJS](https://rxjs.dev/guide/overview) : Approfondissez vos connaissances sur RxJS.
- [Lior et RxJS sur Angular](https://www.youtube.com/watch?v=-JwjHDG3b5U) : Vidéo de Lior CHAMLA sur RxJS dans Angular.
