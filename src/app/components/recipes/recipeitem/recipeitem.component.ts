import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
	selector: 'app-recipeitem',
	templateUrl: './recipeitem.component.html',
	styleUrls: [ './recipeitem.component.css' ]
})
export class RecipeitemComponent implements OnInit {
	@Input('recipe') recipe: Recipe;
	@Input('id') id;

	constructor(private recipeService: RecipeService) {}

	ngOnInit() {}

	onRecipeSelect(event: Event) {
		event.preventDefault();
	}
}
