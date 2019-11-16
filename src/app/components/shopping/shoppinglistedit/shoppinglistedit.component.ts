import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppinglistService } from 'src/app/services/shoppinglist.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-shoppinglistedit',
	templateUrl: './shoppinglistedit.component.html',
	styleUrls: [ './shoppinglistedit.component.css' ]
})
export class ShoppinglisteditComponent implements OnInit {
	@ViewChild('form', { static: false })
	form: NgForm;

	nameInput: ElementRef;
	amountInput: ElementRef;

	id: number;
	editMode = false;
	subscription: Subscription;
	editedItem: Ingredient;

	@Output() ingredientAdded = new EventEmitter<Ingredient>();

	constructor(private shoppingService: ShoppinglistService) {}

	ngOnInit() {
		this.subscription = this.shoppingService.startedEditing.subscribe((id: number) => {
			this.editMode = true;
			this.id = id;
			this.editedItem = this.shoppingService.getIngredient(id);

			this.form.setValue({
				name: this.editedItem.name,
				amount: this.editedItem.amount
			});
		});
	}

	onClear() {
		this.form.reset();
		this.editMode = false;
	}

	onIngredientAdd(form: NgForm) {
		let value = form.value;
		let ingredient = new Ingredient(value.name, value.amount);
		if (!this.editMode) {
			this.shoppingService.addIngredient(ingredient);
		} else {
			this.shoppingService.updateIngredient(this.id, ingredient);
		}
		this.onClear();
	}

	onResetForm(event: Event) {
		event.preventDefault();
		this.onClear();
	}

	onDelete(event: Event) {
		event.preventDefault();
		this.shoppingService.deleteIngredient(this.id);
		this.onClear();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
