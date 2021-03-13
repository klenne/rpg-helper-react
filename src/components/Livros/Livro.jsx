import React from "react";

import ManualJogador from "./manualJogador.pdf";
import ManualJogadorI from "./manualJogadorI.pdf";
import Monstro from "./monstros.pdf";
import mestre from "./manualMestre.pdf";
import "./Livro.css";

const Livro = (props) => {
  const switchBook = (book) => {
    switch (book) {
      case "jogador":
        return ManualJogador;
      case "jogadorI":
        return ManualJogadorI;
      case "monstros":
        return Monstro;
        case "mestre":
        return mestre;
    }
  };
  return (
    <>
      <embed className="pdf" src={switchBook(props.livro)} key={props.livro} />
    </>
  );
};

export default Livro;
