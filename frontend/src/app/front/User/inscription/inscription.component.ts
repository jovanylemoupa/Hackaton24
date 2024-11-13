import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  inscriptionForm!: FormGroup;
    submitted=  false;
    errorMessage =  "";

  constructor(
    private formBuilder: FormBuilder,
    private ClientService: ClientService,
    private router: Router
  ) { }

  get f() { return this.inscriptionForm.controls; }

  
  ngOnInit(): void {
    this.inscriptionForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],

    });
  }

 

    onSubmit(): void {

    this.submitted = true;
    this.errorMessage = '';

      if (this.inscriptionForm.invalid) {
        return;
      }


    console.log(" Le client: ", this.inscriptionForm.value)
    //if (this.inscriptionForm.valid) {
      const client = this.inscriptionForm.value;

      // Appel au service d'inscription
      this.ClientService.addClient(client).subscribe(
        (response) => {
          console.log('Inscription réussie !', response);
          // Redirection vers une autre page après l'inscription
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Erreur lors de l\'inscription', error);
        }
      );
    //}
    //this.router.navigate(['/login']);
  }
}
