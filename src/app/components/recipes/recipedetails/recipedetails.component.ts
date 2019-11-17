import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ShoppinglistService } from 'src/app/services/shoppinglist.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-recipedetails',
	templateUrl: './recipedetails.component.html',
	styleUrls: [ './recipedetails.component.css' ]
})
export class RecipedetailsComponent implements OnInit {
	recipe: Recipe;
	id: number;

	constructor(
		private shoppingService: ShoppinglistService,
		private recipeService: RecipeService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit() {
		this.route.params.subscribe((params) => {
			this.id = +params['id'];
			this.recipe = this.recipeService.getRecipeById(this.id);
		});
	}

	onShoppinglistAdd(event: Event) {
		event.preventDefault();
		this.shoppingService.addIngredients(this.recipe.ingredients);
	}

	onDeleteRecipe(event: Event) {
		event.preventDefault();
		this.recipeService.deleteRecipe(this.id);
		this.router.navigate([ '/recipes' ]);
	}
}
