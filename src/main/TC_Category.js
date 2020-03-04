import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import Header from "../components/common/header";
import "../css/TC_Category.css";
import symbol_U from "../imgs/unit-symbol.png";
import common_U from "../imgs/unit-common.png";
import taiwan_U from "../imgs/unit-taiwan.png";

class TC_Category extends React.Component{

    render(){
        return(
            <Fragment>
                <Header/>
                <div className="TC_CatalogContainer">
                    <div >
                        <div className="TC_CatalogBox">
                            <div className="img">
                                <img src={symbol_U}/>  
                            </div>                     
                            <span>Mandarin<br/>Phonetic Symbols</span>
                            <Link to="/symbol"><button>Learn More</button></Link>
                        </div>
                    </div>
                   
                    <div>
                        <div className="TC_CatalogBox">
                        <div className="img">
                                <img src={common_U}/>  
                            </div>                          
                            <span>Common<br/> Vocabulary</span>
                            <Link to="/lessons"><button>Learn More</button></Link>
                        </div>
                    </div>

                    <div>
                        <div className="TC_CatalogBox">
                        <div className="img">
                                <img src={taiwan_U}/>  
                            </div>                          
                            <span>Common Vocabulary<br/>In Taiwan</span>
                            <Link to="/lessonstw"><button>Learn More</button></Link>
                        </div>
                    </div>
                </div>
            </Fragment>        
        )
    }
}
export default TC_Category 


