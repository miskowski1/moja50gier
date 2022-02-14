import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { first, from, map, Observable, switchMap } from 'rxjs';
import { Game } from './models/game.interface';
import { User } from './models/user.interface';
import { Vote } from './models/vote.interface';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore) {
  }

  public createUser(user: User): Observable<User> {
    return from(setDoc(doc(this.firestore, `users/${ user.email }`), user)).pipe(
      map(_ => user)
    );
  }

  public createGame(game: Game, points: number): Observable<Game> {
    const _doc = doc(this.firestore, `games/${ game.id }`);
    return docData(_doc, { idField: 'id' }).pipe(
      first(),
      map(_game => ({
        ...game,
        votes: (_game?.['votes'] || 0) + 1,
        points: (_game?.['points'] || 0) + points
      })),
      switchMap(_game => from(setDoc(_doc, _game)).pipe(
        first(),
        map(_ => {
          return _game;
        })
      ))
    );
  }

  public createVote(vote: Vote): Observable<Vote> {
    return from(addDoc(collection(this.firestore, 'votes'), vote)).pipe(
      map(_ => vote)
    )
  }

  public isEmailUnique(email: string): Observable<boolean> {
    return collectionData(collection(this.firestore, 'users')).pipe(
      first(),
      map(users => users.findIndex(_user => _user['email'] == email) < 0)
    )
  }

  public getGames(): Observable<Game[]> {
    return collectionData(collection(this.firestore, 'games')).pipe(
      map(games => games as Game[])
    )
  }

  public getVotes(): Observable<Vote[]> {
    return collectionData(collection(this.firestore, 'votes')).pipe(
      map(votes => votes as Vote[])
    )
  }
}
