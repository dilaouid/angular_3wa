import { Component } from '@angular/core';
import { Pastrie } from '../../../interfaces/pastrie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'app-yams';
  pastries: Pastrie[] = [];

  constructor() { }

  ngOnInit(): void { }
}
