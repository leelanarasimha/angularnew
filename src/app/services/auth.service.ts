import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponseData } from '../models/authresponsedata.model';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
	userSubject = new BehaviorSubject<User>(null);
	expirationDateTimer: any;
	constructor(private http: HttpClient, private router: Router) {}

	signUp(email: string, password: string) {
		return this.http
			.post<AuthResponseData>(
				`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
AIzaSyCrsyZ9YaxBGAJ1PGiKantLHsDhd-KL5BM
`,
				{
					email: email,
					password: password,
					returnSecureToken: true
				}
			)
			.pipe(
				catchError(this.handleError),
				tap((res) => {
					this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn);
				})
			);
	}

	Login(email: string, password: string) {
		return this.http
			.post<
				AuthResponseData
			>(
				`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCrsyZ9YaxBGAJ1PGiKantLHsDhd-KL5BM`,
				{
					email: email,
					password: password,
					returnSecureToken: true
				}
			)
			.pipe(
				catchError(this.handleError),
				tap((res) => {
					this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn);
				})
			);
	}

	autoLogin() {
		let loadedUser = localStorage.getItem('userData');

		if (loadedUser) {
			let newUser = JSON.parse(loadedUser);

			if (newUser !== null) {
				let user = new User(newUser.email, newUser.userId, newUser.idToken, new Date(newUser.expirationDate));
				let expirationTime = new Date(newUser.expirationDate).getTime() - new Date().getTime();
				this.autoLogout(expirationTime);
				this.userSubject.next(user);
			}
		}
	}

	autoLogout(expirationTime: number) {
		console.log(expirationTime);
		this.expirationDateTimer = setTimeout(() => {
			this.logout();
		}, expirationTime);
	}

	logout() {
		this.userSubject.next(null);
		this.router.navigate([ '/auth' ]);
		localStorage.removeItem('userData');
		if (this.expirationDateTimer) {
			clearInterval(this.expirationDateTimer);
		}
	}

	private handleError(errorRes) {
		let errorMessage = 'Some Unknown Error Occured';

		if (!errorRes.error || !errorRes.error.error) {
			return throwError(errorMessage);
		}

		switch (errorRes.error.error.errors[0].message) {
			case 'EMAIL_EXISTS':
				errorMessage = 'EMail already exists';
				break;
			case 'EMAIL_NOT_FOUND':
				errorMessage = 'Email doesnt exists';
				break;
			case 'INVALID_PASSWORD':
				errorMessage = 'Invalid Password';
				break;
		}

		return throwError(errorMessage);
	}

	private handleAuthentication(email: string, userId: string, token: string, expires: number) {
		let expirationDate = new Date(new Date().getTime() + expires * 1000);
		let user = new User(email, userId, token, expirationDate);
		localStorage.setItem('userData', JSON.stringify(user));
		let expirationTime = new Date(expirationDate).getTime() - new Date().getTime();
		console.log(expirationTime);
		this.autoLogout(expirationTime);
		this.userSubject.next(user);
	}
}
