import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import Header from "../components/common/header";
import "../css/category.css";
import TC_img from "../imgs/TC_catalog.jpg";
import FC_img from "../imgs/FC_catalog.jpg";



class Category extends React.Component{


    render(){
        return(
            <Fragment>
                <Header/>
                <div className="categoryContainer">             
                    <div className="description">
                        <Link to="/topics">
                            <img src={TC_img} alt="TC-learning"/> 
                            <div >
                                <span>Learning Chinese</span>
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
            </Fragment>
            
        )
    }
}

export default Category