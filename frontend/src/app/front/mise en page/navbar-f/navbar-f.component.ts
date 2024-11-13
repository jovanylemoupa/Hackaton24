import { Component } from '@angular/core';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { Router } from '@angular/router';
import { UserStorageService } from '../../../services/storage/user-storage.service';




@Component({
  selector: 'app-navbar-f',
  templateUrl: './navbar-f.component.html',
  styleUrls: ['./navbar-f.component.css']
})
export class NavbarFComponent {

  sAdminLogIn: boolean = UserStorageService.isAdminLogIn();
  isClienLogIn: boolean = UserStorageService.isClientLogIn();

  constructor(
    private UtilisateurService: UtilisateurService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      this.isClienLogIn = UserStorageService.isClientLogIn();
    })
  }

  /*logout() {
    this.UtilisateurService.logout().subscribe({
      next: () => {
        console.log('Déconnexion réussie');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erreur lors de la déconnexion', error);
      }
    });
  }*/



  logOut() {
    UserStorageService.logOut();
    this.router.navigateByUrl('/home');
  }

}
