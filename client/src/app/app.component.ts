import { Component, OnInit } from '@angular/core';
import { TitleService } from './services/title.service'; 
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = '';
  isAuthentified: boolean = false;

  constructor(
    private titleService: TitleService,
    private authService: AuthService
  ) {
    this.titleService.title.subscribe((title) => {
      this.title = title;
    })
  }

  ngOnInit(): void {
    this.authService.checkAuthStatus().subscribe({
      next: (result) => { this.isAuthentified = true },
      error: (err) => { this.isAuthentified = false },
    })
  }

}
