import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}

  // Méthode pour vérifier si l'URL actuelle est une route du back-office
  isBackOffice(): boolean {
    const backOfficeRoutes = [
      '/add',
      '/edit',
      '/delete',
      '/list',
      '/home-back',
      '/add-product-form'
    ];
    return backOfficeRoutes.includes(this.router.url);
  }

  // Méthode pour vérifier si l'URL actuelle est une page d'authentification
  isAuthPage(): boolean {
    const authRoutes = [
      '/registration',
      '/login'
    ];
    return authRoutes.includes(this.router.url);
  }
}
