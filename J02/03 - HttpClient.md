# 🌐 Cours sur HttpClient en Angular

## Introduction

HttpClient en Angular est un outil essentiel pour les requêtes HTTP dans les applications web, offrant des capacités avancées pour gérer les communications avec les serveurs.

## Configuration de Base

### Ajout de HttpClientModule

Incluez `HttpClientModule` dans votre module principal pour utiliser HttpClient partout dans votre application.

```javascript
// app.module.ts
import { HttpClientModule } from '@angular/common/http';
// ... autres imports
@NgModule({
  imports: [
    HttpClientModule,
    // ... autres modules
  ],
})
export class AppModule { }
```

### Création d'un Service pour les Requêtes HTTP

Créez un service qui utilise HttpClient pour effectuer des opérations HTTP.

```ts
// data.service.ts
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  fetchData(): Observable<any> {
    return this.http.get('/api/data');
  }
}
```

Ici, comme vous le voyez avec le typage de fetchData, la méthode `get` renvoie un Observable. Cela signifie que vous pouvez utiliser les opérateurs RxJS pour transformer les données et les afficher dans vos composants.
Du coup, nous avons besoin d'importer notre service dans le composant qui va l'utiliser, et souscrire à cet Observable pour récupérer les données.

## Utilisation dans les Composants

### Récupération et Affichage des Données

Utilisez le service pour récupérer des données et les stocker dans une propriété du composant.

```ts
// my.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
@Component({
  // ... selector, templateUrl, etc.
})
export class MyComponent implements OnInit {
  data: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // Récupération des données avec le service dataService et souscription à l'Observable
    this.dataService.fetchData().subscribe(receivedData => {
      // tout s'est bien passé ! Stockage des données dans la propriété data de notre composant
      this.data = receivedData;
    });
  }
}
```

### Typage des Réponses

Définissez des interfaces pour vos données pour un typage fort et une meilleure maintenance.

```ts
export interface UserData {
  id: number;
  name: string;
  email: string;
}
```

## Post et Gestion des Credentials

### Envoi de Données via Post

Envoyez des données au serveur avec la méthode POST.
Le body de la requête est envoyé en JSON, en second paramètre de la méthode `post`.

```ts
export interface UserData {
  id: number;
  name: string;
  email: string;
}

// ...

// Envoi d'un utilisateur
addUser = (user: UserData): Observable<any> => {
  return this.http.post('/api/users', user); 
  // ici, le body de la requête est envoyé en JSON (user) Aucun cookie ou session n'est envoyé car withCredentials n'est pas activé
}
```

### Activation des Credentials

Pour envoyer des cookies ou des sessions avec vos requêtes, activez `withCredentials`. Cela permet de gérer l'authentification et les autorisations.
Notez que `withCredentials` est **essentiel** pour faire savoir au serveur que vous êtes authentifié, pour ainsi lui fournir les données JWT de votre session !

```ts
fetchDataWithCredentials(): Observable<any> {
  return this.http.get('/api/secure-data', { withCredentials: true });
}
```

## Gestion des Erreurs

Utilisez `catchError` pour une gestion élégante des erreurs dans vos requêtes HTTP.

```ts
import { catchError } from 'rxjs/operators';

fetchDataWithErrorHandling() {
  return this.http.get('/api/data').pipe(
    catchError(this.handleError)
  );
}

private handleError(error: HttpErrorResponse) {
  // Gestion de l'erreur
  return throwError('Une erreur est survenue');
}
```
