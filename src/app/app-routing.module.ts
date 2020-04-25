import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieViewComponent } from './pages/movie-view/movie-view.component';
import { NewGenreComponent } from './pages/new-genre/new-genre.component';

const routes: Routes = [
	{
		path: '',
		component: MovieViewComponent
	},
	{
		path: 'new-genre',
		component: NewGenreComponent
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ],
	providers: []
})
export class AppRoutingModule {}
