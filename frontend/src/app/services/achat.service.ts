import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Achat } from '../model/achat';
import { Observable } from 'rxjs';
import { PaymentInfo } from '../model/payment-info';

@Injectable({
  providedIn: 'root'
})
export class AchatService {

  private achatUrl = "http://localhost:8089/e_commerce/commande/add";

  private payementUrl = "http://localhost:8089/e_commerce/commande/payment-intent";

  constructor(private httpClient : HttpClient) { }

  passerCommande(achat : Achat): Observable<any>{
    console.log("JE SUIS DANS LE SERVICE ET LA VALEUR DE ACAHAT EST: ",achat);
    return this.httpClient.post<Achat>(this.achatUrl,achat);
  }

  createPaymentIntent(paymentInfo : PaymentInfo): Observable<any>{
    console.log("JE SUIS DANS LE SERVICE ET LA VALEUR DE ACAHAT EST: ",paymentInfo);

    return this.httpClient.post<PaymentInfo>(this.payementUrl,paymentInfo);
  }
}
