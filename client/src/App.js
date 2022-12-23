import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import Header from "./components/Header";
import RecipeList from "./components/recipes/RecipeList";
import ShowRecipe from "./components/recipes/ShowRecipe";
import EditRecipe from "./components/recipes/EditRecipe";
import DeleteRecipe from "./components/recipes/DeleteRecipe";
import CreateRecipe from "./components/recipes/CreateRecipe";
import React from "react";

const App = () => {
  return (
    <React.Fragment>
      <Router history={history}>
        <Header />
        <main>
          <Switch>
            <Route path="/" exact component={RecipeList} />
            <Route path="/recipes/new" exact component={CreateRecipe} />
            <Route path="/recipes/edit/:id" exact component={EditRecipe} />
            <Route path="/recipes/delete/:id" exact component={DeleteRecipe} />
            <Route path="/recipes/:id" exact component={ShowRecipe} />
          </Switch>
        </main>
      </Router>
    </React.Fragment>
  );
};

export default App;
