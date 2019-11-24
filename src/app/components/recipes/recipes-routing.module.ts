import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { RecipestartComponent } from './recipestart/recipestart.component';
import { EditrecipeComponent } from './editrecipe/editrecipe.component';
import { RecipedetailsComponent } from './recipedetails/recipedetails.component';
import { RecipeResolverService } from 'src/app/services/reciperesolver.service';

const appRoutes: Routes = [
	{
		path: 'recipes',
		component: RecipesComponent,
		canActivate: [ AuthGuard ],
		children: [
			{ path: '', component: RecipestartComponent },
			{ path: 'new', component: EditrecipeComponent },
			{ path: ':id', component: RecipedetailsComponent, resolve: [ RecipeResolverService ] },
			{ path: ':id/edit', component: EditrecipeComponent, resolve: [ RecipeResolverService ] }
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(appRoutes) ],
	exports: [ RouterModule ]
})
export class RecipesRoutingModule {}
