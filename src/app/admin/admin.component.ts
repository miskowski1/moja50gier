import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { AuthService } from '../auth.service';
import { FirebaseService } from '../firebase.service';
import { Game } from '../models/game.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: [ './admin.component.scss' ]
})
export class AdminComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService, private firebaseService: FirebaseService, private router: Router) {
  }

  public games$!: Observable<Game[]>;
  public votesAmount$!: Observable<number>;

  private unsubscribe$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.games$ = this.firebaseService.getGames().pipe(
      map(games => games.sort((g1, g2) => g2.points - g1.points))
    );
    this.votesAmount$ = this.firebaseService.getVotes().pipe(
      map(votes => votes.length)
    )
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public logout() {
    this.authService.logout().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(_ => {
      this.router.navigateByUrl('/login');
    });
  }

}
