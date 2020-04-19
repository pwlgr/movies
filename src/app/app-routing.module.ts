import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieViewComponent } from './pages/movie-view/movie-view.component';

const routes: Routes = [
	{
		path: '',
		component: MovieViewComponent
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ],
	providers: []
})
export class AppRoutingModule {}
