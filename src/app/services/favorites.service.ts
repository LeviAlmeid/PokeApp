import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favorites: any[] = [];

  constructor() { }

  getArray() {
    return this.favorites;
  }

  addToArray(item: any) {
    this.favorites.push(item);
  }

  removeItem(value: number) {
    this.favorites = this.favorites.filter(item => item !== value);
  }


}
