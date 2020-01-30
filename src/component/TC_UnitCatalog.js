import React from "react";
import {Route, Link} from 'react-router-dom';
import Header from "./header"
import "../css/common.css";



class TC_UnitCatalog extends React.Component{
    render(){
        return(
            <>
                <Header/>
                <div className="UnitCatalogContainer">
                    <h2>Common <br/>Mandarin Vocabulary</h2>
                    <ul>
                        <li className="box1">Number</li>
                        <li className="box2">Transportation</li>
                        <li className="box3">Emotion</li>
                        <li className="box4">Color</li>
                        <li className="box5">Shopping</li>
                        <li className="box6">Food</li>
                    </ul>
                </div>
            </>
            
        )
    }
}

export default TC_UnitCatalog