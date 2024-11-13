import { Injectable } from '@angular/core';
import { Produit } from '../model/produit';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private url = "http://localhost:8089/e_commerce/produit";
  public products: Produit[] = []; // Store retrieved products

  constructor(private httpClient: HttpClient) {
    this.getProductList().subscribe({
      next: (response: any) => {
        console.log(response); // Check response structure
        if (Array.isArray(response.data)) {
          // Directly assign to the service's products list
          this.products = response.data;
        } else {
          console.error('La réponse ne contient pas un tableau valide de produits');
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des produits', err);
      }
    });
  }
    // Méthode pour récupérer les produits "Big Deal"
    getBigDealProduits(remiseThreshold: number): Observable<Produit[]> {
      const params = new HttpParams().set('remiseThreshold', remiseThreshold.toString());
      return this.httpClient.get<Produit[]>(`${this.url}/big-deals`, { params });
    }
  // Méthode pour envoyer l'email d'abonnement et lire la réponse
  // Méthode pour envoyer l'email d'abonnement
  subscribe(email: string): Observable<any> {
    const url = `${this.url}/subscribe`;
    return this.httpClient.post(url, { email });
  }
  // Method to retrieve stored products
  getProducts(): Produit[] {
    return this.products;
  }

  setProducts(products: Produit[]): void {
    this.products = products;
  }

  getProductList(): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/all`);
  }

  getProduct(id: number): Observable<Produit> {
    return this.httpClient.get<Produit>(`${this.url}/get/${id}`);
  }

  searchProduct(keyword: string): Observable<Produit[]> {
    return this.httpClient.get<Produit[]>(`${this.url}/search?keyword=${keyword}`);
  }
  addSProduit(produit: Produit): Observable<Produit> {
    return this.httpClient.post<Produit>(`${this.url}/addsingle`, produit);
  }

  addProduit(produit: Produit): Observable<Produit> {
    return this.httpClient.post<Produit>(`${this.url}/add`, produit);
  }

  updateProduit(produit: Produit): Observable<Produit> {
    return this.httpClient.put<Produit>(`${this.url}/update`, produit);
  }

  deleteProduit(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/delete/${id}`);
  }

  getProductListPagination(currentPage: number, pageSize: number): Observable<any> {
    return this.httpClient.get(`${this.url}?page=${currentPage}&size=${pageSize}`);
  }

  searchProductcriteria(criteria: { [key: string]: string }): Observable<Produit[]> {
    const params = new HttpParams({ fromObject: criteria });
    return this.httpClient.get<Produit[]>(`${this.url}/search`, { params });
  }
}
