import React from "react";
import { Link } from 'react-router-dom';
import Header from "../components/common/header";
import "../css/TC_Category.css";

class TC_Category extends React.Component{

    render(){
        return(
            <>
                <Header/>
                <div className="TC_CatalogContainer">
                    <div>
                        <div className="TC_CatalogBox">
                            <img/>                       
                            <span>Taiwanese<br/>Phonetic Symbol</span>
                            <button><Link to="/symbol">Learn More</Link></button>
                        </div>
                    </div>
                   
                    <div>
                        <div className="TC_CatalogBox">
                            <img/>                       
                            <span>Common<br/> Vocabulary</span>
                            <button><Link to="/lessons">Learn More</Link></button>
                        </div>
                    </div>

                    <div>
                        <div className="TC_CatalogBox">
                            <img/>                       
                            <span>Common Vocabulary<br/>In Taiwan</span>
                            <button><Link to="/lessonstw">Learn More</Link></button>
                        </div>
                    </div>
                </div>
            </>        
        )
    }
}
export default TC_Category 


