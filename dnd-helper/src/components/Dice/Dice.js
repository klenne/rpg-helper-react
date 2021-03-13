import React, { useState } from 'react'

import './Dice.css'
import d4 from './d4.png'
import d6 from './d6.png'
import d8 from './d8.png'
import d10 from './d10.png'
import d12 from './d12.png'
import d20 from './d20.png'
import d100 from './d100.png'


const Dice = (props) => {

    const dado =props.dado
    const [qtd, setQtd] = useState(1)
    const [resultado, setResultado] = useState('')
    const [mod, setMod] = useState(0)




  const  formatDice = (dado) => `D${dado}`

   const  imgFormater = (dado) => {
        switch (dado) {
            case '4': return d4;
            case '6': return d6;
            case '8': return d8;
            case '10': return d10;
            case '12': return d12;
            case '20': return d20;
            case '100': return d100;

        }
    }

    const DiminuirQuantidade = () => {
        let _qtd = qtd

        if (_qtd > 1)
            _qtd--
        setQtd(_qtd)
    }
    const AumentarQuantidade = () => {
        let _qtd = qtd
        _qtd++
        setQtd(_qtd)
    }

    const DiminuirModificador = () => {
        let _mod = mod;
        let modI = parseInt(_mod)
        modI--;
        if (modI > 0) {
            _mod = `+${modI}`
        } else {
            _mod = modI
        }
        setMod(_mod)
    }

    const AumentarModificador = () => {
        let _mod = mod;
        let modI = parseInt(_mod)
        modI++;
        if (modI > 0) {
            _mod = `+${modI}`
        } else {
            _mod = modI
        }
        setMod(_mod)

    }

    const rolarDado = () => {
        let diceType = parseInt(dado)
        let quantidade = parseInt(qtd)
        let modificador = parseInt(mod)
        let resultado = 0
        for (let i = 0; i < quantidade; i++) {
            resultado += dadoRand(diceType)
        }
        resultado += modificador
        if (resultado < 1) {
            resultado = 1;
        }
        setResultado(resultado)
    }
  const  dadoRand = (range) => Math.floor(Math.random() * range + 1)

   const zerarValores = () => {
        setQtd(1)
        setMod(0)
        setResultado('')
    }


        return (<>
            <div className="containerDice">
                <div className="headerDice"><h2>{formatDice(dado)}</h2>
                    <div className="botoes-qtd">
                        <div>Qtd:</div>
                          <div className="bold pointer" onClick={DiminuirQuantidade}>-</div>
                          <div className="resultqtd">{qtd}</div>
                          <div onClick={AumentarQuantidade} className="bold pointer">+</div>
                    </div>
                </div>
                <div className="result"><span>{resultado}</span></div>
                <div className="imgDice">
                    <img className="pointer" src={ imgFormater(dado)} onClick={rolarDado}></img>
                </div>

                <div className="footerDice">
                    <div className="botoes-qtd">
                        <div>Mod:</div> 
                        <div className="bold pointer" onClick={DiminuirModificador}>-</div>
                        <div className="resultMod">{mod}</div>
                        <div onClick={AumentarModificador} className="bold pointer">+</div>
                    </div>
                    <span className="pointer bolder" onClick={zerarValores}>Zerar</span>
                </div>
            </div>
        </>
        )
    
}

export default Dice