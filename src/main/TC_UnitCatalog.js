import React from "react";
import {Route, Link} from 'react-router-dom';
import Header from "../components/header";
import "../css/TC_UnitCatalog.css";



class TC_UnitCatalog extends React.Component{
    render(){
        return(
            <>
                <Header/>
                <div className="UnitCatalogContainer">
                    <h2>Common <br/>Mandarin Vocabulary</h2>
                    <ul>
                        <Link to="/vocabulary"><li className="box1">Number</li></Link>
                        <Link to="/vocabulary"><li className="box2">Transportation</li></Link>
                        <Link to="/vocabulary"><li className="box3">Emotion</li></Link>
                        <Link to="/vocabulary"><li className="box4">Color</li></Link>
                        <Link to="/vocabulary"><li className="box5">Shopping</li></Link>
                        <Link to="/vocabulary"><li className="box6">Food</li></Link>
                    </ul>
                </div>
            </>
            
        )
    }
}

export default TC_UnitCatalog