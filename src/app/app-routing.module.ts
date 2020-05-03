import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieViewComponent } from './pages/movie-view/movie-view.component';
import { NewGenreComponent } from './pages/new-genre/new-genre.component';
import { NewMovieComponent } from './pages/new-movie/new-movie.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'genres',
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: LoginPageComponent
	},
	{
		path: 'signup',
		component: SignupPageComponent
	},
	{
		path: 'new-genre',
		component: NewGenreComponent
	},
	{
		path: 'genres',
		component: MovieViewComponent
	},
	{
		path: 'genres/:genreId',
		component: MovieViewComponent
	},
	{
		path: 'genres/:genreId/new-movie',
		component: NewMovieComponent
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ],
	providers: []
})
export class AppRoutingModule {}
