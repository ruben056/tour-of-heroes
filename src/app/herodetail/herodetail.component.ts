import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../model/hero';
import { HeroService }  from '../services/hero.service';

@Component({
  selector: 'app-herodetail',
  templateUrl: './herodetail.component.html',
  styleUrls: ['./herodetail.component.css']
})
export class HerodetailComponent implements OnInit {

  @Input()hero: Hero;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private heroService: HeroService
            ) {
  }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe(
      (hero)=> this.hero = hero);
  }

  save(): void {
     this.heroService.updateHero(this.hero)
       .subscribe(() => this.goBack());
  }

  goBack() : void{
    this.location.back();
  }

}
