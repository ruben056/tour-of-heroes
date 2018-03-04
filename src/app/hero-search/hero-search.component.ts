import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../model/hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes$ : Observable<Hero[]>;
  private searchTerm = new Subject<string>();

  constructor(private heroService:HeroService) { }

  search(term: string) :void{
    this.searchTerm.next(term);
  }

  ngOnInit() {
    this.heroes$ = this.searchTerm.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term : string) => this.heroService.searchHeroes(term))
    );
  }

}
