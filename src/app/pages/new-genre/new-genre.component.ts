import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../movie.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-new-genre',
	templateUrl: './new-genre.component.html',
	styleUrls: [ './new-genre.component.scss' ],
	providers: [ MovieService ]
})
export class NewGenreComponent implements OnInit {
	constructor(private movieService: MovieService, private router: Router) {}

	ngOnInit() {}
	createNewGenre(title: string) {
		this.movieService.createGenre(title).subscribe((res: any) => {
			const { _id } = JSON.parse(res._body);
			this.router.navigate([ 'genres', _id ]);
		});
	}
}
