import { Component } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../model/client.model';
import { UtilisateurService } from '../../../services/utilisateur.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {

  //liste des clients
  user: any;


  constructor(
    private clientService: ClientService,
    private UtilisateurService: UtilisateurService
  ) { }

  ngOnInit(): void {
    this.UtilisateurService.getUserInfo().subscribe({
      next: (response: any) => {
        this.user = response;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des informations utilisateur', error);
      }
    });
  }


}
