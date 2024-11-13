import { Component } from '@angular/core'; 
import { Produit } from 'src/app/model/produit';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-modifier-produit',
  templateUrl: './modifier-produit.component.html',
  styleUrls: ['./modifier-produit.component.css']
})
export class ModifierProduitComponent {
  produitId: number; // ID du produit à modifier
  produit: Produit | null = null; // Produit à modifier
  errorMessage: string | null = null;

  constructor(private produitService: ProduitService) {}

  fetchProduit(): void {
    if (this.produitId) {
      this.produitService.getProduct(this.produitId).subscribe({
        next: (response: any) => {
          if (response && response.data) {
            this.produit = response.data; // Récupérer les données du produit
            console.log("Produit récupéré: " + JSON.stringify(this.produit, null, 2)); // Afficher le produit en format JSON lisible
            this.errorMessage = null; // Réinitialise le message d'erreur
          } else {
            this.errorMessage = 'Aucune donnée trouvée pour ce produit.';
          }
        },
        error: (err) => {
          console.error('Erreur lors de la récupération du produit:', err);
          this.errorMessage = 'Produit introuvable. Vérifiez l\'ID et réessayez.';
          this.produit = null; // Réinitialise le produit
        }
      });
    }
  }
  
  onSubmit(): void {
    if (this.produit) {
      this.produitService.updateProduit(this.produit).subscribe({
        next: () => {
          alert('Produit modifié avec succès !');
          this.resetForm();
        },
        error: (err) => {
          console.error('Erreur lors de la modification du produit:', err);
          this.errorMessage = 'Erreur lors de la modification du produit. Veuillez réessayer.';
        }
      });
    }
  }

  resetForm(): void {
    this.produitId = null;
    this.produit = null;
    this.errorMessage = null;
  }
}
