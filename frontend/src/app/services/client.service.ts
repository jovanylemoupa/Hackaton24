import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../model/client.model';


@Injectable({
  providedIn: 'root'
})

export class ClientService {
  private apiUrl = "http://localhost:8089/e_commerce/client";

  constructor(private httpClient: HttpClient) { }

  // Récupérer tous les clients
  getClients(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.apiUrl +"/getUsers");
  }

  // Récupérer un client par email
  getClientByEmail(email: string): Observable<Client> {
    return this.httpClient.get<Client>(`${this.apiUrl}/${email}`);
  }

  // Ajouter un nouveau client
  addClient(client: Client): Observable<Client> {
    return this.httpClient.post<Client>(this.apiUrl + "/sign-up", client);
  }

  // Mettre à jour un client existant
  updateClient(email: string, client: Client): Observable<Client> {
    return this.httpClient.put<Client>(`${this.apiUrl}/updateUser/${email}`, client);
  }

  // Supprimer un client
  deleteClient(email: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/deleteUser/${email}`);

  }

}
