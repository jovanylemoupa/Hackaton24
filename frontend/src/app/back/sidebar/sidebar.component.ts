import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() select = new EventEmitter<string>(); // Émet un événement avec le nom du composant sélectionné

  selectProduits() {
    this.select.emit('produit'); // Émet l'événement pour afficher les produits
  }

  selectUtilisateurs() {
    this.select.emit('utilisateur'); // Émet l'événement pour afficher les utilisateurs
  }

  selectPanier() {
    this.select.emit('panier'); // Émet l'événement pour afficher le panier
  }

  selectAjouterProduit() {
    this.select.emit('ajouter-produit'); // Émet l'événement pour afficher le formulaire d'ajout de produit
  }

  selectAfficherProduits() {
    this.select.emit('afficher-produits'); // Émet l'événement pour afficher la liste des produits
  }

  selectModifierProduit() {
    this.select.emit('modifier-produit'); // Émet l'événement pour afficher le formulaire de modification de produit
  }
}
