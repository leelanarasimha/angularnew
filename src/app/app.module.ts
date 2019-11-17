import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ShoppinglistComponent } from './components/shopping/shoppinglist/shoppinglist.component';
import { ShoppinglisteditComponent } from './components/shopping/shoppinglistedit/shoppinglistedit.component';
import { RecipeslistComponent } from './components/recipes/recipeslist/recipeslist.component';
import { RecipeitemComponent } from './components/recipes/recipeitem/recipeitem.component';
import { RecipedetailsComponent } from './components/recipes/recipedetails/recipedetails.component';
import { RecipesComponent } from './components/recipes/recipes/recipes.component';
import { AppDropdownDirective } from './directives/appdropdown.directive';
import { RecipeService } from './services/recipe.service';
import { ShoppinglistService } from './services/shoppinglist.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipestartComponent } from './components/recipes/recipestart/recipestart.component';
import { EditrecipeComponent } from './components/recipes/editrecipe/editrecipe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		ShoppinglistComponent,
		ShoppinglisteditComponent,
		RecipeslistComponent,
		RecipeitemComponent,
		RecipedetailsComponent,
		RecipesComponent,
		AppDropdownDirective,
		RecipestartComponent,
		EditrecipeComponent
	],
	imports: [ BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule ],
	providers: [ RecipeService, ShoppinglistService ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
