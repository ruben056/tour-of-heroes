import { Component, OnInit } from '@angular/core';
import { Hero } from '../model/hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes : Hero[];

  constructor(private heroService : HeroService) { }

  ngOnInit() {
    this.heroService.getHeroes().subscribe(
      (heroes)=> this.heroes = heroes);
  }

  deleteHero(hero:Hero):void{
    this.heroes = this.heroes.filter(h => h.id !== hero.id);
    this.heroService.deleteHero(hero).subscribe();;
  }

  addHero(heroName: string) : void{
    heroName = heroName.trim();
    if(!heroName){
      return;
    }
    this.heroService.add({
      name:heroName
    } as Hero).subscribe(
      (newHero)=> this.heroes.push(newHero));
  }

}
