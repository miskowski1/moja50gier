import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable, startWith, Subject, switchMap, takeUntil } from 'rxjs';
import { BggService } from '../bgg.service';
import { Game } from '../models/game.interface';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: [ './vote.component.scss' ]
})
export class VoteComponent implements OnInit, OnDestroy {

  public searchControl: FormControl = new FormControl('');
  public selectedGames: Game[] = [ {
    "id": "312484",
    "name": "Lost Ruins of Arnak",
    "yearPublished": "2020",
    "image": "https://cf.geekdo-images.com/6GqH14TJJhza86BX5HCLEQ__original/img/CXqwimJPonWy1oyXEMgPN_ZVmUI=/0x0/filters:format(jpeg)/pic5674958.jpg",
    "thumbnail": "https://cf.geekdo-images.com/6GqH14TJJhza86BX5HCLEQ__thumb/img/J8SVmGOJXZGxNjkT3xYNQU7Haxg=/fit-in/200x150/filters:strip_icc()/pic5674958.jpg"
  } as Game ];

  public searchTitles$: Observable<Partial<Game>[]> = new Observable<Partial<Game>[]>();

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private bggService: BggService) {
  }

  ngOnInit(): void {
    this.searchTitles$ = this.searchControl.valueChanges.pipe(
      startWith([]),
      debounceTime(500),
      distinctUntilChanged(),
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

}
