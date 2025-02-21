import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopNotificationService {
  private messageSubject = new BehaviorSubject<{
    message: string;
    actionName: string;
    actionUrl: string;
  }>({
    message: '',
    actionName: '',
    actionUrl: '',
  });

  getMessage(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  setMessage(message: string): void {
    this.messageSubject.next({
      message: message,
      actionName: 'Ok',
      actionUrl: '',
    });
  }

  setMessageWithActionUrl(
    message: string,
    actionName: string,
    actionUrl: string
  ): void {
    this.messageSubject.next({
      message: message,
      actionName: actionName,
      actionUrl: actionUrl,
    });
  }

  resetMessage(): void {
    this.messageSubject.next({
      message: '',
      actionName: '',
      actionUrl: '',
    });
  }
}
