import React from "react";
import { Link } from "react-router-dom";

class FCCard extends React.Component{
    render(){
        return(
            <div className="FCCard">
                <i className="delete material-icons red-text">cancel</i>
                <Link to="/card">
                        <div className="FC_card card">                       
                            <div className="card-content">                            
                                <span className="card-title center-align">
                                    <span>蘋果</span>
                                    <i className="material-icons yellow-text text-darken-2 end">star_border</i>
                                </span>
                                

                                <div className="card-description">
                                    <span className="grey-text">Apple</span>    
                                </div>
                            </div>
                            
                        </div>
                </Link>   
            </div>
        )
    }
}
export default FCCard