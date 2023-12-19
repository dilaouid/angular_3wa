import { Component, OnInit } from '@angular/core';
import { Pastrie } from '../../../interfaces/pastrie';
import { PastrieService } from '../../../services/pastrie.service';
import { PastriePreferenceService } from '../../../services/pastrie-preference.service';

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
    private pastrieService: PastrieService,
    private preferenceService: PastriePreferenceService
    ) { }

  ngOnInit(): void {
    this.loadPage(this.currentPage);
    this.preferenceService.preferenceChanged$.subscribe(pastrieId => {
      if (pastrieId) {
        this.changeParentPreference(pastrieId)
      }
    })
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

  changeParentPreference(pastrieId: string) {
    this.pastrieService.getPastrieById(pastrieId).subscribe((pastry) => {
      if (pastry) {
        pastry.choice = !pastry.choice;
        if (this.count < 3 && !pastry.choice) {
          this.count++;
        } else if (this.count > 0 && pastry.choice) {
          this.count--;
        }
      }
    });
  }


}
