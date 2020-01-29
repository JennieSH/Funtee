import React from "react";
import {Route, Link} from 'react-router-dom';
import Header from "./header"
import "../css/common.css";
// import Banner from '../imgs/banner.jpg';


class TC_Catalog extends React.Component{
    render(){
        return(
            <>
                <Header/>
                <div className="TC_CatalogContainer">
                    {/* <span> A pin a day is a groat a year</span> */}
                    <div>
                        <div className="TC_CatalogBox">
                            <img/>                       
                            <span>Taiwanese<br/>Phonetic Symbol</span>
                            <button>Learn More</button>
                        </div>
                    </div>
                   
                    <div>
                        <div className="TC_CatalogBox">
                            <img/>                       
                            <span>Common<br/>Mandarin Vocabulary</span>
                            <button>Learn More</button>
                        </div>
                    </div>

                    <div>
                        <div className="TC_CatalogBox">
                            <img/>                       
                            <span>Taiwanese<br/>Mandarin Vocabulary</span>
                            <button>Learn More</button>
                        </div>
                    </div>

                </div>
            </>
            
        )
    }
}

export default TC_Catalog