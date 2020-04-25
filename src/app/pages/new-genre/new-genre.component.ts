import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../movie.service';

@Component({
	selector: 'app-new-genre',
	templateUrl: './new-genre.component.html',
	styleUrls: [ './new-genre.component.scss' ],
	providers: [ MovieService ]
})
export class NewGenreComponent implements OnInit {
	constructor(private movieService: MovieService) {}

	ngOnInit() {}
	createNewGenre(title: string) {
		this.movieService.createGenre(title).subscribe((res: any) => {});
	}
}
