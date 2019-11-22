import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: [ './auth.component.css' ]
})
export class AuthComponent implements OnInit {
	isLoginMode = true;
	Loading = false;
	error = '';

	constructor(private authService: AuthService) {}

	ngOnInit() {}

	onSwitchMode() {
		this.isLoginMode = !this.isLoginMode;
	}

	onSubmit(form: NgForm) {
		let email = form.value.email;
		let password = form.value.password;

		this.Loading = true;
		if (this.isLoginMode) {
			this.authService.Login(email, password).subscribe(
				(response) => {
					this.Loading = false;
					console.log(response);
				},
				(errorMessage) => {
					this.error = errorMessage;
					this.Loading = false;
				}
			);
		} else {
			this.authService.signUp(email, password).subscribe(
				(response) => {
					this.Loading = false;
					console.log(response);
				},
				(errorMessage) => {
					this.Loading = false;
					this.error = errorMessage;
				}
			);
		}
	}
}
