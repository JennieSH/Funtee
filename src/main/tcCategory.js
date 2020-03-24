import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import symbol from "../imgs/lesson-symbol.png";
import common from "../imgs/lesson-common.png";
import taiwan from "../imgs/lesson-taiwan.png";
import "../css/tcCategory.css";
class TcCategory extends React.Component{

    render(){
        return(
            <Fragment>
                <div className="tcCategoryContainer">
                    <Header/>
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
                    <Footer/>
                </div>
            </Fragment>        
        )
    }
}
export default TcCategory 


