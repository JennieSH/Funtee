import React from "react";
import {Route, Link} from 'react-router-dom';
import Header from "./header"
import "../css/common.css";
// import Banner from '../imgs/banner.jpg';


class Homepage extends React.Component{
    render(){
        return(
            <>
                <Header/>
                <div className="homepageContainer">
                
                <div className="description">
                    <img src="https://live.staticflickr.com/4337/36566095584_5d8fedc570_z.jpg" alt="TC-learning"/>  
                    <div >
                        <span>Learning Mandarin</span>
                    </div>              
                </div>
                <div className="description">
                    <img src="https://cdn.pixabay.com/photo/2019/02/06/16/59/book-3979574_1280.jpg" alt="FlashCard"/>  
                    <div>
                        <span>Flash Card</span>
                    </div>        
                </div>              
                </div>
            </>
            
        )
    }
}

export default Homepage