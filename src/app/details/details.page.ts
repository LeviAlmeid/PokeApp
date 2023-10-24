import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private httpService: HttpService
  ) { }

  ngOnInit() {
    let index = this.route.snapshot.paramMap.get('index');
    this.httpService.getPokeDetails(index).subscribe(details => {
      console.log('Details', details)
      this.details = details;
    })
  }

}
