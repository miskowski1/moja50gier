import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { SummaryComponent } from './summary/summary.component';
import { VoteComponent } from './vote/vote.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo([ 'login' ]);
const redirectLoggedInToAdmin = () => redirectLoggedInTo([ 'admin' ]);

const routes: Routes = [
  {
    path: '',
    redirectTo: '/vote',
    pathMatch: 'full'
  },
  {
    path: 'vote',
    component: VoteComponent
  },
  {
    path: 'summary',
    component: SummaryComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectLoggedInToAdmin)
  },
  {
    path: 'admin',
    component: AdminComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
