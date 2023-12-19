import { Injectable } from '@angular/core';
import { MOCK_PASTRIES } from '../mocks/pastries';
import { Pastrie } from '../interfaces/pastrie';
import { List } from '../interfaces/list';
import { INGREDIENTS_LISTS } from '../mocks/ingredients';

@Injectable({
  providedIn: 'root'
})
export class PastrieService {
  private pastries: Pastrie[] = MOCK_PASTRIES;
  private ingredients: List[] = INGREDIENTS_LISTS;

  constructor() { }

  getPastries() {
    return this.pastries;
  }

  getPastrieById(id: string) {
    return this.pastries.find((p) => p.id == id);
  }

  count(): number {
    return this.pastries.length;
  }

  getPastrieIngredients(id: string): string[] {
    let ingredients = this.ingredients.find((i) => i.id == id);
    return ingredients ? ingredients.list : [];
  }

  paginate(start: number, end: number): Pastrie[] {
    return this.pastries.slice(start, end);
  }

  search(keyword: string): Pastrie[] {
    const key = keyword.toLowerCase();
    return this.pastries.filter((p) => p.name.toLowerCase().includes(key));
  }


}
