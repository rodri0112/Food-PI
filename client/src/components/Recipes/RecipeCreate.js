import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createRecipe, getDietTypes } from '../../actions'
import './RecipeCreate.css'

function validate(newrecipe) {
    let errors = {};
    if (!newrecipe.name) {
      errors.name = "Name required";
    } else if (!newrecipe.summary) {
      errors.summary = "summary required";
    } else if (!newrecipe.healthScore) {
      errors.healthScore = "HealthScore required";
    }
    else if (newrecipe.healthScore > 100 || newrecipe.healthScore < 0) {
      errors.healthScore = "HealthScore value must be (0-100)";
    }
    else if (newrecipe.steps.length === 0) {
      errors.steps = "At least one step required";
    } 
    else if (newrecipe.diets.length === 0) {
      errors.diets = "At least one diet required";
    }  
    return errors;
}

export const RecipeCreate = () => {
    
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getDietTypes());
      }, [dispatch]);

    const { dietTypes } = useSelector(state => state)
    const [newrecipe, setRecipe] = useState({
        name: '',
        summary:'',
        healthScore: 0,
        step: '',
        number: 1,
        steps: [],
        diets:[]
    })
    const [error,setError] = useState({})
    
    console.log(error)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createRecipe(newrecipe))
    } 

    const handleChange = (e) => {
        setRecipe({
            ...newrecipe ,
            [e.target.name]: e.target.value
         })
        setError(validate({
            ...newrecipe ,
            [e.target.name]: e.target.value
        }))
    } 
    
    const handleClickAdd = (e) => {
        setRecipe({
            ...newrecipe,
            steps: [...newrecipe.steps,
                {
                number: newrecipe.number,
                step: newrecipe.step
                }
            ],
            number: newrecipe.number+1
        })
        setError(validate({
            ...newrecipe,
            steps: [...newrecipe.steps,
                {
                number: newrecipe.number,
                step: newrecipe.step
                }
            ],
            number: newrecipe.number+1
        }))
        
    }

    const handleCheck = (e) => {
        if (e.target.checked && !newrecipe.diets.includes(e.target.value)) {
            setRecipe({
                ...newrecipe,
                diets: [...newrecipe.diets, e.target.value]
            })
            setError(validate({
                ...newrecipe,
                diets: [...newrecipe.diets, e.target.value]
            }))
        }else {
            let filtered = newrecipe.diets.filter(d => d!==e.target.value)
            setRecipe({
                ...newrecipe,
                diets: filtered
            })
            setError(validate({
                ...newrecipe,
                diets: filtered
            }))
        }
    }

  return (
    <div className='recipecreate'>
        <form className='form' onSubmit={handleSubmit}>
            <div className='formin'>
                
                <label>Name: <input type="text" name='name' autoComplete="off" value={newrecipe.name} onChange={handleChange}/></label>
                <label>Summary: <textarea  name='summary' autoComplete="off" value={newrecipe.summary} onChange={handleChange}/></label>
                <label>Health Score: <input type="number" name='healthScore' autoComplete="off" value={newrecipe.healthScore} onChange={handleChange}/></label>
                <label>Steps: <textarea  name='step' autoComplete="off" value={newrecipe.step} onChange={handleChange}/></label>
                <label><button type='button' onClick={handleClickAdd} >Add</button></label>
                <div>
                    {
                        newrecipe.steps?.map(e => {
                            return (
                                <div key={e.number}>
                                    <label>step {e.number}:</label>
                                    <p>{e.step}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='checks'>
                    {
                        dietTypes.map(e => {
                            return (
                                <div key={e.id}>
                                    <input type='checkbox' value={e.name} onChange={handleCheck}/>
                                    <label>{e.name}</label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                <button type="submit">Upload Recipe</button>
            </div>
        </form>
    </div>
  )
}

