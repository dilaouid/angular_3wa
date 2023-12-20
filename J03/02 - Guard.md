# 🚀 Cours sur l'utilisation des Guards Angular

## Introduction

Les Guards en Angular sont des mécanismes de contrôle d'accès pour les routes dans les applications Angular. Ils permettent de déterminer si un utilisateur peut accéder à une route donnée, offrant ainsi une sécurité et une flexibilité accrues.

## Utilisation des fonctions JS pour les Guards

Avec les dernières versions d'Angular, les Guards sont souvent implémentés comme des fonctions JavaScript simples. En réalité, `canActivate` que vous aurez l'habitude de voir sur le net est deprecated désormais, et depuis Angular 15, on recommande d'utiliser des "plain functions" à la place. Voici comment les utiliser efficacement :

### Auth Guard avec des "plain fonctions" JS

1. **Création de Guards** :
   - Utilisez `CanActivateFn` pour définir une fonction de garde.

   ```ts
   // auth.guard.ts
   export const isLoggedIn: CanActivateFn = () => {
     // Logique de vérification
   };
   ```

2. **Injection de Dépendances** :
   - Utilisez `inject` pour injecter des services dans les fonctions de garde.

   ```ts
   // auth.guard.ts
   export const isLoggedIn: CanActivateFn = () => {
     const userService = inject(UsersService); // Injection de dépendances du service UserService
     const router = inject(Router); // Injection de dépendances du service Router
   };
   ```

3. **Gestion de l'État d'Authentification** :
   - Utilisez `pipe` et `map` pour transformer les réponses du service d'authentification.

   ```ts
   // auth.guard.ts
    export const isLoggedIn: CanActivateFn = () => {
        const userService = inject(UsersService);
        const router = inject(Router);

        return userService.isLoggedIn().pipe(
            map(isLoggedIn => {
            if (!isLoggedIn) {
                router.navigate(['/login']);
                return false;
            }
            return true;
            })
        );
    };
   ```

4. **Implémentation dans le Routing Module** :
   - Appliquez les fonctions de garde dans `app-routing.module.ts`.

   ```ts
   // app-routing.module.ts
   const routes: Routes = [
     { path: 'login', component: LoginPage, canActivate: [isNotLoggedIn] }
   ];
   ```

### Service d'authentification

- Le service d'authentification doit fournir un moyen de vérifier l'état de connexion.

  ```ts
  // users.service.ts

    checkAuthStatus(): Observable<boolean> {
        return this.http.get('http://localhost:8000/api/auth/me', { withCredentials: true })
        .pipe( // Pipe permet de transformer la réponse du serveur
            map(response => true), // Si la réponse est positive, renvoie true
            catchError(error => { // Si la réponse est négative, rentrer dans le catch
                this.loggedIn.next(false);
                return of(false); // Gère l'erreur et renvoie false (return of() permet de renvoyer une valeur)
            })
        );
    }

    isLoggedIn(): Observable<boolean> {
        return this.loggedIn.asObservable();
    }
  ```

L'expression `return of(false)` dans RxJS crée un Observable qui émet immédiatement la valeur `false` et se termine ensuite. Cela est souvent utilisé dans les opérateurs `pipe` et `catchError` pour gérer les erreurs en transformant une erreur en valeur observable spécifique. Dans ce contexte, si l'appel API échoue (par exemple, si l'utilisateur n'est pas authentifié), `catchError` intercepte l'erreur et au lieu de propager l'erreur, il renvoie un Observable qui émet `false`, indiquant ainsi que l'utilisateur n'est pas authentifié.

Dans RxJS et les Observables Angular, `return false` ne fonctionnerait pas de la même manière que `return of(false)`.

- **`return false`:** Retourne simplement la valeur booléenne `false`. Cependant, dans le contexte d'un Observable et en particulier dans un `pipe`, cela ne créerait pas un nouvel Observable. Cela pourrait causer une erreur ou un comportement inattendu, car les fonctions dans `pipe` s'attendent à ce que chaque opérateur renvoie un Observable.

- **`return of(false)`:** Crée un Observable qui émet la valeur `false`. Cela est nécessaire car dans le flux RxJS, tout doit être un Observable pour que les opérateurs comme `map` ou `catchError` puissent fonctionner correctement. `of` est une fonction RxJS qui crée un Observable à partir d'une valeur donnée, ce qui permet de maintenir une chaîne d'Observables cohérente.

## Avantages

- **Simplicité et Clarté** : L'utilisation de fonctions JavaScript pour les Guards simplifie la structure et améliore la lisibilité.
- **Flexibilité** : Les fonctions permettent une plus grande flexibilité dans la gestion des dépendances et des conditions d'accès.

## Conclusion

L'approche moderne des Guards en Angular offre une méthode élégante et efficace pour contrôler l'accès aux routes. Elle allie la puissance d'Angular à la simplicité des fonctions JavaScript, rendant vos applications plus sécurisées et plus faciles à maintenir.
