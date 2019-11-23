import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipeService } from './services/recipe.service';
import { ShoppinglistService } from './services/shoppinglist.service';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './components/auth/auth.component';
import { LoadingSpinnerComponent } from './components/shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AlertComponent } from './components/shared/alert/alert.component';
import { AppPlaceholderDirective } from './directives/appplaceholder.directive';
import { RecipesModule } from './components/recipes/recipes.module';
import { ShoppinglistModule } from './components/shopping/shoppinglist.module';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		AuthComponent,
		LoadingSpinnerComponent,
		AlertComponent,
		AppPlaceholderDirective
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		RecipesModule,
		ShoppinglistModule
	],
	providers: [
		RecipeService,
		ShoppinglistService,
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
	],
	bootstrap: [ AppComponent ],
	entryComponents: [ AlertComponent ]
})
export class AppModule {}
