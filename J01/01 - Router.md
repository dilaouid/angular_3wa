# Router

Le routage est un aspect crucial d'une application Angular, permettant de naviguer entre différents composants. Voici un guide détaillé pour comprendre et configurer le routage dans Angular.

---

## Exercice 20 : Mise en Place du Router et des Nouvelles Pages

Dans cet exercice, nous allons apprendre à configurer le routage dans une application Angular pour créer une navigation fluide entre différentes pages. Nous travaillerons sur une application de pâtisserie où nous créerons trois routes principales :

1. **Page Principale (Liste des Pâtisseries)**
2. **Page de Description d'une Pâtisserie**
3. **Page de Connexion au Backoffice**

### Étape 1 : Configuration des Routes

Commencez par définir les routes dans votre fichier `app.modules.ts`. Importez les composants nécessaires et définissez les routes comme suit :

```ts
// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PastriesComponent } from './pastries/pastries.component';
import { PastrieDescriptionComponent } from './pastrie-description/pastrie-description.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
    { path: 'pastries', component: PastriesComponent },
    { path: 'pastrie/:id', component: PastrieDescriptionComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/pastries', pathMatch: 'full' }
];

@NgModule({
    declarations: [
        AppComponent,
        PastriesComponent,
        PastrieDescriptionComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

### Tableau Détaillé des Propriétés de Route

| Propriété    | Description | Exemple | Notes |
|--------------|-------------|---------|-------|
| `path`       | Segment d'URL correspondant à la route. | `'pastries'` pour `/pastries` | - |
| `component`  | Composant à afficher. | `PastriesComponent` | - |
| `pathMatch`  | Comment la route doit correspondre à l'URL. | `'full'`, `'prefix'` | `'full'` pour une correspondance complète, `'prefix'` pour correspondre à tout préfixe de l'URL. |
| `redirectTo` | Route vers laquelle rediriger. | `'/'` | Redirection utile pour les routes par défaut. |
| `children`   | Sous-routes de cette route. | Sous-routes dans un objet `Routes` | Utilisé pour le routage imbriqué. |
| `data`       | Données supplémentaires associées à la route. | `{ title: 'Pastries' }` | Peut être utilisé pour passer des titres, des étiquettes, etc. |
| `outlet`     | Nom du `<router-outlet>` où le composant doit être rendu. | `'popup'` | Utile pour le routage auxiliaire. |

#### Exemple de Configuration de Route avec `pathMatch`

```ts
// app.module.ts
const appRoutes: Routes = [
    { path: 'pastries', component: PastriesComponent, pathMatch: 'prefix' }, // Matches '/pastries' et '/pastries/123'
    { path: 'pastrie/:id', component: PastrieDescriptionComponent, pathMatch: 'full' }, // Matches '/pastrie/123' mais pas '/pastrie/123/456'
    // ...
];
```

### Étape 2 : Création des Liens de Navigation

Dans votre composant principal (par exemple, dans la barre de navigation), utilisez la directive `routerLink` pour créer des liens vers vos routes :

```html
<!-- app.component.html -->
<ul class="navbar-nav mr-auto">
    <li class="nav-item">
        <a class="nav-link" routerLink="/pastries">Pâtisseries</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" routerLink="/login">Se connecter</a>
    </li>
</ul>
```

#### `routerLink` vs `href`

| Attribut | Utilisation | Comportement | Notes |
|----------|-------------|--------------|-------|
| `href`   | Lien HTML standard | Recharge la page | Pas idéal pour les applications SPA (Single Page Application). |
| `routerLink` | Lien de navigation Angular | Ne recharge pas la page | Préserve l'état de l'application, idéal pour les SPA. |

### Étape 3 : Affichage des Composants de Route

Utilisez la directive `<router-outlet>` dans votre template principal (par exemple, `app.component.html`). Cela indique où les composants de route sélectionnés doivent être rendus :

```html
<!-- app.component.html -->
<router-outlet></router-outlet>
```

- `<router-outlet>` est un placeholder où Angular charge les composants des routes actives. Il est essentiel pour rendre le contenu des différentes routes.

### Étape 4 : Rendre les Noms des Pâtisseries Cliquables

Dans votre composant `PastriesComponent`, créez des liens vers la page de description de chaque pâtisserie :

```html
<a class="text-info" routerLink="/pastrie/{{ pastrie.id }}">{{ pastrie.name }}</a>
```

### Étape 5 : Récupération de l'ID dans `PastrieDescriptionComponent`

Pour afficher les détails d'une pâtisserie spécifique, utilisez l'`ActivatedRoute` pour récupérer l'ID de la pâtisserie :

```ts
// pastrie-description.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PastrieService } from '../pastrie.service';
import { Pastrie } from '../pastrie';

@Component({
    selector: 'app-pastrie-description',
    templateUrl: './pastrie-description.component.html',
    styleUrls: ['./pastrie-description.component.scss']
})
export class PastrieDescriptionComponent implements OnInit {
    pastrie: Pastrie;

    constructor(
        private route: ActivatedRoute,
        private pastrieService: PastrieService
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.pastrie = this.pastrieService.getDetails(id);
    }
}
```

Dans cet exemple, `PastrieService` est un service que vous devez créer pour gérer la logique de récupération des données des pâtisseries. Utilisez `getDetails(id)` pour récupérer les informations d'une pâtisserie spécifique basée sur son ID.

#### Utilisation de `ActivatedRoute`

- `ActivatedRoute` fournit des informations sur la route active, y compris les paramètres et les données de route.
- `this.route.snapshot.paramMap.get('id')` récupère le paramètre `id` de l'URL actuelle.

#### Paramètres de Route vs Query Strings

| Type | Description | Utilisation | Exemple |
|------|-------------|-------------|---------|
| Paramètres de Route | Partie intégrante de l'URL, identifie une ressource spécifique. | Accès à une ressource par son identifiant. | `/pastrie/123` |
| Query Strings | Informations supplémentaires transmises via l'URL. | Transmission de données non essentielles à la requête. | `/search?keyword=chocolate` |
