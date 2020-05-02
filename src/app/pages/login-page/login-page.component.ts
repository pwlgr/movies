import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: [ './login-page.component.scss' ]
})
export class LoginPageComponent implements OnInit {
	constructor(private authService: AuthService) {}

	ngOnInit() {}

	onLoginButtonClicked(email: string, password: string) {
		this.authService.login(email, password).subscribe((res: any) => {
			console.log('this is res', res);
		});
	}
}
