import { Component, OnInit } from '@angular/core';
import { Pastrie } from './pastrie';
import { MOCK_PASTRIES } from './mock-pastries';

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
