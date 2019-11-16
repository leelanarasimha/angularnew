import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './components/recipes/recipes/recipes.component';
import { ShoppinglistComponent } from './components/shopping/shoppinglist/shoppinglist.component';
import { RecipestartComponent } from './components/recipes/recipestart/recipestart.component';
import { RecipedetailsComponent } from './components/recipes/recipedetails/recipedetails.component';
import { EditrecipeComponent } from './components/recipes/editrecipe/editrecipe.component';

const appRoutes: Routes = [
	{ path: '', redirectTo: '/recipes', pathMatch: 'full' },
	{
		path: 'recipes',
		component: RecipesComponent,
		children: [
			{ path: '', component: RecipestartComponent },
			{ path: 'new', component: EditrecipeComponent },
			{ path: ':id', component: RecipedetailsComponent },
			{ path: ':id/edit', component: EditrecipeComponent }
		]
	},
	{ path: 'shoppinglist', component: ShoppinglistComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(appRoutes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
