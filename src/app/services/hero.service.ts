import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Hero } from '../model/hero';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

@Injectable()
export class HeroService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(private msgService: MessageService,
              private httpClient: HttpClient) { }

  getHeroes(): Observable<Hero[]>{
    // todo send msg after returning the heroes...
    return this.httpClient.get<Hero[]>(this.heroesUrl)
          .pipe(
            tap(heroes=>this.logMsg("heroService : fetched heroes")),
            catchError(this.handleError('getHeroes', []))
          );
  }

updateHero (hero: Hero): Observable<any> {

  return this.httpClient.put(this.heroesUrl, hero, this.httpOptions).pipe(
    tap(_ => this.logMsg(`updated hero id=${hero.id}`)),
    catchError(this.handleError<any>('updateHero'))
  );
}

  getHero(id : number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;
    return this.httpClient.get<Hero>(url)
      .pipe(
        tap(_ => this.logMsg(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  add(newHero : Hero) : Observable<Hero>{
    return this.httpClient.post(this.heroesUrl, newHero, this.httpOptions).pipe(
      tap(_ => this.logMsg(`saved new hero id=${newHero.id}`)),
      catchError(this.handleError<Hero>(`add Hero`))
    );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.httpClient.delete(url, this.httpOptions).pipe(
      tap(_ => this.logMsg(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>(`deleted Hero`))
    );
  }

  searchHeroes(term : string): Observable<Hero[]>{
    if(!term || !term.trim()){
      return of([]);
    }
    return this.httpClient.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.logMsg(`searching heroes for term : ${term}`)),
      catchError(this.handleError<Hero[]>(`searchHeroes`))
    );
  }

  private logMsg(msg: string) : void{
    this.msgService.add(msg);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.logMsg(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
