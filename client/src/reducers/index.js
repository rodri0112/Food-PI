import { GET_ALL_RECIPES, GET_RECIPE_DETAIL, GET_DIET_TYPES, ADD_RECIPE } from "../actions/actionTypes.js";

const initialState = {
    recipes: [],
    allRecipes: [],
    recipeDetail: {},
    dietTypes: []
}


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        
        case GET_DIET_TYPES:
            return {
                ...state,
                dietTypes: action.payload
            }
        
        case GET_RECIPE_DETAIL:
            return {
                ...state,
                recipeDetail: action.payload
            }
            
        default:
            return {...state}
    }
}
