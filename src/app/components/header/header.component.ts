import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/services/datastorage.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.css' ]
})
export class HeaderComponent implements OnInit {
	userSub: Subscription;
	isAuthenticated: boolean;
	constructor(private datastorageService: DataStorageService, private authService: AuthService) {}

	ngOnInit() {
		this.userSub = this.authService.userSubject.subscribe((user) => {
			this.isAuthenticated = user ? true : false;
		});
	}

	onSaveData(event: Event) {
		event.preventDefault();
		this.datastorageService.storeData();
	}

	onFetchData(event: Event) {
		event.preventDefault();
		this.datastorageService.fetchRecipes().subscribe();
	}

	onLogout(event: Event) {
		event.preventDefault();
		this.authService.logout();
	}
}
