import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public pokemons: any[] = [];
  offset = 0;
  @ViewChild(IonInfiniteScroll) infinite! : IonInfiniteScroll;

  constructor(
    private httpService: HttpService
  ) {}


  ngOnInit(): void {
    this.getPokemons()
  }

  getPokemons(loadMore = false, event?:any){

    if(loadMore){
      this.offset += 25;
    }

    this.httpService.getPokemons(this.offset).subscribe((data: any) =>
    {
      this.pokemons = [...this.pokemons, ...data]

      if(event){
        event.target.complete();
      }

      if(this.offset == 125){
        this.infinite.disabled = true;
      }


    })
  }
}
