import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../services/title.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';


  constructor(
    private titleService: TitleService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(2)]),
      password: new FormControl('', [Validators.required, Validators.minLength(2)]),
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle('Connexion');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: (data) => {
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          })
        },
        error: (error) => {
          this.errorMessage = "Les identifiants sont incorrects";
        }
      })
    }
  }

}
