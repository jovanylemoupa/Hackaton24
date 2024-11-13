import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProduitService } from 'src/app/services/produit.service';
import { Produit } from 'src/app/model/produit';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchForm: FormGroup;
  products: Produit[] = []; // Store retrieved products

  constructor(private fb: FormBuilder, private produitService: ProduitService) {
    // Initialize the search form with form controls
    this.searchForm = this.fb.group({
      nom: [''],
      description: [''],
      prixMin: [''],
      prixMax: ['']
    });
  }

  onSearch() {
    const criteria = this.searchForm.value; // Get the form values
    this.produitService.searchProductcriteria(criteria).subscribe({
      next: (response: any) => {
        console.log(response); // Check response structure
        if (Array.isArray(response.data)) { // Check if response.data is an array
          this.products = response.data; // Update the local products array
          this.produitService.setProducts(response.data); // Optionally update products in the service
        } else {
          console.error('La réponse ne contient pas un tableau valide de produits');
        }
      },
      error: (err) => {
        console.error('Error searching products:', err);
      }
    });
  }
}  