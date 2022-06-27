import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { resetRecipes, searchRecipe } from '../../actions'

export const SearchBar = ({reset}) => {
    let [name, setName] = useState('')
    const dispatch = useDispatch()

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(searchRecipe(name))
    }

    const handleReset = (e) => {
        e.preventDefault()
        setName('')
        reset()
        dispatch(resetRecipes())
    }

  return (
    <div>
        <input type='text' name='name' placeholder='Pork...' value={name} onChange={e => setName(e.target.value)}/>
        <button onClick={handleClick}>Search</button>
        <button onClick={handleReset}>View all</button>
    </div>
  )
}
