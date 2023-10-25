import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FavoritesService } from '../services/favorites.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  details: any;
  slideOpts = {

  }






  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private favorite: FavoritesService
  ) { }

  isStar :any;

  ngOnInit() {
    let index = this.route.snapshot.paramMap.get('index');
    this.httpService.getPokeDetails(index).subscribe(details => {
      console.log('Details', details)
      this.details = details;

      this.searchItem(details.id);
    })


  }

  changeStar(){

    if(this.isStar){
      this.favorite.removeItem(this.details.id);
    console.log(this.favorite.getArray())

    }else{
      this.favorite.addToArray(this.details.id);
     console.log(this.favorite.getArray())

    }

    this.isStar = !this.isStar;
  }

  searchItem(value : any) {
    console.log("func", value)
    let c = this.favorite.getArray().includes(value);
    this.isStar = c;
  }

}
