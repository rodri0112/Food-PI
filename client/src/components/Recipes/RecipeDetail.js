import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetail } from "../../actions";
import "./RecipeDetail.css";

export const RecipeDetail = (props) => {
  const dispatch = useDispatch();
  const recipeDetail = useSelector((state) => state.recipeDetail);
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(getRecipeDetail(id));
    return () => {
      dispatch(getRecipeDetail('a'));
    };
  }, [dispatch, id]);

  
  return !RecipeDetail.length ? (
    <div className="detailoading">
      <div class="loaderd">
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
    <div className="recipedetail">
      <div className="box">
        <div>
          <h2 className="h3D">{recipeDetail.name}</h2>
        </div>
        <div>
          <img src={recipeDetail.image} alt="img" className="image" />
        </div>
        <div>
          <h4 className="h4D">
            Ideal for {recipeDetail.dishTypes?.join(", ")}
          </h4>
        </div>
        <div className="detailtypes">
          {recipeDetail.diets?.map((e) => {
            return (
              <h4 className="diet" key={e}>
                {e}
              </h4>
            );
          })}
        </div>
        <div>
          <p className="pe"
            dangerouslySetInnerHTML={{__html: recipeDetail.summary}}//cambiar, con regEx
          />
        </div>
        <div>
          <h4 className="h4D">Health Score: {recipeDetail.healthScore}</h4>
        </div>
        <div>
          <h4 className="h4D">Step by step:</h4>
          {recipeDetail.steps &&
            recipeDetail.steps.map((e) => {
              return (
                <div className="steps" key={e.number}>
                  <h4>{e.number}</h4>
                  <p>{e.step}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
