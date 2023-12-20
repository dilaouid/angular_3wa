import { Component, Input } from '@angular/core';
import { Pastrie } from '../../../interfaces/pastrie';
import { PastrieService } from '../../../services/pastrie.service';

@Component({
  selector: 'app-pastrie-details',
  templateUrl: './pastrie-details.component.html',
  styleUrl: './pastrie-details.component.scss'
})
export class PastrieDetailsComponent {
  @Input() pastrie: Pastrie | undefined;
  @Input() count: number = 0
  @Input() ingredients: string[] = [];
  maxLike: number = 3;

  constructor(private pastrieService: PastrieService) { }

  ngOnChanges() { }

  preference(id: string) {
    this.pastrieService.like(id).subscribe(
      (result: any) => {
        this.pastrie = result.data
      }
    )
  }

}
