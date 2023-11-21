# TypeScript - Décorateurs

Les décorateurs sont une fonctionnalité avancée de TypeScript qui permet d'annoter et de modifier des classes et des membres de classe (propriétés, méthodes) de manière déclarative. Ils sont souvent utilisés dans les frameworks comme Angular pour fournir des informations supplémentaires sur les classes et leurs membres, et pour modifier leur comportement.

## Qu'est-ce qu'un décorateur ?

Un décorateur est une sorte de déclaration qui peut être attachée à une classe, une méthode, un accesseur, une propriété, ou un paramètre de méthode ou de constructeur. Les décorateurs utilisent la forme `@expression`, où `expression` doit évaluer une fonction qui sera appelée au moment de l'exécution avec des informations sur la déclaration décorée.

## À quoi servent les décorateurs ?

Les décorateurs servent à ajouter des fonctionnalités supplémentaires aux éléments de votre code de manière modulaire et réutilisable. Imaginez-les comme des autocollants que vous pouvez apposer sur des parties de votre code pour leur donner des super-pouvoirs ou des comportements spécifiques sans modifier leur code source. Voici quelques-uns de leurs usages principaux :

### **1. Annotation et métadonnées**

Les décorateurs peuvent être utilisés pour ajouter des métadonnées à une classe ou à ses membres, ce qui signifie que vous pouvez stocker des informations supplémentaires qui peuvent être utilisées par le système ou les bibliothèques/frameworks. Par exemple, dans Angular, les décorateurs sont utilisés pour marquer une classe comme un composant et fournir des métadonnées sur les templates et les sélecteurs associés. Exemple :

```ts
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'my-app';
}
```

Ici, le décorateur `@Component` est utilisé pour marquer la classe `AppComponent` comme un composant Angular et pour fournir des métadonnées sur le sélecteur et le template associés. Du coup, Angular sait que cette classe est un composant et peut l'utiliser en conséquence. En paramètre, le décorateur `@Component` prend un objet qui contient les métadonnées à utiliser pour le composant, ici, le sélecteur et le template, mais il pourrait y avoir d'autres métadonnées pour d'autres décorateurs.

### **2. Modification du comportement**

Vous pouvez utiliser des décorateurs pour modifier ou étendre le comportement d'une classe, méthode, ou propriété. Cela peut inclure la journalisation, la gestion des erreurs, ou même changer la valeur de retour d'une méthode.

### **3. Validation**

Les décorateurs peuvent être appliqués pour valider les données avant qu'elles ne soient affectées à une propriété ou avant qu'une méthode ne soit exécutée, assurant ainsi que les données sont correctes.

### **4. Liaison de contexte**

Dans certains cas, vous pouvez utiliser les décorateurs pour lier automatiquement le contexte `this` dans les méthodes de classe, ce qui est particulièrement utile dans les callbacks.

### **5. Contrôle d'accès**

Les décorateurs peuvent aider à contrôler l'accès aux propriétés ou méthodes d'une classe. Par exemple, vous pourriez avoir un décorateur `@ReadOnly` qui empêche la modification d'une propriété après sa première affectation.

### **6. Injection de dépendance**

En développement logiciel, l'injection de dépendance est une technique pour réaliser l'inversion de contrôle entre des classes et leurs dépendances. Un décorateur peut indiquer qu'une certaine dépendance doit être injectée dans la classe, comme on le voit souvent dans Angular avec le décorateur `@Injectable`.

En résumé, les décorateurs offrent une méthode élégante et expressive pour ajouter des fonctionnalités à vos classes et autres structures sans les encombrer de code supplémentaire directement dans leur corps. Ils aident à garder votre code propre, organisé et facile à comprendre.

## Types de décorateurs

TypeScript propose plusieurs types de décorateurs:

- **Décorateurs de classe**: Appliqués à la déclaration d'une classe.
- **Décorateurs de méthode**: Appliqués à la déclaration d'une méthode d'une classe.
- **Décorateurs d'accès**: Appliqués à un accesseur d'une classe.
- **Décorateurs de propriété**: Appliqués à une propriété d'une classe.

## Utilisation des décorateurs

Pour utiliser les décorateurs, vous devez activer l'option `experimentalDecorators` dans votre fichier `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    ...
  }
}
```

## Exemples de Décorateurs

### Décorateur de Classe

Un décorateur de classe est déclaré juste avant une déclaration de classe. Il est appliqué au constructeur de la classe et peut être utilisé pour observer, modifier ou remplacer une définition de classe.

```ts
function Component(constructor: Function) {
    console.log('Component Decorator called on: ', constructor);
}

@Component
class TaskComponent {
    constructor(public id: number, public description: string) {}
}
```

### Décorateur de Méthode

Un décorateur de méthode est appliqué à la fonction du prototype de la classe.

```ts
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(`Log Decorator called on: `, target, propertyKey, descriptor);
}

class TaskComponent {
    @Log
    updateTask(id: number) {
        console.log(`Updating task #${id}`);
    }
}
```

Petit tour sur les paramètres du décorateur :

- `target` : la classe qui contient la méthode décorée.
- `propertyKey` : le nom de la méthode décorée.
- `descriptor` : un objet qui contient des informations sur la méthode décorée.

Par exemple, pour modifier le comportement de la méthode décorée, vous pouvez utiliser le paramètre `descriptor` pour définir une nouvelle valeur pour la méthode :

```ts
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.value = function (...args: any[]) {
        console.log(`Updating task #${args[0]}`);
    };
}
```

### Décorateur d'Accès

Les décorateurs d'accès sont appliqués à un accesseur d'une classe et peuvent être utilisés pour intercepter les accès à une propriété particulière.

```ts
function ReadOnly(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.writable = false;
}

class TaskComponent {
    private _taskName: string;

    @ReadOnly
    get taskName() {
        return this._taskName;
    }
}
```

Un accesseur de classe, késako ? Il s'agit d'une méthode qui est utilisée pour lire (getter) ou écrire (setter) la valeur d'une propriété. Par exemple, dans la classe `TaskComponent` ci-dessus, la méthode `get taskName()` est un accesseur qui est utilisé pour lire la valeur de la propriété `taskName`. L'accès à la propriété `taskName` déclenchera l'exécution de la méthode `get taskName()`.

### Décorateur de Propriété

Les décorateurs de propriété peuvent être utilisés pour traiter les propriétés de classe.

```ts
function DefaultValue(value: string) {
    return function (target: any, propertyName: string) {
        target[propertyName] = value;
    };
}

class TaskComponent {
    @DefaultValue('Task')
    type: string;
}
```

Ainsi, le décorateur `@DefaultValue` est utilisé pour définir une valeur par défaut pour la propriété `type` de la classe `TaskComponent`. Le décorateur est appliqué à la propriété `type` et prend la valeur par défaut comme paramètre.

### Décorateur de Paramètre

Un décorateur de paramètre est appliqué à un paramètre d'une méthode ou d'un constructeur.

```ts
function Print(target: any, methodName: string, paramIndex: number) {
    console.log(`Print Decorator called on: method ${methodName}, paramIndex ${paramIndex}`);
}

class TaskComponent {
    updateTask(@Print id: number) {}
}
```