import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/services/datastorage.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.css' ]
})
export class HeaderComponent implements OnInit {
	constructor(private datastorageService: DataStorageService) {}

	ngOnInit() {}

	onSaveData(event: Event) {
		event.preventDefault();
		this.datastorageService.storeData();
	}

	onFetchData(event: Event) {
		event.preventDefault();
		this.datastorageService.fetchRecipes().subscribe();
	}
}
