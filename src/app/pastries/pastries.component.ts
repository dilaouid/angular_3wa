import { Component, Input, OnInit } from '@angular/core';
import { Pastrie } from '../pastrie';
import { MOCK_PASTRIES } from '../mock-pastries';

@Component({
  selector: 'app-pastries',
  templateUrl: './pastries.component.html',
  styleUrl: './pastries.component.scss'
})
export class PastriesComponent implements OnInit {

  pastries: Pastrie[] = MOCK_PASTRIES;
  titlePage: string = 'Page principale : liste des pâtisseries à gagner';

  constructor() { }

  ngOnInit(): void { }

}
