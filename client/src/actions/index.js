import { GET_ALL_RECIPES, GET_RECIPE_DETAIL, GET_DIET_TYPES, ADD_RECIPE } from "./actionTypes";
const axios = require('axios')

export const getAllRecipes = () => {
    return async function (dispatch) {
        return axios.get(`http://localhost:3001/recipes`)
        .then(recipes => dispatch({type: GET_ALL_RECIPES, payload: recipes.data}))
    }
}

export const getDietTypes = () => {
    return async function (dispatch) {
        return axios.get(`http://localhost:3001/diets`)
        .then(diets => dispatch({type: GET_DIET_TYPES, payload: diets.data}))
    }
}

export const getRecipeDetail = (id) => {
    return async function (dispatch) {
        return axios.get(`http://localhost:3001/recipes/${id}`)
        .then(recipeDetail => dispatch({type: GET_RECIPE_DETAIL, payload: recipeDetail.data}))
    }
}