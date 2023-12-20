import { Injectable } from '@angular/core';
import { Pastrie } from '../interfaces/pastrie';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

const PASTRY_API_URL = 'http://localhost:8000/api/pastries';
const INGREDIENTS_API_URL = 'http://localhost:8000/api/ingredients';

@Injectable({
  providedIn: 'root'
})
export class PastrieService {
  private pastrieUpdated = new BehaviorSubject<Pastrie | null>(null);
  pastrieUpdated$ = this.pastrieUpdated.asObservable();

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

  search(keyword: string) {
    const key = keyword.toLowerCase();
    return this.http.get<Pastrie[]>(`${PASTRY_API_URL}/search/${key}`);
  }

  like(pastrieId: string) {
    return this.http.put(`${PASTRY_API_URL}/${pastrieId}`, {}).pipe(
      tap((result: any) => {
        this.pastrieUpdated.next(result.data as Pastrie);
      })
    )
  }


}
