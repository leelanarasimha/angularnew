import { Ingredient } from '../models/ingredient.model';
import { Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppinglistService {
	ingredients: Ingredient[] = [ new Ingredient('Apples', 12), new Ingredient('Oranges', 30) ];

	@Output() ingredientAdded = new Subject<Ingredient[]>();
	@Output() startedEditing = new Subject<number>();

	constructor() {}

	getIngredients() {
		return [ ...this.ingredients ];
	}

	addIngredient(ingredient: Ingredient) {
		this.ingredients.push(ingredient);
		this.ingredientAdded.next(this.getIngredients());
	}

	addIngredients(ingredients: Ingredient[]) {
		this.ingredients.push(...ingredients);
		this.ingredientAdded.next(this.getIngredients());
	}

	getIngredient(index: number) {
		return this.ingredients.slice()[index];
	}

	updateIngredient(index: number, ingredient: Ingredient) {
		this.ingredients[index] = ingredient;
		this.ingredientAdded.next(this.getIngredients());
	}

	deleteIngredient(index: number) {
		this.ingredients.splice(index, 1);
		this.ingredientAdded.next(this.getIngredients());
	}
}
