import React from 'react'
import './Paging.css'

const Paging = ({recipesPerPage, recipesL, paging}) => {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(recipesL/recipesPerPage); i++) {
        pageNumbers.push(i)
    }
    
  return (
    <nav className='pagenav'>
        <ul className='pagelist'>
            {
                pageNumbers && pageNumbers.map(e => 
                    (
                        <li key={e} className='pagenumber'>
                            <a className='apage' onClick={() => paging(e)}>{e}</a>
                        </li>
                    )
                )
            }
        </ul>
    </nav>
  )
}

export default Paging