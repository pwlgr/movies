import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { TMovieViewComponent } from './pages/tmovie-view/tmovie-view.component';
import { MovieViewComponent } from './pages/movie-view/movie-view.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    TMovieViewComponent,
    MovieViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
