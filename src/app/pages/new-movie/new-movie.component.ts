import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../movie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-new-movie',
	templateUrl: './new-movie.component.html',
	styleUrls: [ './new-movie.component.scss' ]
})
export class NewMovieComponent implements OnInit {
	genreId: string;
	constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router) {}

	ngOnInit() {
		this.route.params.subscribe((params: any) => {
			this.genreId = params['genreId'];
		});
	}

	createMovie(title: string) {
		this.movieService.createMovie(title, this.genreId).subscribe((res: any) => {
			this.router.navigate([ '../' ], { relativeTo: this.route });
		});
	}
}
