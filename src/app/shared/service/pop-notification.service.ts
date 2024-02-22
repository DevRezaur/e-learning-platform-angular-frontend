import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopNotificationService {
  private messageSubject = new BehaviorSubject<{
    message: string;
    type: 'success' | 'error';
  }>({ message: '', type: 'success' });

  constructor() {}

  getMessage(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  success(message: string): void {
    this.messageSubject.next({ message, type: 'success' });
  }

  error(message: string): void {
    this.messageSubject.next({ message, type: 'error' });
  }
}
