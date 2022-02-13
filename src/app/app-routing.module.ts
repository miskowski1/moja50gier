import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoteComponent } from './vote/vote.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/vote',
    pathMatch: 'full'
  },
  {
    path: 'vote',
    component: VoteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
