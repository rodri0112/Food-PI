import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createRecipe, getDietTypes } from "../../actions";
import "./RecipeCreate.css";

function validate(newrecipe) {
  let errors = {};
  if (!newrecipe.name) {
    errors.name = "Name required";
  } else if (!newrecipe.summary) {
    errors.summary = "summary required";
  } else if (!newrecipe.healthScore) {
    errors.healthScore = "HealthScore required";
  } else if (newrecipe.healthScore > 100 || newrecipe.healthScore < 0) {
    errors.healthScore = "HealthScore value must be (0-100)";
  } else if (newrecipe.steps.length === 0) {
    errors.steps = "At least one step required";
  } else if (newrecipe.diets.length === 0) {
    errors.diets = "At least one diet required";
  }
  return errors;
}

export const RecipeCreate = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getDietTypes());
  }, [dispatch]);

  const { dietTypes } = useSelector((state) => state);
  const [newrecipe, setRecipe] = useState({
    name: "",
    summary: "",
    healthScore: 0,
    step: "",
    number: 1,
    steps: [],
    diets: [],
  });
  const [error, setError] = useState({ "": "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createRecipe(newrecipe));
    alert("Recipe Created");
    history.push("/home");
  };

  const handleChange = (e) => {
    setRecipe({
      ...newrecipe,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...newrecipe,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleClickAdd = (e) => {
    setRecipe({
      ...newrecipe,
      steps: [
        ...newrecipe.steps,
        {
          number: newrecipe.number,
          step: newrecipe.step,
        },
      ],
      number: newrecipe.number + 1,
      step: ''
    });
    setError(
      validate({
        ...newrecipe,
        steps: [
          ...newrecipe.steps,
          {
            number: newrecipe.number,
            step: newrecipe.step,
          },
        ],
        number: newrecipe.number + 1,
      })
    );
  };

  const handleCheck = (e) => {
    if (e.target.checked && !newrecipe.diets.includes(e.target.value)) {
      setRecipe({
        ...newrecipe,
        diets: [...newrecipe.diets, e.target.value],
      });
      setError(
        validate({
          ...newrecipe,
          diets: [...newrecipe.diets, e.target.value],
        })
      );
    } else {
      let filtered = newrecipe.diets.filter((d) => d !== e.target.value);
      setRecipe({
        ...newrecipe,
        diets: filtered,
      });
      setError(
        validate({
          ...newrecipe,
          diets: filtered,
        })
      );
    }
  };

  return (
    <div className="recipecreate">
      <div className="createcontainer">
        <form className="form" onSubmit={handleSubmit}>
          <div className="formin">
            <label>
              Name:{" "}
              <input
                type="text"
                name="name"
                autoComplete="off"
                value={newrecipe.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Summary:{" "}
              <textarea
                name="summary"
                autoComplete="off"
                value={newrecipe.summary}
                onChange={handleChange}
              />
            </label>
            <label>
              Health Score:{" "}
              <input
                type="number"
                name="healthScore"
                autoComplete="off"
                value={newrecipe.healthScore}
                onChange={handleChange}
              />
            </label>
            <div className="stepinput">
                <label>
                Steps:{" "}
                </label>
                <div  className='tarea'>
                    <textarea
                        name="step"
                        autoComplete="off"
                        value={newrecipe.step}
                        onChange={handleChange}
                    />
                </div>
                <div className="btn2holder">
                    <button type="button" className="btn2" onClick={handleClickAdd}>
                        Add
                    </button>
                </div>
            </div>
            <div className="dietcheckcont">
                <label>Diet Type:</label>
                <div className="checks">
                    {dietTypes.map((e) => {
                        return (
                        <div key={e.id} className="ccl">
                            <label className="containerc">
                                <input type="checkbox" value={e.name} onChange={handleCheck}/>
                                <div class="checkmark" ></div>
                            </label>
                            <label>{e.name}</label>
                        </div>
                        );
                    })}
                </div>
            </div>
          </div>
        </form>

        <div className="preview">
          <div>
            {error.name? <label className="errordisp">--{error.name}--</label> : <h3>{newrecipe.name}</h3>}
          </div>
          <div>
            {error.summary? <label className="errordisp">--{error.summary}--</label> : <p>{newrecipe.summary}</p>}
          </div>
          <div>
            { error.healthScore? <label className="errordisp">--{error.healthScore}--</label> : <h5>HealthScore: {newrecipe.healthScore}</h5>}
          </div>
          <div>
            {error.steps? <label className="errordisp">--{error.steps}--</label> : newrecipe.steps?.map((s) => (
              <div key={s.number}>
                <label>step {s.number}:</label>
                <p key={s.number}>{s.step}</p>
              </div>
            ))}
          </div>
          <div>
            {error.diets? <label className="errordisp">--{error.diets}--</label> :newrecipe.diets+''}
          </div>
          <div className="submitbtn">
            <button type="button" disabled={Object.values(error).length} onClick={handleSubmit}>
              Upload Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
