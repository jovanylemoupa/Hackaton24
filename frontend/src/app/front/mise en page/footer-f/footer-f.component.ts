import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { ProduitService } from 'src/app/services/produit.service'; // Service pour l'abonnement

@Component({
  selector: 'app-footer-f',
  templateUrl: './footer-f.component.html',
  styleUrls: ['./footer-f.component.css']
})
export class FooterFComponent {
  subscribeForm: FormGroup;
  subscriptionMessage: string | null = null;
  subscriptionError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private produitService: ProduitService,
    private notificationService: NotificationService // Inject the NotificationService
  ) {
    // Initialiser le formulaire
    this.subscribeForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]] // Valider l'email
    });
  }
  
  // Méthode appelée lors de la soumission du formulaire
  onSubmit() {
    if (this.subscribeForm.valid) {
      const email = this.subscribeForm.get('email')?.value;
  
      // Show waiting notification
      this.notificationService.show("Envoi de l'abonnement en cours...", 'waiting');
      
      this.produitService.subscribe(email).subscribe({
        next: (response: string) => {
          console.log(response);
          // Replace waiting notification with success notification
          this.notificationService.show("Abonnement réussi ! Email de confirmation envoyé.", 'success');
        },
        error: (err) => {
          console.log(err);
          // Replace waiting notification with error notification
          this.notificationService.show("Échec de l'abonnement. Veuillez réessayer.", 'error');
        }
      });
    } else {
      // Show validation error notification
      this.notificationService.show("Veuillez entrer une adresse email valide.", 'error');
    }
  }
  
}
