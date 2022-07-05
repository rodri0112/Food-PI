import { GET_ALL_RECIPES, GET_RECIPE_DETAIL, GET_DIET_TYPES, CREATE_RECIPE, SEARCH_RECIPE, FILTER_RECIPES_BY_TYPE, RESET_RECIPES, ORDER_RECIPES} from "./actionTypes";
const axios = require('axios')

export const getAllRecipes = () => {
    return async function (dispatch) {
        return await axios.get(`http://localhost:3001/recipes`)
        .then(recipes => dispatch({type: GET_ALL_RECIPES, payload: recipes.data}))
    }
}

export const getDietTypes = () => {
    return async function (dispatch) {
        return await axios.get(`http://localhost:3001/diets`)
        .then(diets => dispatch({type: GET_DIET_TYPES, payload: diets.data}))
    }
}

export const getRecipeDetail = (id) => {
    return async function (dispatch) {
        try {  
            return await axios.get(`http://localhost:3001/recipes/${id}`)
            .then(recipeDetail => dispatch({type: GET_RECIPE_DETAIL, payload: recipeDetail.data}))
        } catch (error) {
            return (dispatch({type: GET_RECIPE_DETAIL, payload: []}))
        }
    }
}

export const createRecipe = (recipe) => {
    return async function (dispatch) {
        return await axios.post(`http://localhost:3001/recipes/`,recipe)
        .then(data=> dispatch({type: CREATE_RECIPE, payload: data.data}))
    }
}
export const searchRecipe = (name) => {
    return async function (dispatch) {
        return await axios.get(`http://localhost:3001/recipes?name=${name}`)
        .then(nameRecipes=> dispatch({type: SEARCH_RECIPE, payload: nameRecipes.data}))
        .catch(error => dispatch({type: SEARCH_RECIPE, payload: error}))
    }
}
export const filterRecipesByType = (types) => {
    return async function (dispatch) {
        return dispatch({type: FILTER_RECIPES_BY_TYPE, payload: types})
    }
}
export const resetRecipes = () => {
    return async function (dispatch) {
        return dispatch({type: RESET_RECIPES, payload: true})
    }
}

export const orderRecipes = (order) => {
    return async function (dispatch) {
        return dispatch({type: ORDER_RECIPES, payload: order})
    }
}

