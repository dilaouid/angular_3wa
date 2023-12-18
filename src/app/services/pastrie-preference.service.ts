import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PastriePreferenceService {
  private preferenceSource = new BehaviorSubject<string | null>(null)
  public preferenceChanged$ = this.preferenceSource.asObservable();

  constructor() { }

  changePreference(pastrieId: string) {
    this.preferenceSource.next(pastrieId);
  }

}
