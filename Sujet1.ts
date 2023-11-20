interface ILivre {
    id: number;
    titre: string;
    auteur: string;
    anneePublication: number;
    emprunteur?: IUser;
}

interface IUser {
    nom: string;
    email: string;
    livres: ILivre[];
    emprunterLivre(livre: ILivre): void;
    retournerLivre(livre: ILivre): void;
}

class Livre implements ILivre {
    constructor(public id: number, public titre: string, public auteur: string, public anneePublication: number) { }
}

class User implements IUser {
    public livres: ILivre[] = [];

    constructor(public nom: string, public email: string) { }

    emprunterLivre(livre: ILivre): void {
        if (!livre.emprunteur) {
            this.livres.push(livre);
            livre.emprunteur = this;
        } else {
            console.log("Le livre est déjà emprunté");
        }
    }

    retournerLivre(livre: ILivre): void {
        const index = this.livres.indexOf(livre);
        if (index > 1) {
            this.livres.splice(index, 1);
            livre.emprunteur = undefined;
        }
    }


}

class Bibliotheque {
    private livres: ILivre[] = [];
    private utilisateurs: IUser[] = [];

    listeLivres(): ILivre[] {
        return this.livres;
    }

    ajouterLivre(livre: ILivre): void {
        this.livres.push(livre);
    }

    ajouterUtilisateur(utilisateur: IUser): void {
        this.utilisateurs.push(utilisateur);
    }

    retirerLivre(livre: ILivre): void {
        const index = this.livres.indexOf(livre);
        if (index > -1) {
            this.livres.splice(index, 1);
        }
    }

    rechercheLivre(titre?: string, auteur?: string, anneePublication?: number): ILivre[] {
        return this.livres.filter(livre => 
            (!titre || livre.titre.includes(titre)) &&
            (!auteur || livre.auteur.includes(auteur)) &&
            (!anneePublication || livre.anneePublication === anneePublication)
        );
    }

}

const bibli = new Bibliotheque();

const livre1 = new Livre(1, "Detective Conan", "Gosho Aoyama", 1994);
const livre2 = new Livre(2, "One Piece", "Eiichiro Oda", 1997);

const user1 = new User("Toto", "truc@gmail.com")
const user2 = new User("Titi", "zoom@zoom.fr");

bibli.ajouterLivre(livre1);
bibli.ajouterLivre(livre2);

bibli.ajouterUtilisateur(user1);
bibli.ajouterUtilisateur(user2);

user1.emprunterLivre(livre1);
user2.emprunterLivre(livre2);

console.log(bibli.listeLivres());
console.log(user1.livres);

user1.retournerLivre(livre1);
console.log(user1.livres);