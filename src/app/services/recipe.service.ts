import { Recipe } from '../models/recipe.model';
import { Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { Subject } from 'rxjs';

export class RecipeService {
	recipesChanged = new Subject<Recipe[]>();
	private recipes: Recipe[];

	constructor() {}

	getRecipes() {
		return [ ...this.recipes ];
	}

	getRecipeById(id: number) {
		return this.recipes[id];
	}

	addRecipe(recipe: Recipe) {
		this.recipes.push(recipe);
		this.recipesChanged.next(this.getRecipes());
	}

	editRecipe(index: number, recipe: Recipe) {
		this.recipes[index] = recipe;
		this.recipesChanged.next(this.getRecipes());
	}

	deleteRecipe(index: number) {
		this.recipes.splice(index, 1);
		this.recipesChanged.next(this.getRecipes());
	}

	setRecipes(recipes: Recipe[]) {
		this.recipes = recipes;
		this.recipesChanged.next(this.getRecipes());
	}
}
