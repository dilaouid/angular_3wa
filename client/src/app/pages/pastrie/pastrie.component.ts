import { Component, OnInit } from '@angular/core';

// ActivatedRoute : fournit informations sur la route active
import { ActivatedRoute } from '@angular/router';
import { Pastrie } from '../../interfaces/pastrie';
import { PastrieService } from '../../services/pastrie.service';

@Component({
  selector: 'app-pastrie',
  templateUrl: './pastrie.component.html',
  styleUrl: './pastrie.component.scss'
})
export class PastrieComponent implements OnInit {
  pastrie: Pastrie | undefined;

  constructor(
    private route: ActivatedRoute,
    private pastrieService: PastrieService
  ) { }

  ngOnInit(): void {
    // pour récupérer l'id de la route active, on utilise le service ActivatedRoute, et la propriété snapshot
    // (snapshot : instantané de la route active)
    // paramMap : map des paramètres de la route active
    // get : récupère la valeur de l'id dans la map des paramètres
    const id = this.route.snapshot.paramMap.get('id') ?? '0';

    // même chose pour les query string, mais avec queryParamMap au lieu de paramMap
    const qs = this.route.snapshot.queryParamMap.get('maquerystring');
    // this.pastrie = this.pastrieService.getPastrieById(id);
  }
}
