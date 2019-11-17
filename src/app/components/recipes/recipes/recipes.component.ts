import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
	selector: 'app-recipes',
	templateUrl: './recipes.component.html',
	styleUrls: [ './recipes.component.css' ]
})
export class RecipesComponent implements OnInit {
	recipeDetails: Recipe;
	constructor(private recipeService: RecipeService) {}

	ngOnInit() {
		this.recipeService.recipesChanged.subscribe((recipe: Recipe) => {
			this.recipeDetails = recipe;
		});
	}
}
