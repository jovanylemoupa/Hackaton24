import { Injectable } from '@angular/core';
import { ElementPanier } from '../model/element-panier';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanierService {


  elementPaniers: ElementPanier[] = [];

  totalprix: Subject<number> = new BehaviorSubject<number>(0);
  totalquantite: Subject<number> = new BehaviorSubject<number>(0);

  //on utilise le stockage du navigateur pour stocker les données
  // storage : Storage = sessionStorage;
  storage : Storage = localStorage;

  constructor() { 

    // lire les donnee du  stockage
    let data = JSON.parse(this.storage.getItem('elementPaniers')!);

    if(data != null){
      this.elementPaniers = data;

      //calcul des totaux basé sur les données stockées
      this.calculerTotalPanier();
    }
  }

  addToPanier(panierElt: ElementPanier) {
    //on verifie si on a un élément dans le panier
    let dejaExistDansPanier: boolean = false;
    let ElementExistantDansPanier: ElementPanier | undefined = undefined;

    if (this.elementPaniers.length > 0) {
      //on cherche lelement dans le panier grace a son ID
      ElementExistantDansPanier = this.elementPaniers.find(elt => elt.id == panierElt.id);

      // on verifie si on a trouvé quelque chose
      dejaExistDansPanier = (ElementExistantDansPanier != undefined);
    }

    if (dejaExistDansPanier) {
      //on incremente la quantite
      ElementExistantDansPanier!.quantite++
    } else {
      //on ajoute l'element dans le panier
      this.elementPaniers.push(panierElt);
    }
    //on met a jour le prix total et la quantite total
    this.calculerTotalPanier();

  }

  calculerTotalPanier() {
    let prixTotal = 0;
    let quantiteTotal = 0;
    
    
    for (let elt of this.elementPaniers) {
      prixTotal += elt.prixUnitaire * elt.quantite;
      quantiteTotal += elt.quantite;
    }
    //metre les nouvelle valeur
    this.totalprix.next(prixTotal);
    this.totalquantite.next(quantiteTotal);

    //gestion loo pour voir si sa marche
    this.logPanierData(prixTotal, quantiteTotal);

    //on stocke les données dans le stockage du navigateur
    this.persisterPanierElement();
  }

  persisterPanierElement() {
    //on stocke les données dans le stockage du navigateur 
    //storage ne prend que des chaines de caractères c'est 
    //pour cela qu'on utilise JSON.stringify qui nos objets qui 
    //sont en Json pour les convertir en chaine de caractères
    //storage pour stocker utilise la methode setItem qui prend
    //deux parametres le premier est la clé et le deuxieme est la valeur
    this.storage.setItem('elementPaniers', JSON.stringify(this.elementPaniers));
  }


  logPanierData(prixTotal : number, quantiteTotal : number) {
    console.log('Panier Data: ');
    for(let elt of this.elementPaniers){
      const subTotal = elt.prixUnitaire * elt.quantite;
      console.log(' Nom: ' + elt.name + ' Prix Unitaire: ' + elt.prixUnitaire + ' Quantite: ' + elt.quantite + ' Sous Total: ' + subTotal);
    }

    console.log('Prix Total: ' + prixTotal + ' Quantite Total: ' + quantiteTotal);
    console.log('----------------------'); 
  } 


  decrementQuantite(produitPanier: ElementPanier) {
    
    //on decremente la quantite
      produitPanier.quantite--;
      //on verifie si la quantite est inferieur a 0
      if(produitPanier.quantite == 0){
        //on supprime le produit du panier
        this.supprimerProduit(produitPanier);
      }else{
        //on recalcule le prix total et la quantite total
        this.calculerTotalPanier();
      }
  }

  supprimerProduit(produitPanier: ElementPanier) {
    //on recupere l'index de l'element a supprimer
    const index = this.elementPaniers.findIndex(elt => elt.id == produitPanier.id);
    
    //on verifie si l'element existe
    if(index > -1){
      //on supprime l'element du panier
      this.elementPaniers.splice(index, 1);
      //on recalcule le prix total et la quantite total
      this.calculerTotalPanier();
    }
  }

}

