import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipeDetail } from '../../actions'
import './RecipeDetail.css'

export const RecipeDetail = (props) => {
    const dispatch = useDispatch()
    const recipeDetail = useSelector(state => state.recipeDetail)
    const id = props.match.params.id

    useEffect(() => {
        dispatch(getRecipeDetail(id))
    },[dispatch,id])
  return (
    <div className='recipedetail'>
        <div>
            <h2 className='h3D'>{recipeDetail.name}</h2>
        </div>
        <div>
            <img src={recipeDetail.image} alt='img' className='image'/>
        </div>
        <div>
            <h4 className='h4D'>Ideal for {recipeDetail.dishTypes?.join(', ')}</h4>
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
            <p className='pe'>
                {recipeDetail.summary?.replace(/<[^>]*>?/gm, '')}
            </p>
        </div>
        <div>
            <h4 className='h4D'>Health Score: {recipeDetail.healthScore}</h4>
        </div>
        <div>
            <h4 className='h4D'>Step by step:</h4>
            {
                recipeDetail.steps&&recipeDetail.steps.map( e => {
                    return (
                        <div className='steps' key={e.number}>
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
