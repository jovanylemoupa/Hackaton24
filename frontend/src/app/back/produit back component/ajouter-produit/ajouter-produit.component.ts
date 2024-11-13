import { Component } from '@angular/core';
import { Produit } from 'src/app/model/produit';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-ajouter-produit',
  templateUrl: './ajouter-produit.component.html',
  styleUrls: ['./ajouter-produit.component.css']
})
export class AjouterProduitComponent {
  produit: Produit = new Produit(0, '', '', 0, 0, '', 0); // Initialiser avec un nouveau produit
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private produitService: ProduitService) {}

  onSubmit(): void {
    this.produitService.addSProduit(this.produit).subscribe({
      next: () => {
        this.successMessage = 'Produit ajouté avec succès !';
        this.resetForm();
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du produit:', err);
        this.errorMessage = 'Erreur lors de l\'ajout du produit. Veuillez réessayer.';
      }
    });
  }

  resetForm(): void {
    this.produit = new Produit(0, '', '', 0, 0, '', 0); // Réinitialiser le formulaire
    this.errorMessage = null;
    this.successMessage = null;
  }
}
