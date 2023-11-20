# **Atelier Pratique - Application de Gestion de Bibliothèque en TypeScript**

## **1. Introduction**

L'objectif de cet atelier est de créer une petite application pour gérer une bibliothèque. Vous utiliserez TypeScript pour définir des classes, interfaces et types génériques.

## **2. Exigences**

### **a. Modèles**

- **Livre** : Chaque livre aura un titre, un auteur, une année de publication et un identifiant unique.
- **Utilisateur** : Chaque utilisateur aura un nom, une adresse e-mail et une liste de livres empruntés.

### **b. Fonctionnalités**

- **Ajouter/Retirer un livre** : La bibliothèque devrait pouvoir ajouter ou retirer un livre.
- **Emprunter/Retourner un livre** : Les utilisateurs devraient pouvoir emprunter ou retourner un livre.
- **Liste des livres** : Voir la liste des livres disponibles et empruntés.

### **c. Bonus**

- **Recherche de livre** : Par titre, auteur ou année de publication.
- **Historique d'emprunt** : Pour chaque livre, afficher une liste des utilisateurs qui l'ont emprunté et les dates.

## **3. Instructions**

1. **Définissez les modèles**:
   - Utilisez des classes TypeScript pour définir les modèles `Livre` et `Utilisateur`.
   - Utilisez des interfaces pour définir les fonctionnalités que chaque classe devrait avoir.
   - Si nécessaire, utilisez des types génériques pour certaines méthodes (par exemple, une méthode qui pourrait retourner différents types de modèles).

2. **Créez une classe 'Bibliothèque'**:
   - Cette classe devrait contenir une liste de livres et une liste d'utilisateurs.
   - Elle devrait offrir des méthodes pour ajouter/retirer un livre, emprunter/retourner un livre, etc.

3. **Testez votre application**:
   - Créez quelques livres et utilisateurs, puis simulez le processus d'emprunt et de retour de livres.
   - Assurez-vous que votre code respecte les règles de la programmation orientée objet et profite des fonctionnalités de TypeScript pour garantir la sécurité des types.

## **4. Rendu**

Une fois terminé, publiez votre code sur Github. Bien entendu, passer sur Github dès le début pour faire des petits commits réguliers est une bonne pratique.
