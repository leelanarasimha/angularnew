import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppinglistService } from 'src/app/services/shoppinglist.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-shoppinglist',
	templateUrl: './shoppinglist.component.html',
	styleUrls: [ './shoppinglist.component.css' ]
})
export class ShoppinglistComponent implements OnInit {
	ingredients: Ingredient[];
	subscription: Subscription;

	constructor(private shoppingService: ShoppinglistService) {}

	ngOnInit() {
		this.ingredients = this.shoppingService.getIngredients();

		this.subscription = this.shoppingService.ingredientAdded.subscribe((ingredients: Ingredient[]) => {
			this.ingredients = ingredients;
		});
	}

	onIngredientClicked(event: Event, index: number) {
		event.preventDefault();
		this.shoppingService.startedEditing.next(index);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
