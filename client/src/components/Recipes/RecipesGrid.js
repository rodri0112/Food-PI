import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Recipe from './Recipe'



function RecipesGrid() {
    const recipes = useSelector(state => state.recipes)
  return (
    <div className='RecipeGrid'>
        {
            recipes.map(e => {
                return (
                    <div className='recipe' key={e.id}>
                        <Link to={`/home/${e.id}`} className='detailink'>`
                            <Recipe
                                name={e.name}
                                image={e.image}
                                diets={e.diets}
                            />
                        </Link>
                    </div>
                )
            })
        }
    </div>
  )
}

export default RecipesGrid