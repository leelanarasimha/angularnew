import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../models/recipe.model';
import { map, tap, exhaust, exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
	constructor(private recipeService: RecipeService, private http: HttpClient, private authService: AuthService) {}

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
				console.log('tap');
				this.recipeService.setRecipes(recipes);
			})
		);
	}
}
