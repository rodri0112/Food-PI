import React from 'react'


function Recipe(props) {
    let {name, image, diets} = props
  return (
    <div className='recipe'>
        <div>
            <h3 className='name'>{name}</h3>
        </div>
        <div>
            <img src={image} alt='img' className='image'/>
        </div>
        <div className='dietTypeContainer'>
            {
                diets?.map( e => {
                    return (
                        <h5 className='diet' key={e}>{e}</h5>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Recipe