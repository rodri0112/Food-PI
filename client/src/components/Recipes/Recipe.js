import React from 'react'
import './Recipe.css'

function Recipe(props) {
    let {name, image, diets} = props
  return (
    <div className='card'>
        <div className='title'>
            <h3 className='name'>{name}</h3>
        </div>
        <div className='divimg'>
            <img src={image} alt='img' className='image'/>
        </div>
        <div className='dietTypeContainer'>
            {
                diets?.map( e => {
                    return (
                        <h5 className='diets' key={e}>{e}</h5>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Recipe