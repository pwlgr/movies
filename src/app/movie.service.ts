import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable()
export class MovieService {
	constructor(private webReqService: WebRequestService) {}

	createGenre(title: string) {
		return this.webReqService.post('genres', { title });
	}
}
