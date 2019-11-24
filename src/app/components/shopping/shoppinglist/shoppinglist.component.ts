import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppinglistService } from 'src/app/services/shoppinglist.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/shoppinglist.reducer';

@Component({
	selector: 'app-shoppinglist',
	templateUrl: './shoppinglist.component.html',
	styleUrls: [ './shoppinglist.component.css' ]
})
export class ShoppinglistComponent implements OnInit {
	ingredients: Ingredient[];
	subscription: Subscription;

	constructor(private shoppingService: ShoppinglistService, private store: Store<AppState>) {}

	ngOnInit() {
		this.store.select('shoppingList').subscribe((ingredients) => {
			this.ingredients = ingredients.ingredients;
		});
	}

	onIngredientClicked(event: Event, index: number) {
		event.preventDefault();
		this.shoppingService.startedEditing.next(index);
	}
}
