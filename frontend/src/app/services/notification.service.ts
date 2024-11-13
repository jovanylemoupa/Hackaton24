import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface AppNotification {
  message: string;
  type: 'success' | 'error' | 'waiting'; // Ajout du type 'waiting'
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new Subject<AppNotification>();
  notification$ = this.notificationSubject.asObservable();

  show(message: string, type: 'success' | 'error' | 'waiting') { // Ajout de 'waiting'
    this.notificationSubject.next({ message, type });
  }
}
