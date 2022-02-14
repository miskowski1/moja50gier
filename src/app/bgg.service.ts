import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Game } from './models/game.interface';

@Injectable({
  providedIn: 'root'
})
export class BggService {

  private static readonly bggUrl: string = 'https://boardgamegeek.com/xmlapi2';

  constructor(private http: HttpClient) {
  }

  public search(query: string): Observable<Partial<Game>[]> {
    return this.http.get<any>(`${ BggService.bggUrl }/search?type=boardgame&query=${ query }`, {
      responseType: 'text' as 'json'
    }).pipe(
      map(response => {
        const games = [];
        const document = this.parseXML(response);
        const items = document.getElementsByTagName('item');
        for (let i = 0; i < items.length; i++) {
          if (!!items[i]) {
            const item = items[i];
            games.push({
              id: item.id,
              name: item.getElementsByTagName('name')?.[0].getAttribute('value') || '',
              yearPublished: item.getElementsByTagName('yearpublished')?.[0]?.getAttribute('value') || ''
            })
          }
        }
        return games;
      }),
      catchError(_ => of([]))
    )
  }

  public getDetails(gameId: string): Observable<Partial<Game>> {
    return this.http.get<any>(`${ BggService.bggUrl }/thing?id=${ gameId }`, {
      responseType: 'text' as 'json'
    }).pipe(
      map(response => {
        const document = this.parseXML(response);
        return {
          image: document.getElementsByTagName('image')[0].innerHTML,
          thumbnail: document.getElementsByTagName('thumbnail')[0].innerHTML
        };
      }),
      catchError(_ => of({ image: '', thumbnail: '' }))
    );
  }

  private parseXML(xml: string): Document {
    const parser = new DOMParser();
    return parser.parseFromString(xml, 'text/xml');
  }
}
