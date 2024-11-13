import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeFComponent } from './front/Acuueil/home-f/home-f.component';
import { PanierFComponent } from './front/panier-f/panier-f.component';
import { CommandeComponent } from './front/commande/commande.component';
  import { PanierDetailComponent } from './front/panier-detail/panier-detail.component';
import { CheckoutComponent } from './front/checkout/checkout.component';
import { ShopComponent } from './front/Boutique/shop.component';
import { HomeBackComponent } from './back/home-back/home-back.component';
import { InscriptionComponent } from './front/User/inscription/inscription.component';
import { LoginComponent } from './front/User/login/login.component';
import { ProfilComponent } from './front/User/profil/profil.component';


const routes: Routes = [
    //################# FRONT-OFFICE #################

  { path: '', component: HomeFComponent},
  { path: 'home', component: HomeFComponent},
  { path: 'panier', component: PanierFComponent},
  { path: 'panierDetail', component: PanierDetailComponent},
  { path: 'commande', component: CommandeComponent},
  { path: 'validerPanier', component: CheckoutComponent},
  { path: 'shop', component: ShopComponent }, // Ensure you have this line for your shop component
  { path: 'registration', component: InscriptionComponent }, // Ajoute la route pour l' inscription
  { path: 'login', component: LoginComponent }, // Ajoute la route pour l' inscription
  { path: 'profil', component: ProfilComponent }, // Ajoute la route pour l' inscription
 


  //################# BACK-OFFICE #################
  {path: 'home-back', component: HomeBackComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
