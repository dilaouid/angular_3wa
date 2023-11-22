import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PastrieService } from '../pastrie.service';
import { Pastrie } from '../interfaces/pastrie';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Output() searchEmitter = new EventEmitter<Pastrie[]>();
  word: string = '';

  constructor(private pastriesService: PastrieService) { }

  onSubmit(form: NgForm) {
    const word = form.value['word'];
    const results = this.pastriesService.search(word);
    this.searchEmitter.emit(results);
  }

  onSearchChange():void {
    const results = this.pastriesService.search(this.word);
    this.searchEmitter.emit(results);
  }

}