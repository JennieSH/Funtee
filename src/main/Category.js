import React from "react";
import { Link } from 'react-router-dom';
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import "../css/category.css";
import TcImg from "../imgs/TC-category.jpg";
import FcImg from "../imgs/FC-category.jpg";

class Category extends React.Component{
    render(){
        return(    
            <div className="categoryContainer">  
                <Header/>       
                <div className="description">
                    <Link to="/topics">
                        <img src={ TcImg } alt="TcLearning"/> 
                        <div >
                            <span>Learning Chinese</span>
                        </div>                   
                    </Link>                                
                </div>
                <div className="description">
                    <Link to="/flashcard">
                        <img src={ FcImg } alt="FlashCard"/>                           
                        <div>
                            <span>Flash Card</span>
                        </div>                   
                    </Link>
                </div>
                <Footer/>
            </div>     
        )
    }
}

export default Category