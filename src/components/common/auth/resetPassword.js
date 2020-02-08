import React from "react";
import { connect } from "react-redux";
import { resetPassword } from "../../../store/actions/authActions";
import "../../../css/common.css";
import Header from "../header";
import BB from "../../../imgs/BB.jpg";
import firebase from "firebase/app";


class ResetPassword extends React.Component{

    constructor(props){
        super(props);
        this.state={
            email:null,
        }

    }
    handleChange(e){
        this.setState({
            email : e.currentTarget.value
        })
    }
 
    handlePasswordReset(){
        if (this.state.email === null){
            console.log("請輸入信箱")
        }else{
          
            this.props.resetPassword(this.state.email)
        }
    }
 

    render(){
        const { authError } = this.props;      
        return(
            <>
                <Header/>  
                {/* <img src={BB} className="banner"/> */}
                <div className="AuthContainer">                   
                <input onChange={ this.handleChange.bind(this) } type="email" placeholder="Email" id="email"/> 
                { authError ? <h4>{authError}</h4> : null }
                <button onClick={ this.handlePasswordReset.bind(this) }>Send Email</button>
                </div>
            </> 
        )
    }
}

const mapStateToProps = ( state ) =>{
    return{
        authError : state.auth.authError
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return{
        resetPassword : ( emailAddress )=> dispatch( resetPassword( emailAddress) )
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( ResetPassword )