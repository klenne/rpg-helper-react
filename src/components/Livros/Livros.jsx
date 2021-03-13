import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

import Livro from "./Livro";
import "./Livro.css";

const Livros = () => {
  const [livro, setLivro] = useState("jogador");
  const [active, setActive] = useState([true, false, false,false]);

  const changeBook = (book, index) => {
    setLivro(book);
    let activeTemp = active;
    activeTemp.forEach(function(part, index) {
        this[index] = false;
      }, activeTemp)
   active[index]=true;
   setActive(active);
  };


  return (
    <>
      <div className="livros">

      <Livro livro={livro} />

        <nav>
          <ul>
            <li>
              <span
                className={active[0] ? "active" : "inative"}
                onClick={() => changeBook("jogador", 0)}
              >
                Livro do Jogador
              </span>
            </li>
            <li>
              <span
                className={active[1] ? "active" : "inative"}
                onClick={() => changeBook("jogadorI", 1)}
              >
                Livro do Jogador Inglês
              </span>
            </li>
            <li>
              <span
                className={active[2] ? "active" : "inative"}
                onClick={() => changeBook("monstros", 2)}
              >
                Manual dos Monstros
              </span><span
                className={active[3] ? "active" : "inative"}
                onClick={() => changeBook("mestre", 3)}
              >
                Guia do Mestre
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Livros;
