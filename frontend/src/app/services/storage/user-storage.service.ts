import { Injectable } from '@angular/core';


// const TOKEN = 'ecom-token';
// const USER = 'ecom-user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  private static readonly TOKEN = 'ecom-token';
  private static readonly USER = 'ecom-user';

  constructor() { }


  public static saveToken(token: string): void {
    window.localStorage.removeItem(this.TOKEN);
    window.localStorage.setItem(this.TOKEN, token);
  }


  public static saveUser(user: any): void {
    window.localStorage.removeItem(this.USER);
    window.localStorage.setItem(this.USER, JSON.stringify(user));
  }



  public static getToken(): string | null {
    return localStorage.getItem(this.TOKEN);
  }

  public static getUser(): any {
    const user = localStorage.getItem(this.USER);
    // Vérification avant de parser
    if (user) {
      try {
        return JSON.parse(user);
      } catch (e) {
        console.error('Erreur lors du parsing des informations utilisateur :', e);
        return null;
      }
    }
    return null;  // Retourne null si aucune donnée n'est trouvée
  }

  public static isAuthenticated(): boolean{
    const token = this.getToken();
    return !!token;
  }

  public static getUserRole(): string | null {
    const user = this.getUser();
    return user ? user.role : null;
  }

  public static getUserEmail(): string | null {
    const user = this.getUser();
    return user ? user.email : null;
  }

  public static isAdminLogIn(): boolean {
    const role = this.getUserRole();
    return role === 'ADMIN';
  }

  public static isClientLogIn(): boolean {
    const role = this.getUserRole();
    return role === 'CLIENT';
  }

  public static logOut(): void {
    window.localStorage.removeItem(this.USER);
    window.localStorage.removeItem(this.TOKEN);
  }


}
