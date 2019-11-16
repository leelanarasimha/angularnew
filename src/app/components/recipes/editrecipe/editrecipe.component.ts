import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
	selector: 'app-editrecipe',
	templateUrl: './editrecipe.component.html',
	styleUrls: [ './editrecipe.component.css' ]
})
export class EditrecipeComponent implements OnInit {
	id: number;
	editMode = false;
	recipeForm: FormGroup;

	constructor(private recipeService: RecipeService, private route: ActivatedRoute) {}

	ngOnInit() {
		this.route.params.subscribe((params) => {
			this.id = +params['id'];
			this.editMode = params['id'] != null;
			this.initForm();
		});
	}

	initForm() {
		let recipeName = '';
		let recipeImage = '';
		let recipeDescription = '';
		let recipeIngredients = new FormArray([]);

		if (this.editMode) {
			let recipedetails = this.recipeService.getRecipeById(this.id);
			recipeName = recipedetails.name;
			recipeDescription = recipedetails.description;
			recipeImage = recipedetails.imagePath;
			if (recipedetails.ingredients) {
				for (const ingredient of recipedetails.ingredients) {
					recipeIngredients.push(
						new FormGroup({
							name: new FormControl(ingredient.name, Validators.required),
							amount: new FormControl(ingredient.amount, [
								Validators.required,
								Validators.pattern(/^[1-9]+[0-9]*$/)
							])
						})
					);
				}
			}
		}

		this.recipeForm = new FormGroup({
			name: new FormControl(recipeName, Validators.required),
			imagePath: new FormControl(recipeImage, Validators.required),
			description: new FormControl(recipeDescription, Validators.required),
			ingredients: recipeIngredients
		});

		console.log(this.recipeForm);
	}

	onAddIngredient() {
		(<FormArray>this.recipeForm.get('ingredients')).push(
			new FormGroup({
				name: new FormControl('', Validators.required),
				amount: new FormControl('', [ Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/) ])
			})
		);
	}
}
