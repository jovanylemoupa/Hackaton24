import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserStorageService } from '../../../services/storage/user-storage.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isAdminLogIn: boolean = UserStorageService.isAdminLogIn();
  isClienLogIn: boolean = UserStorageService.isClientLogIn();

  loginForm!: FormGroup;
    submitted = false;
    errorMessage = '';



  constructor(
    private formBuilder: FormBuilder,
    private ClientService: ClientService,
    private UtilisateurService: UtilisateurService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
     

    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      return;
    }


    const credentials = this.loginForm.value;
    this.UtilisateurService.login(credentials).subscribe({
      next: (response: any) => {
        console.log('Connexion réussie !', response);
        // Stockez le token si nécessaire
        // localStorage.setItem('token', response.token);
        //if (UserStorageService.())
        // this.isClienLogIn = UserStorageService.isClientLogIn();
        // this.isAdminLogIn = UserStorageService.isAdminLogIn();
       if (UserStorageService.isAuthenticated() && this.isAdminLogIn)
       {
        this.router.navigate(['/home-back']);
       }
        if(UserStorageService.isAuthenticated() && this.isClienLogIn)
       {
        this.router.navigate(['/home']);
       }

        // this.router.navigate(['/home']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erreur lors de la connexion', error);
        if (error.status === 401) {
          this.errorMessage = 'Email ou mot de passe incorrect';
        } else {
          this.errorMessage = 'Une erreur est survenue. Veuillez réessayer plus tard.';
        }
      },
      complete: () => {
        // Optionnel : actions à effectuer une fois l'opération terminée
      }
    });

  }

}
