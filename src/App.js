import { Switch, Route } from "react-router-dom";
import React from "react";
import Pokemon from "./components/Pokemon";
import Pokedex from "./components/Pokedex";

function App() {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <Pokedex {...props} />}></Route>
      <Route
        exact
        path="/:pokemonId"
        render={(props) => <Pokemon {...props} />}
      ></Route>
    </Switch>
  );
}

export default App;
