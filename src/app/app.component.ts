import { Component, OnInit } from '@angular/core';
import { Pastrie } from './interfaces/pastrie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'app-yams';
  pastries: Pastrie[] = [];

  constructor() { }

  ngOnInit(): void { }

}
