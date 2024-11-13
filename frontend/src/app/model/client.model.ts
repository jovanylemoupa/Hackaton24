import { Utilisateur } from './utilisateur.model';

export class Client extends Utilisateur {
  adresse: string;
  telephone: string;


  constructor(email: string, nom: string, prenom: string, mot_de_passe: string,role: string,  adresse: string, telephone: string) {

    super(email, nom, prenom, mot_de_passe,role);
    this.adresse = adresse;
    this.telephone = telephone;
  }


}
