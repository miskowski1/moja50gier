import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService, private router: Router) {
  }

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  private unsubscribe$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public login(): void {
    const { email, password } = this.loginForm.getRawValue();

    this.authService.login(email, password).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(user => {
      if (!!user) {
        this.router.navigateByUrl('/admin');
      }
    });
  }

}
