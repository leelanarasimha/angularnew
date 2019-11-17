import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../models/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
	constructor(private recipeService: RecipeService, private http: HttpClient) {}

	storeData() {
		let recipes = this.recipeService.getRecipes();
		this.http.put(`https://recipe-project-460d0.firebaseio.com/categories.json`, recipes).subscribe((data) => {
			console.log(data);
		});
	}

	fetchRecipes() {
		return this.http.get<Recipe[]>(`https://recipe-project-460d0.firebaseio.com/categories.json`).pipe(
			map((recipes) => {
				return recipes.map((recipe) => {
					return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
				});
			}),
			tap((recipes) => {
				this.recipeService.setRecipes(recipes);
			})
		);
	}
}
