import { GET_ALL_RECIPES, GET_RECIPE_DETAIL, GET_DIET_TYPES, CREATE_RECIPE, SEARCH_RECIPE, FILTER_RECIPES_BY_TYPE, RESET_RECIPES, ORDER_RECIPES, RESET_DETAIL} from "../actions/actionTypes.js";

const initialState = {
    allRecipes:[],
    recipes: [],
    filteredRecipes: [],
    recipeDetail: [],
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
            
        case CREATE_RECIPE:
            return {
                ...state,
            }

        case SEARCH_RECIPE:
            if (action.payload.message) {
                alert("No recipes found")
                return {
                    ...state,
                }
            }else{
                return {
                    ...state,
                    recipes: action.payload
                }
            }

        case RESET_RECIPES:
            return {
                ...state,
                recipes: state.allRecipes
            }

        case FILTER_RECIPES_BY_TYPE:
            let news = []
            if (!action.payload.length) {
                return {
                    ...state,
                    recipes: state.allRecipes
                }
            }
            state.recipes.forEach(r => {
                let aux = action.payload.map(t => {
                    if (!r.diets.includes(t)) return false
                    return true
                })
                if (!aux.includes(false)) news.push(r)
            })
            if(!news.length) {
                alert('no recipes found')
                return {
                    ...state,
                }
            }else{
                return {
                    ...state,
                    recipes: news
                }
            }

        case ORDER_RECIPES:
            var functionpiolarda
            switch (action.payload) {
                case 'AZ':
                    functionpiolarda =  function (a,b) {
                        if (a.name.toLowerCase()<b.name.toLowerCase()) {
                            return -1
                        }
                        if (a.name.toLowerCase()>b.name.toLowerCase()) {
                            return 1
                        }
                        return 0
                    }
                    break;
                case 'ZA':
                    functionpiolarda =  function (a,b) {
                        if (a.name.toLowerCase()<b.name.toLowerCase()) {
                            return 1
                        }
                        if (a.name.toLowerCase()>b.name.toLowerCase()) {
                            return -1
                        }
                        return 0
                    }
                    break;
                case '<HS':
                    functionpiolarda =  function (a,b) {
                        if (a.healthScore<b.healthScore) {
                            return 1
                        }
                        if (a.healthScore>b.healthScore) {
                            return -1
                        }
                        return 0
                    }
                    break;
                case '>HS':
                    functionpiolarda =  function (a,b) {
                        if (a.healthScore<b.healthScore) {
                            return -1
                        }
                        if (a.healthScore>b.healthScore) {
                            return 1
                        }
                        return 0
                    }
                    break;
            
                default:
                    break;
            }
            return {
                ...state,
                recipes: state.recipes.sort(functionpiolarda)//recipes=[1,2,3]
            }

        case RESET_DETAIL:
            return {
                ...state,
                recipeDetail:{}
            }
        default:
            return {...state}
    }
}
