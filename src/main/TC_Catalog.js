import React from "react";
import { Link } from 'react-router-dom';
import Header from "../components/common/header";
import "../css/TC_Catalog.css";
import BkImg from "../components/common/bkImg";

class TC_Catalog extends React.Component{
    render(){
        return(
            <>
                <BkImg/>
                <Header/>
                <div className="TC_CatalogContainer">
                    <div>
                        <div className="TC_CatalogBox">
                            <img/>                       
                            <span>Taiwanese<br/>Phonetic Symbol</span>
                            <button><Link to="/symobol">Learn More</Link></button>
                        </div>
                    </div>
                   
                    <div>
                        <div className="TC_CatalogBox">
                            <img/>                       
                            <span>Common<br/>Mandarin Vocabulary</span>
                            <button><Link to="/units">Learn More</Link></button>
                        </div>
                    </div>

                    <div>
                        <div className="TC_CatalogBox">
                            <img/>                       
                            <span>Taiwanese<br/>Mandarin Vocabulary</span>
                            <button><Link to="/units">Learn More</Link></button>
                        </div>
                    </div>
                </div>
            </>        
        )
    }
}

export default TC_Catalog