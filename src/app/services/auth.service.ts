import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponseData } from '../models/authresponsedata.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
	constructor(private http: HttpClient) {}

	signUp(email: string, password: string) {
		return this.http.get<
			AuthResponseData
		>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]`, {
			email: email,
			password: password,
			returnSecureToken: true
		});
	}
}
