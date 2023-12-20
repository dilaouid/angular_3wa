import { Component } from '@angular/core';
import { Pastrie } from '../../../interfaces/pastrie';
import { TitleService } from '../../../services/title.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  pastries: Pastrie[] = [];

  constructor(private titleService: TitleService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Accueil');
  }
}
