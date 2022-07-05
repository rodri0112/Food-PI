import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getAllRecipes, getDietTypes } from "../../actions";
import Paging from "../Paging/Paging";
import RecipesGrid from "../Recipes/RecipesGrid";
import NavBar from "../NavBar/NavBar";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();

  let { recipes } = useSelector((state) => state);
  const [currentpage, setCurrentPage] = useState(1);
  const recipesPerPage = 9;

  const indexOfLastRecipe = currentpage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;

  let currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paging = (pagenumber) => {
    setCurrentPage(pagenumber);
  };

  React.useEffect(() => {
    dispatch(getDietTypes());
    dispatch(getAllRecipes());
  }, [dispatch]);

  return !recipes.length ? (
    <div className="spinnercontainer">
      <div class="spinner">
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
      </div>
    </div>
  ) : (
    <div className="Home">
      <div>
        <NavBar paging={paging}/>
      </div>
      <div className="paging">
        <Paging
          recipesPerPage={recipesPerPage}
          recipesL={recipes.length}
          paging={paging}
        />
      </div>
      <div>
        <RecipesGrid currentRecipes={currentRecipes} />
      </div>
    </div>
  );
}
