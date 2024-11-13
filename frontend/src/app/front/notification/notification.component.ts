import { Component, OnInit } from '@angular/core';
import { NotificationService, AppNotification } from '../../services/notification.service'; // Update path as needed

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  notifications: AppNotification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    // Subscribe to the notification service
    this.notificationService.notification$.subscribe((notification) => {
      console.log('Notification received:', notification); // Debugging line
      this.notifications.push(notification);
      
      // Set a timeout to remove the notification
      setTimeout(() => {
        console.log('Removing notification:', notification); // Debugging line
        this.removeNotification(notification);
      }, 3000); // Auto-remove after 3 seconds
    });
  }

  removeNotification(notification: AppNotification) {
    console.log('Before removal, notifications:', this.notifications); // Debugging line
    this.notifications = this.notifications.filter(n => n !== notification);
    console.log('After removal, notifications:', this.notifications); // Debugging line
  }
}
