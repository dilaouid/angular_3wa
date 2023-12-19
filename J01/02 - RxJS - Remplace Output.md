# Cours oral

Pour convertir un des `@Input()` ou `@Output()` en Observable dans Angular, nous pouvons utiliser un service Angular et `BehaviorSubject` ou `Subject`. Cela permettra de transformer la communication entre les composants en un flux de données réactif.

Dans cet exemple, je vais transformer le `@Output()` `changePreference` en Observable. Nous allons utiliser un service pour gérer les préférences des pâtisseries et émettre des événements via un Observable.

## Étape 1: Créer un Service pour Gérer les Préférences

```ts
// pastrie-preference.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PastriePreferenceService {
  private preferenceSource = new BehaviorSubject<string | null>(null);
  preferenceChanged$ = this.preferenceSource.asObservable();

  changePreference(pastrieId: string) {
    this.preferenceSource.next(pastrieId);
  }
}
```

Dans ce service, `preferenceChanged$` est un Observable qui émet une nouvelle valeur chaque fois que la méthode `changePreference` est appelée.

## Étape 2: Modifier le Composant pour Utiliser le Service

```ts
// pastrie-details.component.ts
import { Component, Input } from '@angular/core';
import { Pastrie } from '../../../interfaces/pastrie';
import { MAX } from '../../../mocks/pastries';
import { PastriePreferenceService } from '../../../services/pastrie-preference.service';

@Component({
  selector: 'app-pastrie-details',
  templateUrl: './pastrie-details.component.html',
  styleUrl: './pastrie-details.component.scss'
})
export class PastrieDetailsComponent {
  @Input() pastrie: Pastrie | undefined;
  @Input() count: number = 0;
  @Input() ingredients: string[] = [];
  maxLike: number = MAX;

  constructor(private preferenceService: PastriePreferenceService) { }

  ngOnChanges() { }

  preference(id: string) {
    this.preferenceService.changePreference(id);
  }
}
```

Ici, au lieu d'émettre un événement via `@Output()`, nous appelons `changePreference` du service `PastriePreferenceService`.

### Étape 3: Souscrire à l'Observable dans le Composant Parent

Dans le composant parent (par exemple, `pastries.component.ts`), vous pouvez vous abonner à `preferenceChanged$` pour réagir aux changements de préférences.

```ts
// pastries.component.ts
import { Component, OnInit } from '@angular/core';
// ... autres imports ...

export class PastriesComponent implements OnInit {
  // ... autres propriétés ...

  constructor(private preferenceService: PastriePreferenceService) { }

  ngOnInit(): void {
    this.preferenceService.preferenceChanged$.subscribe(pastrieId => {
      if (pastrieId) {
        this.changeParentPreference(pastrieId);
      }
    });
  }

  // ... autres méthodes ...
}
```
