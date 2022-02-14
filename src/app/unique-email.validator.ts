import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';

@Injectable({ providedIn: 'root' })
export class UniqueEmailValidator implements AsyncValidator {
  constructor(private firebaseService: FirebaseService) {
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.validateEmail(control).pipe(
      map(isEmailUnique => isEmailUnique ? null : { emailUnique: true })
    )
  }

  private validateEmail(control: AbstractControl): Observable<boolean> {
    return this.firebaseService.isEmailUnique(control.value);
  }
}
