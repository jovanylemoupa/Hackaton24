import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-router',
  templateUrl: './custom-router.component.html',
  styleUrls: ['./custom-router.component.css']
})
export class CustomRouterComponent {
  currentComponent: string = 'produit'; // État par défaut

  // Méthodes pour changer le composant affiché
  setComponent(component: string) {
    this.currentComponent = component;
  }
}
