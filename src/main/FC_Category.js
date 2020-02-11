import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../components/common/header";



class FC_Category extends React.Component{


 
    
    render(){
       if(!this.props.auth.uid)return <Redirect to="/signin"/>

        return(
            <>
            <Header/>
               
                FC page
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
