import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pastrie } from '../interfaces/pastrie';
import { MAX } from '../mocks/pastries';

@Component({
  selector: 'app-pastrie-details',
  templateUrl: './pastrie-details.component.html',
  styleUrl: './pastrie-details.component.scss'
})
export class PastrieDetailsComponent {
  @Input() pastrie: Pastrie | undefined;
  @Input() count: number = 0
  @Input() ingredients: string[] = [];
  @Output() changePreference = new EventEmitter<string>();
  maxLike: number = MAX;

  constructor() { }

  ngOnChanges() { }

  preference(id: string) {
    this.changePreference.emit(id);
  }

}
