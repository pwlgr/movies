import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../movie.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { Genre } from '../../models/genre.model';

@Component({
	selector: 'app-movie-view',
	templateUrl: './movie-view.component.html',
	styleUrls: [ './movie-view.component.scss' ]
})
export class MovieViewComponent implements OnInit {
	genres: Genre[];
	movies: Movie[];
	constructor(private movieService: MovieService, private route: ActivatedRoute) {}

	ngOnInit() {
		this.route.params.subscribe((params: any) => {
			if (params.genreId) {
				this.movieService.getMovies(params.genreId).subscribe((movies: any) => {
					this.movies = JSON.parse(movies._body);
				});
			} else {
				this.movies = undefined;
			}
		});

		this.movieService.getGenres().subscribe((genres: any) => {
			this.genres = JSON.parse(genres._body);
		});
	}

	onMovieClick(movie: Movie) {
		this.movieService.watch(movie).subscribe(() => {
			movie.watched = !movie.watched;
		});
	}
}
