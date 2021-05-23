import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(sessionStorage.getItem('username'));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  updateSubject(data: any) {
    this.currentUserSubject.next(data)
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  logout() {
    sessionStorage.removeItem('username');
    this.currentUserSubject.next(null);
  }
}
