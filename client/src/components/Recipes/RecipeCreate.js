import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createRecipe } from '../../actions'

export const RecipeCreate = () => {

    const dispatch = useDispatch()
    const [recipe, setRecipe] = useState({
        name: '',
        summary:'',
        healthScore: 0,
        steps: [{number:1, step:'pone huevo'},{number:2, step:'pone huevo'}],
        diets:['vegan', 'vegetarian']
    })
    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(createRecipe(recipe))
    } 

    const handleChange = (e) =>{
        setRecipe({
            ...recipe ,
            [e.target.name]: e.target.value
         })
    } 

  return (
    <div>
        <form className='form' onSubmit={handleSubmit}>
            <div>
                
                <label>Name: <input type="text" name='name' autoComplete="off" value={recipe.name} onChange={handleChange}/></label>
                <label>Summary: <textarea  name='summary' autoComplete="off" value={recipe.summary} onChange={handleChange}/></label>
                <label>Health Score: <input type="number" name='healthScore' autoComplete="off" value={recipe.healthScore} onChange={handleChange}/></label>

            </div>
            <div>
                <button type="submit">Upload Recipe</button>
            </div>
        </form>
    </div>
  )
}

