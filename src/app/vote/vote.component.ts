import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  startWith,
  Subject,
  switchMap,
  takeUntil
} from 'rxjs';
import { BggService } from '../bgg.service';
import { FirebaseService } from '../firebase.service';
import { Game } from '../models/game.interface';
import { UniqueEmailValidator } from '../unique-email.validator';
import { PointsPipe } from './points.pipe';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: [ './vote.component.scss' ],
  providers: [ ConfirmationService, PointsPipe ]
})
export class VoteComponent implements OnInit, OnDestroy {

  public selectedGames: Game[] = [];
  public emailControl: FormControl = new FormControl('', {
    asyncValidators: [ this.uniqueEmailValidator.validate.bind(this.uniqueEmailValidator) ],
    validators: [ Validators.required, Validators.email ],
    updateOn: 'blur',
  });
  public searchControl: FormControl = new FormControl('');

  public searchTitles$: Observable<Partial<Game>[]> = new Observable<Partial<Game>[]>();

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private bggService: BggService, private confirmationService: ConfirmationService, private firebaseService: FirebaseService, private points: PointsPipe, private router: Router, private uniqueEmailValidator: UniqueEmailValidator) {
  }

  ngOnInit(): void {
    this.searchTitles$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
      filter(query => !!query),
      switchMap(query => this.bggService.search(query) as Observable<Game[]>)
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public addGame(gameData: Partial<Game>) {
    if (this.selectedGames.find(_game => _game.id === gameData.id)) {
      this.searchControl.setValue('');
      return;
    }

    this.bggService.getDetails(gameData.id as string).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(gameDetails => {
      this.selectedGames = [ ...this.selectedGames, { ...gameData, ...gameDetails } as Game ];
      this.searchControl.setValue('');
    });
  }

  public removeGame(index: number) {
    this.selectedGames.splice(index, 1);
  }

  public async submitVote() {
    if (this.emailControl.invalid) {
      this.emailControl.markAsDirty();
      return;
    }

    if (this.selectedGames.length < 5) {
      this.confirmationService.confirm({
        message: 'Wybrałeś mniej niż 5 gier. Czy jesteś pewien, że chcesz oddać głos?',
        header: 'Możesz dodać kolejne gry',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Tak',
        rejectLabel: 'Nie',
        accept: () => {
          this.createEntities();
        }
      })
    } else {
      this.createEntities();
    }
  }

  private createEntities(): void {
    this.firebaseService.createUser({
      email: this.emailControl.value
    }).pipe(
      switchMap(user => combineLatest(
        this.selectedGames.slice(0, 5).reduce((acc: Observable<Game>[], game, index) => [ ...acc, this.firebaseService.createGame(game, +this.points.transform(index)) ], [])
      ).pipe(
        switchMap(_ => this.firebaseService.createVote({
          userEmail: user.email,
          games: this.selectedGames.slice(0, 5).reduce((acc: any[], game, index) => [ ...acc, {
            gameId: game.id,
            points: +this.points.transform(index)
          } ], [])
        }))
      )),
      takeUntil(this.unsubscribe$)
    ).subscribe(_ => {
      this.router.navigateByUrl('/summary');
    });
  }

}
