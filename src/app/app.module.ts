import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MovieViewComponent } from './pages/movie-view/movie-view.component';
import { MovieService } from './movie.service';
import { WebRequestService } from './web-request.service';
import { NewGenreComponent } from './pages/new-genre/new-genre.component';
import { NewMovieComponent } from './pages/new-movie/new-movie.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

@NgModule({
	declarations: [ AppComponent, MovieViewComponent, NewGenreComponent, NewMovieComponent, LoginPageComponent ],
	imports: [ BrowserModule, AppRoutingModule, HttpModule ],
	providers: [ MovieService, WebRequestService ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
