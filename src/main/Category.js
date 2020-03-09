import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import Header from "../components/common/header";
import "../css/category.css";
import TcImg from "../imgs/TC_catalog.jpg";
import FcImg from "../imgs/FC_catalog.jpg";



class Category extends React.Component{


    render(){
        return(
            <Fragment>
                <Header/>
                <div className="categoryContainer">             
                    <div className="description">
                        <Link to="/topics">
                            <img src={TcImg} alt="TcLearning"/> 
                            <div >
                                <span>Learning Chinese</span>
                            </div>                   
                         </Link>                                
                    </div>
                    <div className="description">
                        <Link to="/flashcard">
                            <img src={FcImg} alt="FlashCard"/>                           
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