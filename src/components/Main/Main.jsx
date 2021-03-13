import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

import "./Main.css";
import Home from "../Home/Home";
import Livros from "../Livros/Livros";

const Main = () => {
  return (
    <>
      <Router>
        <div>
          <div  className="main">
            <nav>
              <ul>
                <li>
                  <NavLink to="/" exact>
                    Inicio
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Livros">Livros</NavLink>
                </li>
                <li>
                  <NavLink to="/Notas">Notas</NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <main>
            <Switch>
              <Route path="/" exact>
                <Home></Home>
              </Route>
              <Route path="/Livros">
                <Livros />
              </Route>

              <Route path="/Notas"></Route>

              <Route path="*">
                <h1>404</h1>
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    </>
  );
};

export default Main;
