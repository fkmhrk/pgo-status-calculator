import React, { useEffect, useReducer, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./mdc.scss";
import { newRepositories } from "./repository/impl/repoModule";
import { IPokemonSet } from "./repository/pokemon";
import { IRepositories } from "./repository/repositories";
import TopScreen from "./screen/top/TopScreen";

const pathPrefix = "/pgo-status-calculator";

function App() {
  const [repositories, setRepositories] = useState<IRepositories>(
    newRepositories()
  );
  const [allPokemons, setAllPokemons] = useState<IPokemonSet | undefined>();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const f = async () => {
      const allPokemons = await repositories.pokemon.fetchAll();
      setAllPokemons(allPokemons);
      setInitialized(true);
    };
    f();
  }, []);

  return (
    <React.Fragment>
      {initialized ? (
        <BrowserRouter>
          <Routes>
            <Route
              path={`${pathPrefix}/`}
              element={
                <TopScreen
                  allPokemons={allPokemons!}
                  repo={repositories}
                ></TopScreen>
              }
            />
          </Routes>
        </BrowserRouter>
      ) : null}
    </React.Fragment>
  );
}

export default App;
