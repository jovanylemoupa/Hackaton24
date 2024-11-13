import { Component, EventEmitter, OnInit, Output } from '@angular/core'; 
import { Produit } from 'src/app/model/produit';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-afficher-produits',
  templateUrl: './afficher-produits.component.html',
  styleUrls: ['./afficher-produits.component.css']
})
export class AfficherProduitsComponent implements OnInit {
  produits: Produit[] = []; // Liste des produits à afficher
  @Output() edit = new EventEmitter<number>(); // Émetteur d'événements pour le produit à modifier

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.loadProduits(); // Charge la liste des produits au démarrage
  }

  loadProduits(): void {
    this.produitService.getProductList().subscribe({
      next: (response: any) => {
        console.log(response); // Vérifiez la structure de la réponse
        if (Array.isArray(response.data)) {
          this.produits = response.data; // Mettez à jour la liste des produits
        } else {
          console.error('La réponse ne contient pas un tableau valide de produits');
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des produits', err);
      }
    });
  }

  editProduit(produit: Produit): void {
    this.edit.emit(produit.id); // Émet l'ID du produit à modifier
  }

  deleteProduit(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.produitService.deleteProduit(id).subscribe(() => {
        this.loadProduits(); // Rechargez la liste des produits après la suppression
      }, error => {
        console.error('Erreur lors de la suppression du produit', error);
      });
    }
  }
}
