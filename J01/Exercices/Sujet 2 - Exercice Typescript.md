# **Atelier Pratique - Gestionnaire de Tâches Simplifié en TypeScript**

## **1. Introduction**

L'objectif de cet atelier est de développer un petit gestionnaire de tâches en TypeScript. Cela vous permettra de mettre en pratique les bases des types, interfaces et classes de TypeScript.

## **2. Exigences**

### **a. Modèles**

- **Tâche** : Chaque tâche aura un titre, une description et un état (à faire, en cours, terminé).

### **b. Fonctionnalités**

- **Ajouter/Supprimer une tâche** : Ajoutez ou supprimez une tâche de la liste.
- **Changer l'état d'une tâche** : Modifiez l'état d'une tâche (par exemple, de "à faire" à "en cours").

## **3. Instructions**

1. **Définissez les modèles**:
   - Utilisez une énumération (**Enum**) TypeScript pour les états de tâche (à faire, en cours, terminé).
   - Utilisez une classe TypeScript pour définir le modèle `Tâche`.
   - Si nécessaire, utilisez une interface pour définir les fonctionnalités que la classe `Tâche` devrait avoir.

2. **Créez une classe 'GestionnaireTâches'**:
   - Cette classe devrait contenir une liste de tâches (un tableau de tâches avec une interface)
   - Elle devrait offrir des méthodes pour ajouter/supprimer une tâche, et changer l'état d'une tâche. Donc soit `push` ou `splice`.

3. **Testez votre application**:
   - Créez quelques tâches et changez leur état.
   - Assurez-vous que votre code profite des fonctionnalités de TypeScript pour garantir la sécurité des types.

## **4. Rendu**

Une fois terminé, publiez votre code sur Github. Bien entendu, passer sur Github dès le début pour faire des petits commits réguliers est une bonne pratique.
