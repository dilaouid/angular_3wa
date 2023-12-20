import { Component, OnInit } from '@angular/core';
import { Pastrie } from '../../../interfaces/pastrie';
import { PastrieService } from '../../../services/pastrie.service';

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

  constructor(
    private pastrieService: PastrieService
    ) { }

  ngOnInit(): void {
    this.loadPage(this.currentPage);
    this.pastrieService.pastrieUpdated$.subscribe((updatedPastrie) => {
      if (updatedPastrie) {
        this.updatePastrieInList(updatedPastrie);
      }
    });
  }

  updatePastrieInList(updatedPastrie: any) {
    const index = this.pastries.findIndex(
      (pastrie) => pastrie.pastryId === updatedPastrie.pastryId
    );
  
    if (index !== 1) {
      this.pastries[index] = updatedPastrie;
    }
  }

  updatePastriesOnSearch(pastries: Pastrie[]) {
    this.pastries = pastries;
  }

  loadPage(page: number) {
    const start = (page - 1) * this.itemsPerPage;
    this.pastrieService.paginate(start, 3).subscribe((pastries) => {
      this.pastries = pastries;
    });
    this.currentPage = page;
  }

  onSelect(pastrie: Pastrie) {
    this.selectedPastry = pastrie;

    this.pastrieService.getPastrieIngredients(pastrie.pastryId).subscribe((ingredients) => {
      this.pastryIngredients = ingredients.list;
    });
  }
}
