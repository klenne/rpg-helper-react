import React,{useState}from 'react'

import './Dices.css'
import Dice from '../Dice/Dice'



const Dices = () => {

const [status,setStatus]= useState(0);
const changeStatus=()=>{
    switch(status){
        case 0: setStatus(1);break;
        case 1: setStatus(0);break;
     
    }
    
}
    return (
        <>
            <footer className="footerContainer">
                <div className="tag" onClick={changeStatus}><span >DADOS</span></div>
                <div className={`acordion ${status==0? "closed":"opened"}`} >

                    <div className="dices">
                        <Dice dado="4"></Dice>
                        <Dice dado="6"></Dice>
                        <Dice dado="8"></Dice>
                        <Dice dado="10"></Dice>
                        <Dice dado="12"></Dice>
                        <Dice dado="20"></Dice>
                        <Dice dado="100"></Dice>
                    </div>
                </div>
            </footer>

        </>
    )



}

export default Dices