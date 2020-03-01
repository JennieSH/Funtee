import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { resetPassword } from "../../../store/actions/authActions";
import "../../../css/account.css";
import Header from "../header";


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
        const { authError, auth } = this.props;
        if( auth.uid )return <Redirect to="/"/>         
        return(
            <>
                <Header/>  
        
                    <div className="ResetContainer">

                      
                        <div className="input-field">
                            <label htmlFor="email">Email</label>        
                            <input onChange={ this.handleChange.bind(this) } type="email"id="email" />
                        </div>
                        { authError ? <h4>{authError}</h4> : null }
                        <button onClick={ this.handlePasswordReset.bind(this) } className="waves-effect waves-light btn">Send Email</button>
                    </div>
          
            </> 
        )
    }
}

const mapStateToProps = ( state ) =>{
    return{
        authError : state.auth.authError,
        auth : state.firebase.auth
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return{
        resetPassword : ( emailAddress )=> dispatch( resetPassword( emailAddress) )
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( ResetPassword )