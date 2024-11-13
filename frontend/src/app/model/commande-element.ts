import { ElementPanier } from "./element-panier";

export class CommandeElement {
    numProd!: number;
    quantite!: number;
    imageUrl! : string;
    prixUnitaire! : number;
    //produit!: Produit;
    //utilisateur!: Utilisateur;
    //commande!: Commande;
    constructor(panierElement : ElementPanier){
        this.numProd = panierElement.id;
        this.quantite = panierElement.quantite;
        this.imageUrl = panierElement.imageUrl;
        this.prixUnitaire = panierElement.prixUnitaire;
    }
}
