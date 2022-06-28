import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux'
import { SearchBar } from '../SearchBar/SearchBar';
import { filterRecipesByType, orderRecipes } from '../../actions';
import Logo from '../../images/fork.png'
import './NavBar.css'

function NavBar() {

    const dispatch = useDispatch()
    let { dietTypes } = useSelector((state) => state);
    const [type, setType] = useState('')
    const [typesArr, setTypesArr] = useState([])

    const handleOnChange = (e) => {
        if (type!=='invalid') setType(e.target.value)
    } 

    const handleClickAdd = (e) => {
        if (type && !typesArr.includes(type)) setTypesArr(
            [...typesArr,type]
        )
    } 

    const handleClickApply = (e) => {
        dispatch(filterRecipesByType(typesArr))

    }

    const resetTypesArr = () => {
        setTypesArr([])
    } 

    const handleOrder = (e) => {
        if(e.target.value!=='Unorder') dispatch(orderRecipes(e.target.value))
    }



  return (
    <div className='navbar'>
        <div>
            <img src={Logo} className='logo'/>
        </div>
        <div className="typeContainer">
          <label>Diet Type:</label>
          <div>
            <select className="typefilter" onChange={handleOnChange}>
              <option value='ivalid'>select type to add</option>
              {dietTypes.map((e) => {
                return (
                  <option value={e.name} key={e.id}>{e.name}</option>
                );
              })}
            </select>
          </div>
          <div>
            <button onClick={handleClickAdd}>Add</button>
          </div>
          <div>
            {typesArr?.map(e => {
                return (
                    <span key={e}>{e}</span>
                )
            })}
          </div>
          <div>
            <button onClick={handleClickApply}>Apply</button>
          </div>
        </div>
        <div className='orderContainer'>
          <label>Order:</label>
          <div>
            <select name="select" onChange={handleOrder}>
              <option value="Unorder">...</option>
              <option value="AZ">A-Z</option>
              <option value="ZA">Z-A</option>
              <option value="<HS">Most Health-Score</option>
              <option value=">HS">Less Health-Score</option>
            </select>
          </div>
        </div>
        <div>
            <SearchBar reset={resetTypesArr}/>
        </div>
        <div>
            <Link to='/create' className='createlink'>
                <button type='button'>Create Recipe</button>
            </Link>
        </div>
    </div>
  )
}

export default NavBar