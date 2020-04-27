import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable()
export class MovieService {
	constructor(private webReqService: WebRequestService) {}

	createGenre(title: string) {
		return this.webReqService.post('genres', { title });
	}

	getGenres() {
		return this.webReqService.get('genres');
	}

	getMovies(genreId: string) {
		return this.webReqService.get(`genres/${genreId}/movies`);
	}

	createMovie(title: string, genreId: string) {
		return this.webReqService.post(`genres/${genreId}/movies`, { title });
	}

	watch(movie) {
		return this.webReqService.patch(`genres/${movie._genreId}/movies/${movie._id}`, { watched: true });
	}
}
