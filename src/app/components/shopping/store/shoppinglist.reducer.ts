import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/models/ingredient.model';
import * as shoppinglistactions from './shoppinglist.actions';

export interface AppState {
	shoppingList: State;
}

export interface State {
	ingredients: Ingredient[];
	editedIngredient: Ingredient;
	editedIndex: number;
}

const initialState: State = {
	ingredients: [ new Ingredient('Apples', 12), new Ingredient('Oranges', 30) ],
	editedIngredient: null,
	editedIndex: -1
};

export function shoppinglistReducer(state = initialState, action: shoppinglistactions.shoppinglistactions) {
	switch (action.type) {
		case shoppinglistactions.ADD_INGREDIENT:
			return { ...state, ingredients: [ ...state.ingredients, action.payload ] };
			break;

		case shoppinglistactions.ADD_INGREDIENTS:
			return { ...state, ingredients: [ ...state.ingredients, ...action.payload ] };
			break;

		case shoppinglistactions.UPDATE_INGREDIENT:
			const ingredient = state.ingredients[action.index];
			const updatedIngredient = {
				...ingredient,
				...action.payload
			};
			const updatedIngredients = [ ...state.ingredients ];
			updatedIngredients[action.index] = updatedIngredient;
			return { ...state, ingredients: updatedIngredients };
			break;

		case shoppinglistactions.DELETE_INGREDIENT:
			let ingredientsData = [ ...state.ingredients ];
			ingredientsData.splice(action.index, 1);
			return {
				...state,
				ingredients: state.ingredients.filter((ig, igIndex) => {
					return igIndex !== action.index;
				})
			};
			break;

		default:
			return state;
			break;
	}
}
