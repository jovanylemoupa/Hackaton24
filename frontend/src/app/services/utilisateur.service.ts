import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Utilisateur } from '../model/utilisateur.model';
import { UserStorageService } from './storage/user-storage.service';


@Injectable({
  providedIn: 'root'
})

export class UtilisateurService {
  private apiUrl = "http://localhost:8089/e_commerce/user";

  constructor(
    private httpClient: HttpClient,
    private userStorage: UserStorageService
  ) { }

  // Récupérer tous les Utilisateurs
  getUtilisateurs(): Observable<Utilisateur[]> {
    return this.httpClient.get<Utilisateur[]>(this.apiUrl + "/getUsers");
  }

  // Récupérer un Utilisateur par email
  getUtilisateurByEmail(email: string): Observable<Utilisateur> {
    return this.httpClient.get<Utilisateur>(`${this.apiUrl}/${email}`);
  }

  // Ajouter un nouveau Utilisateur
  addUtilisateur(Utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.httpClient.post<Utilisateur>(this.apiUrl + "/addUser", Utilisateur);
  }

  // Mettre à jour un Utilisateur existant
  updateUtilisateur(email: string, Utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.httpClient.put<Utilisateur>(`${this.apiUrl}/${email}`, Utilisateur);
  }

  // Supprimer un Utilisateur
  deleteUtilisateur(email: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/deleteUser/${email}`);

  }

  // Authentification d'un nouveau Utilisateur

  /*login(Utilisateur: Utilisateur): Observable<Utilisateur> {
  //const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //const username = Utilisateur.Email;
  //const password = Utilisateur.Password;

  // Correction ici pour créer un objet body
 // const body = { username, password };
    //console.log(body);
    //body, { headers, observe: 'response' }
    return this.httpClient.post<Utilisateur>(this.apiUrl + '/login', Utilisateur )
    .pipe(
      map(res => {
        const token = res.headers.get('Authorization')?.substring(7); // Utilisation de l'opérateur optional chaining
        const user = res.body;

        if (token && user) {
          this.userStorage.saveToken(token);
          this.userStorage.saveUser(user);
          return true;
        }
        return false;
      })
    );
}*/

  login(Utilisateur: Utilisateur): Observable<boolean> {
    return this.httpClient.post<Utilisateur>(this.apiUrl + '/login', Utilisateur, { observe: 'response' })
      .pipe(
        map(res => {
          const token = res.headers.get('Authorization')?.substring(7); // Extraction du token sans les 7 premiers caractères "Bearer "
          const user = res.body;

          if (token && user) {
            // Sauvegarder le token et les informations utilisateur dans le stockage local
            UserStorageService.saveToken(token);
            UserStorageService.saveUser(user);
            return true; // Connexion réussie
          }
          return false; // Si le token ou l'utilisateur n'existe pas
        })
      );
  }


  getUserInfo() {
    return this.httpClient.get(this.apiUrl + "/info");
  }

  logout(): Observable<void> {
    return this.httpClient.post<void>(`${this.apiUrl}/logout`, {});
  }

}
