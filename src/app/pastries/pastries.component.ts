import { Component, OnInit } from '@angular/core';
import { Pastrie } from '../interfaces/pastrie';
import { MAX } from '../mocks/pastries';
import { PastrieService } from '../pastrie.service';

@Component({
  selector: 'app-pastries',
  templateUrl: './pastries.component.html',
  styleUrl: './pastries.component.scss'
})
export class PastriesComponent implements OnInit {

  pastries: Pastrie[] = [];
  selectedPastry: Pastrie | undefined;
  likedPastries: Pastrie[] | undefined;
  pastryIngredients: string[] = [];
  count: number = 0;
  today = Date.now();

  currentPage: number = 1;
  itemsPerPage: number = 3;

  titlePage: string = 'Page principale : liste des pâtisseries à gagner';

  constructor(private pastrieService: PastrieService) { }

  ngOnInit(): void {
    this.loadPage(this.currentPage);
  }

  updatePastriesOnSearch(pastries: Pastrie[]) {
    this.pastries = pastries;
  }

  loadPage(page: number) {
    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pastries = this.pastrieService.paginate(start, end);
    this.currentPage = page;
  }

  onSelect(pastrie: Pastrie) {
    this.selectedPastry = pastrie;
    this.pastryIngredients = this.pastrieService.getPastrieIngredients(pastrie.id);
  }

  changeParentPreference(pastrieId: string) {
    const pastry: Pastrie | undefined = this.pastrieService.getPastrieById(pastrieId);
    
    if (pastry) {
      pastry.choice = !pastry.choice;
      if (this.count < MAX && !pastry.choice) {
        this.count++;
      } else if (this.count > 0 && pastry.choice) {
        this.count--;
      }
    }
    
  }


}
