import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
	constructor(private webService: WebRequestService, private router: Router) {}

	login(email: string, password: string) {
		return this.webService.login(email, password).pipe(
			shareReplay(),
			tap((res: any) => {
				const body = JSON.parse(res._body);
				this.setSession(body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
			})
		);
	}

	private setSession(userId: string, accessToken: string, refreshToken: string) {
		localStorage.setItem('user-id', userId);
		localStorage.setItem('x-access-token', accessToken);
		localStorage.setItem('x-refresh-token', refreshToken);
	}

	private removeSession() {
		localStorage.removeItem('user-id');
		localStorage.removeItem('x-access-token');
		localStorage.removeItem('x-refresh-token');
	}
	logout() {
		this.removeSession();
	}

	signup(email: string, password: string) {
		return this.webService.signup(email, password).pipe(
			shareReplay(),
			tap((res: any) => {
				const body = JSON.parse(res._body);
				this.setSession(body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
			})
		);
	}
}
