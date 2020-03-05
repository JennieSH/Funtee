import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import Header from "../components/common/header";
import "../css/TC_UnitCategory.css";

class TC_UnitCategory extends React.Component{
    render(){
        return(
            <Fragment>
                <Header/>
                <div className="UnitCatalogContainer">
                    <h2>Common <br/>Chinese Vocabulary</h2>
                    <ul>                    
                        <Link to={{ pathname:"/vocabulary", state:"greetings" }}><li className="box1">Greetings</li></Link>
                        <Link to={{ pathname:"/vocabulary", state:"number" }}><li className="box2">Number</li></Link>
                        <Link to={{ pathname:"/vocabulary", state:"shopping" }}><li className="box3">Shopping</li></Link>
                        <Link to={{ pathname:"/vocabulary", state:"travel" }}><li className="box4">Travel</li></Link>
                        <Link to={{ pathname:"/vocabulary", state:"leisure" }}><li className="box5">Leisure</li></Link>
                        <Link to={{ pathname:"/vocabulary", state:"emotion" }}><li className="box6">Emotion</li></Link>
                    </ul>
                </div>
            </Fragment>
            
        )
    }
}

export default TC_UnitCategory