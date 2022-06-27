import React from 'react'
import { Link } from 'react-router-dom'
import Recipe from './Recipe'
import './RecipesGrid.css'



function RecipesGrid({currentRecipes}) {
  return (
    <div className='RecipesGrid'>
        {
            currentRecipes?.map(e => {
                return (
                    <div className='recipeholder' key={e.id}>
                        <Link to={`/home/${e.id}`} className='detailink'>
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