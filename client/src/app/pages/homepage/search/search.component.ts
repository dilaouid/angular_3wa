import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PastrieService } from '../../../services/pastrie.service';
import { Pastrie } from '../../../interfaces/pastrie';

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
    this.pastriesService.search(word).subscribe(
      (result) => {
        this.searchEmitter.emit(result);
      }
    )
  }

  onSearchChange():void {
    this.pastriesService.search(this.word).subscribe({
      next: (result) => {
        this.searchEmitter.emit(result);
      },
      error: (err) => console.error,
    })
  }

}