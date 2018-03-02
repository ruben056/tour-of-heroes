import { Injectable } from '@angular/core';
import { HEROES } from '../model/mock-heroes';
import { Hero } from '../model/hero';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { MessageService } from './message.service';

@Injectable()
export class HeroService {

  constructor(private msgService: MessageService) { }

  getHeroes(): Observable<Hero[]>{
    // todo send msg after returning the heroes...
    this.msgService.add("heroService : fetched heroes");
    return of(HEROES);
  }

  getHero(id : number): Observable<Hero>{
    // todo send msg after returning the heroe...
    this.msgService.add(`heroService : fetched hero with id ${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

}
