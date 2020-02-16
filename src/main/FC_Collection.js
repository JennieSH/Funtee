import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../components/common/header";
import FCCard from "../components/flashCard/card";
import "../css/FC_Collection.css";


class FC_Collection extends React.Component{
    render(){
        if( !this.props.auth.uid ){ return <Redirect to = "/signin"/> }
        return(
            
            <>
                <Header/>
                <div className="FC_Collection container"> 
                    <div className="stickyCard">
                        
                        <Link to="/card">
                            <div className="FC_card card">
                                <div className="card-content">                                
                                    <span className="card-title center-align"> 
                                        <i className="material-icons green-text text-darken-1">spellcheck</i>
                                        Spelling
                                    </span>
                                </div>                 
                            </div>
                        </Link>

                        <div className="FC_card card plus">                              
                            <i className="material-icons white-text material-icons waves-effect">add</i>                          
                        </div>                   
                    
                    </div>               
                    <FCCard/>    
                    <FCCard/>  
                    <FCCard/>  
                    <FCCard/>  
                    <FCCard/>    
                    <FCCard/>  
                    <FCCard/>  
                    
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


export default connect(mapStateToProps)(FC_Collection)