import './App.css';
import React from "react";
import { Route } from "react-router-dom";
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import { RecipeDetail } from './components/Recipes/RecipeDetail';
import { RecipeCreate } from './components/Recipes/RecipeCreate';


function App() {
  return (
    <div className="App">
      <React.Fragment>
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Home}/>
          <Route exact path="/home/:id" component={RecipeDetail} />
          <Route exact path="/create" component={RecipeCreate} />
      </React.Fragment>
    </div>
  );
}

export default App;
