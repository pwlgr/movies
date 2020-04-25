import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieViewComponent } from './pages/movie-view/movie-view.component';
import { NewGenreComponent } from './pages/new-genre/new-genre.component';
import { NewMovieComponent } from './pages/new-movie/new-movie.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'genres',
		pathMatch: 'full'
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
