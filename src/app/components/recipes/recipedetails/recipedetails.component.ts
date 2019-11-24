import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ShoppinglistService } from 'src/app/services/shoppinglist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/models/ingredient.model';
import { AddIngredients } from '../../shopping/store/shoppinglist.actions';
import { AppState } from '../../shopping/store/shoppinglist.reducer';

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
		private router: Router,
		private store: Store<AppState>
	) {}

	ngOnInit() {
		this.route.params.subscribe((params) => {
			this.id = +params['id'];
			this.recipe = this.recipeService.getRecipeById(this.id);
		});
	}

	onShoppinglistAdd(event: Event) {
		event.preventDefault();
		this.store.dispatch(new AddIngredients(this.recipe.ingredients));
		//this.shoppingService.addIngredients(this.recipe.ingredients);
	}

	onDeleteRecipe(event: Event) {
		event.preventDefault();
		this.recipeService.deleteRecipe(this.id);
		this.router.navigate([ '/recipes' ]);
	}
}
