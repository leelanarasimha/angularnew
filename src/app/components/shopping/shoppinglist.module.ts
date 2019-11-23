import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { ShoppinglisteditComponent } from './shoppinglistedit/shoppinglistedit.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [ { path: 'shoppinglist', component: ShoppinglistComponent } ];

@NgModule({
	declarations: [ ShoppinglistComponent, ShoppinglisteditComponent ],
	imports: [ RouterModule.forChild(appRoutes), CommonModule, FormsModule ],
	exports: [ RouterModule ]
})
export class ShoppinglistModule {}
