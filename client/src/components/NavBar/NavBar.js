import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SearchBar } from "../SearchBar/SearchBar";
import { filterRecipesByType, orderRecipes } from "../../actions";
import Logo from "../../images/fork.png";
import "./NavBar.css";

function NavBar({paging}) {
  const dispatch = useDispatch();
  let { dietTypes } = useSelector((state) => state);
  const [type, setType] = useState("");
  const [typesArr, setTypesArr] = useState([]);

  const handleOnChange = (e) => {
    setType(e.target.value);
  };

  const handleClickAdd = (e) => {
    if (type && !typesArr.includes(type)) setTypesArr([...typesArr, type]);
    dispatch(filterRecipesByType([...typesArr, type]));
    paging(1)
  };

  const handleClickClear = (e) => {
    setTypesArr([])
    dispatch(filterRecipesByType([]));
    paging(1)
  };

  const resetTypesArr = () => {
    setTypesArr([]);
  };

  const handleOrder = (e) => {
    dispatch(orderRecipes(e.target.value));
    paging(1)
  };

  return (
    <div className="navbar">
      <div>
        <Link to={'/'}>
          <img src={Logo} className="logo" />
        </Link>
      </div>

      <div className="custom-dropdown order">
        <select name="select" onChange={handleOrder}>
          <option disabled selected defaultValue>Ordered by...</option>
          <option value="AZ">A-Z</option>
          <option value="ZA">Z-A</option>
          <option value="<HS">Most Health-Score</option>
          <option value=">HS">Less Health-Score</option>
        </select>
      </div>

      <div className="typeContainer">
        <div className="custom-dropdown types">
          <select onChange={handleOnChange}>
            <option disabled selected defaultValue>select type to add</option>
            {dietTypes.map((e) => {
              return (
                <option value={e.name} key={e.id}>
                  {e.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <button className="btn" onClick={handleClickAdd}>Add</button>
        </div>

        <div className="typearr">
          {typesArr?.map((e) => {
            return <span key={e}>-{e}</span>;
          })}
        </div>
        
        <div>
          <button className="btn" onClick={handleClickClear}>Clear</button>
        </div>
      </div>
      
      <div>
        <Link to="/create" className="createlink">
          <button  className="btn" type="button">Create Recipe</button>
        </Link>
      </div>

      <div>
        <SearchBar reset={resetTypesArr} />
      </div>
    </div>
  );
}

export default NavBar;
