import { Client } from "./client.model";
import { Commande } from "./commande";
import { CommandeElement } from "./commande-element";
import { Utilisateur } from "./utilisateur.model";

export class Achat {

    client! : Client;
    commande! : Commande;
 //   numCarteCredit! : string;
    //autre elements
    commandeElements : CommandeElement[];
}
