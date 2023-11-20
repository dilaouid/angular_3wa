enum EtatTache {
    A_FAIRE = "A faire",
    EN_COURS = "En cours",
    TERMINE = "Terminé"
};

interface ITache {
    titre: string;
    description: string;
    etat: EtatTache;
}

class Tache implements ITache {
    constructor(public titre: string, public description: string, public etat: EtatTache) { }
}

class GestionnaireTache {
    private taches: ITache[] = [];

    ajouterTache(tache: ITache): void {
        this.taches.push(tache);
    }

    changerEtatTache(tache: ITache, etat: EtatTache) {
        tache.etat = etat;
    }

    listerTaches(): ITache[] {
        return this.taches;
    }

    supprimerTache(tache: ITache): void {
        const index = this.taches.indexOf(tache);
        if (index > -1) {
            this.taches.splice(index, 1);
        }
    }
}

const gestionnaire = new GestionnaireTache();

const tache1 = new Tache("Faire les courses", "Acheter du pain, du lait et des oeufs", EtatTache.A_FAIRE);
const tache2 = new Tache("Faire la vaisselle", "Ne pas oublier de laver les verres", EtatTache.EN_COURS);


gestionnaire.ajouterTache(tache1);
gestionnaire.ajouterTache(tache2);
gestionnaire.changerEtatTache(tache1, EtatTache.TERMINE);
gestionnaire.supprimerTache(tache2);
console.log(gestionnaire.listerTaches());