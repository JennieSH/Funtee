import React from "react";
import { Link } from "react-router-dom";

class FCBook extends React.Component{
    render(){
        return(
            <div className="FCBook">
                <i className="delete material-icons red-text">cancel</i>              
                <Link to="/collection">
                        <div className="FC_book card">
                            <div className="card-content">
                                <div className="card-description">
                                    <span className="grey-text ">English</span> 
                                    <span className="grey-text ">100 cards</span>   
                                </div>
                                <span className="card-title center-align">Speaking</span>
                            </div>  
                        </div>
                </Link>
            </div>          
        )
    }
}
export default FCBook