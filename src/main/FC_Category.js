import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../components/common/header";
import FCBook from "../components/flashCard/book";
import "../css/FC_Category.css";



class FC_Category extends React.Component{ 

    render(){
       if(!this.props.auth.uid)return <Redirect to="/signin"/>
        return(
            <>
                <Header/>
                <div className="FC_Category container"> 
                    <div className="stickyCard">
                        
                        <a href="">
                            <div className="FC_book card">
                                <div className="card-content">
                                    <div className="card-description">                               
                                        <span className="grey-text right">100 cards</span>   
                                    </div>                                
                                    <span className="card-title center-align"> 
                                        <i className="material-icons yellow-text text-darken-2 ">star</i>
                                        收藏
                                    </span>
                                </div>                 
                            </div>
                        </a>

                        <div className="FC_book card plus">                              
                            <i className="material-icons white-text ">add</i>                          
                        </div>                   
                    
                    </div>               
                    <FCBook/>              
                </div>               
            </>
            
        )
    }
}
const mapStateToProps = ( state ) =>{
    return{
        auth : state.firebase.auth
    }
}

export default connect(mapStateToProps)(FC_Category)
