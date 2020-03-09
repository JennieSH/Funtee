import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import Header from "../components/common/header";
import "../css/tcCategory.css";
import symbol from "../imgs/unit-symbol.png";
import common from "../imgs/unit-common.png";
import taiwan from "../imgs/unit-taiwan.png";

class TC_Category extends React.Component{

    render(){
        return(
            <Fragment>
                <Header/>
                <div className="tcCategoryContainer">
                    <div >
                        <div className="tcCategoryBox">
                            <div className="img">
                                <img src={symbol}/>  
                            </div>                     
                            <span>Mandarin<br/>Phonetic Symbols</span>
                            <Link to="/symbol"><button>Learn More</button></Link>
                        </div>
                    </div>
                   
                    <div>
                        <div className="tcCategoryBox">
                        <div className="img">
                                <img src={common}/>  
                            </div>                          
                            <span>Common<br/> Vocabulary</span>
                            <Link to="/lessons"><button>Learn More</button></Link>
                        </div>
                    </div>

                    <div>
                        <div className="tcCategoryBox">
                        <div className="img">
                                <img src={taiwan}/>  
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


