import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { AppPlaceholderDirective } from 'src/app/directives/appplaceholder.directive';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: [ './auth.component.css' ]
})
export class AuthComponent implements OnInit {
	@ViewChild(AppPlaceholderDirective, { static: false })
	alertHost: AppPlaceholderDirective;

	private alertSubscription: Subscription;
	isLoginMode = true;
	Loading = false;
	error = '';

	constructor(
		private authService: AuthService,
		private router: Router,
		private componentFactoryResolver: ComponentFactoryResolver
	) {}

	ngOnInit() {
		this.authService.userSubject.subscribe((user) => {
			if (user) {
				this.router.navigate([ '/recipes' ]);
			}
		});
	}

	ngOnDestroy() {
		if (this.alertSubscription) {
			this.alertSubscription.unsubscribe();
		}
	}

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
					this.router.navigate([ '/recipes' ]);
				},
				(errorMessage) => {
					this.error = errorMessage;
					this.showErrorAlert(errorMessage);
					this.Loading = false;
				}
			);
		} else {
			this.authService.signUp(email, password).subscribe(
				(response) => {
					this.Loading = false;
					this.router.navigate([ '/recipes' ]);
				},
				(errorMessage) => {
					this.Loading = false;
					this.error = errorMessage;
					this.showErrorAlert(errorMessage);
				}
			);
		}
	}

	private showErrorAlert(message: string) {
		const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
		const hostViewContainerRef = this.alertHost.viewContainerRef;
		hostViewContainerRef.clear();
		const alertComponent = hostViewContainerRef.createComponent(alertComponentFactory);
		alertComponent.instance.message = message;
		this.alertSubscription = alertComponent.instance.close.subscribe(() => {
			this.alertSubscription.unsubscribe();
			hostViewContainerRef.clear();
		});
	}
}
