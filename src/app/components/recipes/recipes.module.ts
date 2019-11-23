import { NgModule } from '@angular/core';
import { RecipeslistComponent } from './recipeslist/recipeslist.component';
import { RecipeitemComponent } from './recipeitem/recipeitem.component';
import { RecipedetailsComponent } from './recipedetails/recipedetails.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipestartComponent } from './recipestart/recipestart.component';
import { EditrecipeComponent } from './editrecipe/editrecipe.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipesRoutingModule } from './recipes-routing.module';
import { AppDropdownDirective } from 'src/app/directives/appdropdown.directive';

@NgModule({
	declarations: [
		RecipeslistComponent,
		RecipeitemComponent,
		RecipedetailsComponent,
		RecipesComponent,
		RecipestartComponent,
		EditrecipeComponent,
		AppDropdownDirective
	],
	imports: [ CommonModule, ReactiveFormsModule, RecipesRoutingModule ],
	exports: [ AppDropdownDirective ]
})
export class RecipesModule {}
