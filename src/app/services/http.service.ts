import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


interface RespostaPokemon {
  results: any[]; // Substitua 'any' pelo tipo real do array 'results'
}


@Injectable({
  providedIn: 'root'
})


export class HttpService {

  baseUrl =  "https://pokeapi.co/api/v2"
  imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"

  constructor(
    private http: HttpClient
  ) { }



  getPokemons(offset = 0){
    return this.http.get<RespostaPokemon>(`${this.baseUrl}/pokemon?offset=${offset}&limit=25`).pipe(
      map(result => {
        return result.results;
      }),
      map(pokemons => {
        return pokemons.map((poke, index) => {
          poke.image = this.getPokeImage(index + offset + 1);
          poke.pokeIndex = offset + index + 1;
          return poke;
        })
      })
    );
  }

  getPokeImage(index: number){
    return `${this.imageUrl}${index}.png`
  }

  getPokeDetails(index: any){
    return this.http.get<any>(`${this.baseUrl}/pokemon/${index}`).pipe(
      map(poke => {
        let sprites = Object.keys(poke['sprites']);
        poke['images'] = sprites
          .map(spiteKey => poke['sprites'][spiteKey])
          .filter(img => img);
          return poke
      })
    )
  }

}
