import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

import './Main.css'
import Home from '../Home/Home'

const Main = () => {
  return (
    <>
      <Router>
        <div>
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
          <main>
            <Switch>
              <Route path="/" exact>
                <Home></Home>
              </Route>
              <Route path="/Livros">
              <h1>Em construcao</h1>
              </Route>
            

              <Route path="/Notas">
              <h1>Em construcao</h1>

              </Route>

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
