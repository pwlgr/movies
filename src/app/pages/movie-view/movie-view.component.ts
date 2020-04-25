import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../movie.service';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
	selector: 'app-movie-view',
	templateUrl: './movie-view.component.html',
	styleUrls: [ './movie-view.component.scss' ]
})
export class MovieViewComponent implements OnInit {
	genres: any[];
	movies: any[];
	constructor(private movieService: MovieService, private route: ActivatedRoute) {}

	ngOnInit() {
		this.route.params.subscribe((params: any) => {
			console.log(params);
			this.movieService.getMovies(params.genreId).subscribe((movies: any) => {
				this.movies = JSON.parse(movies._body);
				console.log(this.movies);
			});
		});

		this.movieService.getGenres().subscribe((genres: any) => {
			this.genres = JSON.parse(genres._body);
		});
	}
}
