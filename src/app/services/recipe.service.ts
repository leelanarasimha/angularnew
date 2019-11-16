import { Recipe } from '../models/recipe.model';
import { Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';

export class RecipeService {
	private recipes: Recipe[] = [
		new Recipe(
			'Recipe 1',
			'Its a new recipe',
			'https://www.inspiredtaste.net/wp-content/uploads/2018/12/Sauteed-Zucchini-Recipe-1-1200.jpg',
			[ new Ingredient('Meat', 1), new Ingredient('Apples', 1) ]
		),
		new Recipe(
			'Recipe 2',
			'Its a new recipe 2',
			'https://www.inspiredtaste.net/wp-content/uploads/2018/12/Sauteed-Zucchini-Recipe-1-1200.jpg',
			[ new Ingredient('Meadsdt', 1), new Ingredient('Apples', 1) ]
		)
	];

	@Output() recipeSelected = new EventEmitter<Recipe>();

	constructor() {}

	getRecipes() {
		return [ ...this.recipes ];
	}

	getRecipeById(id: number) {
		return this.recipes[id];
	}
}
