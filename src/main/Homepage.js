import React from "react";
import { Link } from 'react-router-dom';
import Header from "../components/header"
import "../css/homepage.css";
import TC_img from "../imgs/TC_catalog.jpg";
import FC_img from "../imgs/FC_catalog.jpg";


class Homepage extends React.Component{
    render(){
        return(
            <>
                <Header/>
                <div className="homepageContainer">             
                    <div className="description">
                        <Link to="/learning">
                            <img src={TC_img} alt="TC-learning"/> 
                            <div >
                                <span>Learning Mandarin</span>
                            </div>                   
                         </Link>                                
                    </div>
                    <div className="description">
                        <Link to="/flashcard">
                            <img src={FC_img} alt="FlashCard"/>                           
                            <div>
                                <span>Flash Card</span>
                            </div>                   
                        </Link>
                    </div>                      
                </div>
            </>
            
        )
    }
}

export default Homepage