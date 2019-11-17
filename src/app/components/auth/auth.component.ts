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

	constructor(private authService: AuthService) {}

	ngOnInit() {}

	onSwitchMode() {
		this.isLoginMode = !this.isLoginMode;
	}

	onSubmit(form: NgForm) {
		let email = form.value;
		let password = form.value;

		if (this.isLoginMode) {
		} else {
			this.authService
				.signUp(email, password)
				.subscribe((response) => {
					console.log(response);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}
}
