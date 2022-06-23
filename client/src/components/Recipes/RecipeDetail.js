import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipeDetail } from '../../actions'

export const RecipeDetail = (props) => {
    const dispatch = useDispatch()
    const recipeDetail = useSelector(state => state.recipeDetail)
    const id = props.match.params.id

    useEffect(() => {
        dispatch(getRecipeDetail(id))
    },[])
    console.log(recipeDetail.dishTypes)
  return (
    <div>
        <div>
            <h2>{recipeDetail.name}</h2>
        </div>
        <div>
            <img src={recipeDetail.image} alt='img' className='image'/>
        </div>
        <div>
            <h4>Ideal for: {recipeDetail.dishTypes?.join(', ')}</h4>
        </div>
        <div>
            {
                recipeDetail.diets?.map( e => {
                    return (
                        <h4 className='diet' key={e}>{e}</h4>
                    )
                })
            }
        </div>
        <div>
            <p>
                {recipeDetail.summary?.replace(/<[^>]*>?/gm, '')}
            </p>
        </div>
        <div>
            <h4>{recipeDetail.healthScore}</h4>
        </div>
        <div>
            {
                recipeDetail.steps?.map( e => {
                    return (
                        <div>
                            <h4>{e.number}</h4>
                            <p>{e.step}</p>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}
