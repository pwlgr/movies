import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../movie.service';

@Component({
	selector: 'app-movie-view',
	templateUrl: './movie-view.component.html',
	styleUrls: [ './movie-view.component.scss' ],
	providers: [ MovieService ]
})
export class MovieViewComponent implements OnInit {
	constructor(private movieService: MovieService) {}

	ngOnInit() {}

	createNewGenre(title: string) {
		this.movieService.createGenre('test').subscribe((res: any) => {
			console.log(res);
		});
	}
}
