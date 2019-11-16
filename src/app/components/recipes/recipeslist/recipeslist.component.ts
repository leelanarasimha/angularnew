import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
	selector: 'app-recipeslist',
	templateUrl: './recipeslist.component.html',
	styleUrls: [ './recipeslist.component.css' ]
})
export class RecipeslistComponent implements OnInit {
	@Output('recipeselected') recipeSelected = new EventEmitter<Recipe>();

	recipes: Recipe[];

	constructor(private recipeService: RecipeService) {}

	ngOnInit() {
		this.recipes = this.recipeService.getRecipes();
	}
}
