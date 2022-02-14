import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { catchError, from, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) {
  }

  public login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      catchError(e => {
        return of(null);
      })
    );
  }

  public logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  public getUser(): any {
    return this.auth.currentUser;
  }
}
