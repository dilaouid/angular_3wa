import { Injectable } from '@angular/core';
import { Pastrie } from '../interfaces/pastrie';

import { HttpClient } from '@angular/common/http';

const PASTRY_API_URL = 'http://localhost:8000/api/pastries';
const INGREDIENTS_API_URL = 'http://localhost:8000/api/ingredients';

@Injectable({
  providedIn: 'root'
})
export class PastrieService {
  private pastries: Pastrie[] = [];

  constructor(private http: HttpClient) { }

  getPastrieById(id: string) {
    return this.http.get<Pastrie>(PASTRY_API_URL + '/' + id);
  }

  getPastrieIngredients(id: string) {
    return this.http.get<any>(`${INGREDIENTS_API_URL}/pastrie/${id}`);
  }

  paginate(start: number, end: number) {
    return this.http.get<Pastrie[]>(`${PASTRY_API_URL}?limit=${end}&start=${start}`);
  }

  search(keyword: string): Pastrie[] {
    const key = keyword.toLowerCase();
    return this.pastries.filter((p) => p.name.toLowerCase().includes(key));
  }


}
