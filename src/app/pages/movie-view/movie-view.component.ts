import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../movie.service';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
	selector: 'app-movie-view',
	templateUrl: './movie-view.component.html',
	styleUrls: [ './movie-view.component.scss' ]
})
export class MovieViewComponent implements OnInit {
	genres: any;
	constructor(private movieService: MovieService, private route: ActivatedRoute) {}

	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
			console.log(params);
		});

		this.movieService.getGenres().subscribe((genres: any) => {
			this.genres = JSON.parse(genres._body);
		});
	}
}
