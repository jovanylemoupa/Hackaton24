
export class Utilisateur {

  protected nom : string;
  protected prenom : string;
  protected email : string;
  protected mot_de_passe: string;
  protected role: string;


  constructor(email: string, nom: string, prenom: string, mot_de_passe: string, role: string) {

    this.email = email;
    this.nom = nom;
    this.prenom = prenom;
    this.mot_de_passe = mot_de_passe;
    this.role = role;
  }

  get Nom(): string { return this.nom; }
  get Prenom(): string { return this.prenom; }
  get Email(): string { return this.email; }
  get Role(): string { return this.role; }
  get Password(): string { return this.mot_de_passe; }

}
