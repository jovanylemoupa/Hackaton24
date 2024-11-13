import { Component, OnInit, OnDestroy } from '@angular/core';
import { ElementPanier } from 'src/app/model/element-panier';
import { Produit } from 'src/app/model/produit';
import { PanierService } from 'src/app/services/panier.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-big-deals',
  templateUrl: './big-deals.component.html',
  styleUrls: ['./big-deals.component.css']
})
export class BigDealsComponent implements OnInit, OnDestroy {
  bigDealProducts: Produit[] = [];
  currentStartIndex: number = 0; // Index of the first product to display
  autoScrollInterval: any; // Variable to hold the interval

  constructor(private produitService: ProduitService, private panierService: PanierService) {}

  ngOnInit(): void {
    // Fetch the big deal products based on a discount threshold
    this.produitService.getBigDealProduits(0).subscribe((products) => {
      this.bigDealProducts = products;

      // Start automatic scrolling when products are fetched
      this.startAutoScroll();
    });
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
    }
  }

  startAutoScroll(): void {
    this.autoScrollInterval = setInterval(() => {
      this.scrollRight();
    }, 6000); // Scroll every 6 seconds
  }

  scrollLeft(): void {
    if (this.currentStartIndex > 0) {
      this.currentStartIndex--; // Move to the previous product
    }
  }

  scrollRight(): void {
    if (this.currentStartIndex + 4 < this.bigDealProducts.length) {
      this.currentStartIndex++; // Move to the next product
    } else {
      this.currentStartIndex = 0; // Reset to the first product if at the end
    }
  }

  get displayedProducts(): Produit[] {
    return this.bigDealProducts.slice(this.currentStartIndex, this.currentStartIndex + 4);
  }

  ajouterAuPanier(produit: Produit): void {
    // Implement adding to cart logic here
    console.log(`${produit.nom} ajouté au panier.`);
    let elementPanier = new ElementPanier(produit);
    this.panierService.addToPanier(elementPanier)
  }
}
