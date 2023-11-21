import { Component, OnInit } from '@angular/core';
import { Pastrie } from './interfaces/pastrie';
import { MOCK_PASTRIES } from './mocks/pastries';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'app-yams';
  pastries: Pastrie[] = MOCK_PASTRIES;

  constructor() { }

  ngOnInit(): void { }

}
