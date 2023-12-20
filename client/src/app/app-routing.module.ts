import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/homepage/home/home.component';
import { PastrieComponent } from './pages/pastrie/pastrie.component';
import { LoginComponent } from './pages/login/login.component';
import { isLoggedIn } from './guards/auth.guard';

const routes: Routes = [
  // Url redirige vers localhost:4200
  { path: '', redirectTo: '/pastries', pathMatch: 'full' },
  { path: 'pastries', component: HomeComponent },

  { path: 'login', component: LoginComponent },

  // Url redirige vers localhost:4200/pastrie/(id)
  // pathMatch: full indique que on attends à ce que l'url soit EXACTEMENT comme le path (pas en prefixe)
  { path: 'pastrie/:id',
    component: PastrieComponent,
    pathMatch: 'full',
    canActivate: [isLoggedIn]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
