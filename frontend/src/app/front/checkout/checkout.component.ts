import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { Achat } from 'src/app/model/achat';
import { Commande } from 'src/app/model/commande';
import { CommandeElement } from 'src/app/model/commande-element';
import { PaymentInfo } from 'src/app/model/payment-info';
import { AchatService } from 'src/app/services/achat.service';
import { PanierService } from 'src/app/services/panier.service';
import Swal from 'sweetalert2';
//import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  validerPanierFormGroup: FormGroup;
  prixTotal: number = 0;
  quantiteTotal: number = 0;


  //initialisation de Stripe API
  stripe = Stripe(environment.stripePublicKey);


  paymentInfo: PaymentInfo = new PaymentInfo();
  cardElement: any;
  displayError: any = "";


  constructor(private formBuilder: FormBuilder,
    private panierService: PanierService,
    private achatService: AchatService,
    private router: Router
  ) { }


  ngOnInit(): void {
    //creation du formulaire stripe
    this.setupStripePaymentForm();

    //ici dans les formcontrol tu dois penser a revenir mettre les infos de l'utilisateur connecté

    this.validerPanierFormGroup = this.formBuilder.group({
      //client
      client: this.formBuilder.group({
        nom: new FormControl("john", [Validators.required, Validators.minLength(3)]),
        prenom: new FormControl("john", [Validators.required, Validators.minLength(3)]),
        email: new FormControl("jhon@gmail.com",
          [Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
        adresse: new FormControl('', [Validators.required, Validators.minLength(4)]),
      }),

    });

    //carte de credit
    carteDeCredit: this.formBuilder.group({
      /*
      typeCarte: new FormControl('', [Validators.required]),
      numCarte: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{16}$')]),
      codeSecurite: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{4}$')]),
      */

    })

    // va nous permettre de relier le nbre et le prixtotal des produit à travers ce service pour l'afficher en temps réel 
    this.actualisationPanier();
  }


  //methode pour actualiser le prix et la qtite en live dans le html
  actualisationPanier() {
    // on recupere quantite total
    this.panierService.totalquantite.subscribe(
      data => {
        this.quantiteTotal = data;
      }
    );
    // on recupere le prix total
    this.panierService.totalprix.subscribe(
      (data) => {
        this.prixTotal = data;
      }
    );
    this.panierService.calculerTotalPanier();
  }


  //methode pour initialiser le formulaire de paiement stripe 
  setupStripePaymentForm() {
    // get handle to stripe element
    var elements = this.stripe.elements();

    // Create a card element ... and hide zipe-code field
    this.cardElement = elements.create('card', { hidePostalCode: true });

    //add an instance of card UI component into 'card-element' div.
    this.cardElement.mount('#card-element');

    //add an event listener to display any validation errors  in the UI
    this.cardElement.on('change', (event: any) => {

      //get a handle to card element
      this.displayError = document.getElementById('card-errors');

      if (event.complete) {
        this.displayError = "";
      } else if (event.error) {
        //show the error message to customer
        this.displayError.textContent = event.error.message;

      }
    });
  }


  //getter pour le client
  get nom() { return this.validerPanierFormGroup.get('client').get('nom'); }
  get prenom() { return this.validerPanierFormGroup.get('client').get('prenom'); }
  get email() { return this.validerPanierFormGroup.get('client').get('email'); }
  get adresse() { return this.validerPanierFormGroup.get('client').get('adresse'); }



//methode pour valider le panier
onSubmit() {
  console.log("valider le panier");
  console.log(this.validerPanierFormGroup.value);

  if (this.validerPanierFormGroup.invalid) {
    this.validerPanierFormGroup.markAllAsTouched();
    console.log("je suis dans panier invalid");
    return;
  }

  //on doit creer la commande
  let commande = new Commande();
  commande.prixTotal = this.prixTotal;
  commande.quantiteTotale = this.quantiteTotal;

  //on doit créer l'element du panier
  const allPanierElements = this.panierService.elementPaniers;
  //on doit creer le commandElement de lelement du panier
  let commandElements: CommandeElement[] = allPanierElements.map(
    (elementPan) => new CommandeElement(elementPan)
  );

  // let commandElements: CommandeElement[] = [];
  // for (let i = 0; i < allPanierElements.length; i++) {
  //   commandElements[i] = new CommandeElement(allPanierElements[i]);
  // }

  //on doit creer l'achat
  let achat = new Achat();

  //on doit creer remplir l'achat avec le client
  achat.client = this.validerPanierFormGroup.controls['client'].value;
  console.log("ACHAT CLIENT CONTIENT", this.validerPanierFormGroup.controls['client'].value)
  console.log("CLIENT ENTIER CONTIENT", achat.client)


  //on doit creer remplir l'achat avec le commandElement
  achat.commande = commande;
  achat.commandeElements = commandElements;

  //################## NOUVEAU CODE TEST ######################################
  this.achatService.passerCommande(achat).subscribe({
    next: (response: any) => {
      Swal.fire(
        'Félicitation',
        `Votre payement a été effectué avec succès \n Numéro de commande : ${response.numeroSuiviCommande}`,
        'success'
      );
      
      //on vide le panier
      this.viderPanier();
    },
    error: (err: any) => {
      Swal.fire(
        'Erreur',
        `Il y a une erreur dans la passation de la commande : ${err}`,
        'error'
      );
    },
  });

  //########################################################
  // on doit creer le paymentInfo
  this.paymentInfo.amount = Math.round(this.prixTotal * 100);
  this.paymentInfo.currency = "EUR";
  console.log("EMAIL DU USER EST: ", this.validerPanierFormGroup.controls['client'].value.email)
  this.paymentInfo.receiptEmail = this.validerPanierFormGroup.controls['client'].value.email;

  //si le formulaire est valide on doit passer la commande

  if (!this.validerPanierFormGroup.invalid) {

    this.achatService.createPaymentIntent(this.paymentInfo).subscribe(
      
      (PayementIntentResponse) => {
        this.stripe
          .confirmCardPayment(PayementIntentResponse.client_secret, {
            payment_method: {
              card: this.cardElement,
              billing_details: {
                name:
                  this.validerPanierFormGroup.controls['client'].value.nom +
                  " " +
                  this.validerPanierFormGroup.controls['client'].value.prenom,
                email: this.validerPanierFormGroup.controls['client'].value.email,
                address: {
                  line1: this.validerPanierFormGroup.controls['client'].value.adresse,
                  city: 'Limoges',
                  state: 'FR',
                  country: 'FR',
                  postal_code: '87000',
                },
              },
            },
          }, { handleActions: false })
          .then((result: any) => {
            if (result.error) {
              console.log("je suis dedans");

              // Show error to your customer (e.g., insufficient funds)
              Swal.fire(
                'Erreur',
                `Il y a une erreur dans le payement : ${result.error.message}`,
                'error'
              );
            } else {
              // The payment has been processed!
              if (result.paymentIntent.status === 'succeeded') {
                // Show a success message to your customer
                Swal.fire(
                  'Félicitation',
                  'Votre payement a été effectué avec succès',
                  'success'
                );
              }
            }
          });
      },
      (err: any) => {
        Swal.fire(
          'Erreur',
          `Il y a une erreur dans la passation de la commande : ${err}`,
          'error'
        );
      }
    );
  }
}




viderPanier() {

  //on vide le panier
  this.panierService.elementPaniers = [];
  this.panierService.totalquantite.next(0);
  this.panierService.totalprix.next(0);
  // this.panierService.persisterPanierElement();

  //on vide le formulaire
  this.validerPanierFormGroup.reset();

  //on redirige vers la page d'accueil
  this.router.navigateByUrl("/home");
}
  

}
