# Cheatsheet des Commandes Angular

## Table des Matières

1. [Créer un projet Angular](#créer-un-projet-angular)
2. [Créer un composant](#créer-un-composant)
3. [Créer une directive](#créer-une-directive)
4. [Créer un service](#créer-un-service)
5. [Créer un pipe](#créer-un-pipe)
6. [Lancer un serveur de développement](#lancer-un-serveur-de-développement)

---

### Créer un projet Angular

**Commande:**  

```bash
ng new nom-projet
```

**Options courantes :**

- `--routing`: Ajoute le routage au projet.
- `--style=scss`: Utilise SCSS pour les styles au lieu de CSS.

Pour ce cours, je vous conseille néanmoins le flag `--no-standalone`. Comme ça vous aurez accès à `app.module.ts` et autres fichiers de configuration. Donc au minimum:

```bash
ng new nom-projet --no-standalone
```

---

### Créer un composant

**Commande:**  

```bash
ng generate component nom-composant
```

ou plus court :

```bash
ng g c nom-composant
```

**Options courantes :**

- `--skipTests`: Ne crée pas les fichiers de test.

---

### Créer une directive

**Commande:**  

```bash
ng generate directive nom-directive
```

ou plus court :

```bash
ng g d nom-directive
```

---

### Créer un service

**Commande:**  

```bash
ng generate service nom-service
```

ou plus court :

```bash
ng g s nom-service
```

---

### Créer un pipe

**Commande:**  

```bash
ng generate pipe nom-pipe
```

ou plus court :

```bash
ng g p nom-pipe
```

---

### Lancer un serveur de développement

**Commande:**  

```bash
ng serve
```

**Options courantes :**

- `--open` ou `-o`: Ouvre le navigateur après le lancement du serveur.
- `--port=XXXX`: Spécifie un port différent pour le serveur.
