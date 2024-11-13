import { Component, OnInit } from '@angular/core';
import { ElementPanier } from 'src/app/model/element-panier';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-panier-detail',
  templateUrl: './panier-detail.component.html',
  styleUrls: ['./panier-detail.component.css']
})
export class PanierDetailComponent implements OnInit {


  
  allPanierElement : ElementPanier[] = [];
  prixTotal : number =0;
  quantiteTotal : number =0;

  constructor(private panierService : PanierService) { } 
 
  ngOnInit(): void {

    this.listPanierElement();
  }


  listPanierElement(){
    //
    this.allPanierElement = this.panierService.elementPaniers;

    //
    this.panierService.totalprix.subscribe(
      data => this.prixTotal = data
    );

    //on recupere la quantité total
    this.panierService.totalquantite.subscribe(
      data => this.quantiteTotal = data
    );
    //on recalcule le prix total et la quantité total
    this.panierService.calculerTotalPanier();
  }


  incrementQuantite( produitPanier : ElementPanier) {
    //on incremente la quantite en ajoutant un produit 
    this.panierService.addToPanier(produitPanier);
    }

    decrementQuantite(produitPanier: ElementPanier) {
      
      this.panierService.decrementQuantite(produitPanier);
      }
      
      supprimerDuPanier(produitPanier: ElementPanier) {
        this.panierService.supprimerProduit(produitPanier);
        }
}
