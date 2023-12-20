import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PastriesComponent } from './pages/homepage/pastries/pastries.component';
import { PastrieDetailsComponent } from './pages/homepage/pastrie-details/pastrie-details.component';
import { BorderCardDirective } from './directives/border-card.directive';
import { PastrieTagColorPipe } from './pipes/pastrie-tag-color.pipe';
import { SearchComponent } from './pages/homepage/search/search.component';
import { HomeComponent } from './pages/homepage/home/home.component';
import { PastrieComponent } from './pages/pastrie/pastrie.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    PastriesComponent,
    PastrieDetailsComponent,
    BorderCardDirective,
    PastrieTagColorPipe,
    SearchComponent,
    HomeComponent,
    PastrieComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
