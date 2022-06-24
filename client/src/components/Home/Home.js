import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllRecipes, getDietTypes } from "../../actions";
import RecipesGrid from "../Recipes/RecipesGrid";
import './Home.css'


export default function Home() {
  const dispatch = useDispatch();
  let { dietTypes } = useSelector((state) => state);
  React.useEffect(() => {
    dispatch(getDietTypes());
    dispatch(getAllRecipes())
  }, []);
  return (
    <div className="Home">
      <div>
        <div>
            <Link to='/create'>
                <label>Crear Receta</label>
            </Link>
        </div>
        <div>
          <label>Buscar por Nombre</label>
          <input type="text" placeholder="Pollo frito..."></input>
        </div>
        <div className="typeContainer">
          <label>Tipo de Dieta</label>
          <div className="typefilter">
            {dietTypes.map((e) => {
              return (
                <div key={e.id}>
                  <input type="checkbox" id={e.id} />
                  <label>{e.name}</label>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <label>Ordenar</label>
          <select name="select">
            <option value="value1">A-Z</option>
            <option value="value2">Z-A</option>
            <option value="value3">Mayor Health-Score</option>
            <option value="value4">Menor Health-Score</option>
          </select>
        </div>
      </div>
      <div>
        <RecipesGrid />
      </div>
    </div>
  );
}
