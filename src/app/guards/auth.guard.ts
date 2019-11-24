import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return this.authService.userSubject.pipe(
			take(1),
			map((user) => {
				let isAuth = !!user;
				if (isAuth) {
					return true;
				}

				return this.router.createUrlTree([ '/auth' ]);
			})
		);
	}
}
