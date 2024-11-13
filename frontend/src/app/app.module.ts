import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeFComponent } from './front/Acuueil/home-f/home-f.component';
import { PanierFComponent } from './front/panier-f/panier-f.component';
import { FooterFComponent } from './front/mise en page/footer-f/footer-f.component';
import { NavbarFComponent } from './front/mise en page/navbar-f/navbar-f.component';
import { ProductFComponent } from './front/Boutique/product-f/product-f.component';
import { CheckoutComponent } from './front/checkout/checkout.component';
import { UserAccountComponent } from './front/User/user-account/user-account.component';
import { SearchBarComponent } from './front/Boutique/search-bar/search-bar.component'; 
 import { CommandeComponent } from './front/commande/commande.component';
import { StatusPanierComponent } from './front/status-panier/status-panier.component';
import { PanierDetailComponent } from './front/panier-detail/panier-detail.component';
import { NotificationComponent } from './front/notification/notification.component';
import { BigDealsComponent } from './front/Acuueil/big-deals/big-deals.component';
import { ShopComponent } from './front/Boutique/shop.component';
import { HeaderComponent } from './back/header/header.component';
import { FooterComponent } from './back/footer/footer.component';
import { SidebarComponent } from './back/sidebar/sidebar.component';
import { AfficherProduitsComponent } from './back/produit back component/afficher-produits/afficher-produits.component';
import { HomeBackComponent } from './back/home-back/home-back.component';
import { CustomRouterComponent } from './back/custom-router/custom-router.component';
import { ModifierProduitComponent } from './back/produit back component/modifier-produit/modifier-produit.component';
import { AjouterProduitComponent } from './back/produit back component/ajouter-produit/ajouter-produit.component';
import { DynamiqueImageSearchComponent } from './front/Acuueil/dynamique-image-search/dynamique-image-search.component';
import { LoginComponent } from './front/User/login/login.component';
import { InscriptionComponent } from './front/User/inscription/inscription.component';
import { ProfilComponent } from './front/User/profil/profil.component';
 
@NgModule({
  declarations: [
    AppComponent,
    HomeFComponent,
    PanierFComponent,
    FooterFComponent,
    NavbarFComponent,
    ProductFComponent, 
    CheckoutComponent,
    UserAccountComponent,
    SearchBarComponent,
    DynamiqueImageSearchComponent, 
    CommandeComponent,
    StatusPanierComponent,
    PanierDetailComponent,
    NotificationComponent,
    BigDealsComponent,
    ShopComponent,
    LoginComponent,
    InscriptionComponent,
    ProfilComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AfficherProduitsComponent,
    HomeBackComponent,
    CustomRouterComponent,
    ModifierProduitComponent,
    AjouterProduitComponent
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
