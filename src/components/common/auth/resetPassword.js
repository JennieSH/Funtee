import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { resetPassword } from "../../../store/actions/authActions";
import "../../../css/account.css";
import Header from "../header";
import PasswordDialog from "./passwordDialog";


class ResetPassword extends React.Component{

    constructor(props){
        super(props);
        this.state={
            email:null,
            blankemail:false,
        }
    }

    handleChange(e){
        this.setState({
            email : e.currentTarget.value 
        })
    }

    handlePasswordReset(){
        if (this.state.email === null){
            this.setState({
                ...this.state,
                blankemail:true
            })
        }else{
            this.props.resetPassword(this.state.email)
        }
    }
    
    render(){
        const { passwordError, auth, passwordDialogBox } = this.props;
        if( auth.uid )return <Redirect to="/"/>         
        return(
            <Fragment>
                <Header/>  
                <div className="resetContainer">               
                    <span>Reset Your Password</span> 
                    <div className="input-field">                               
                        <label htmlFor="email">Email</label>      
                        <input onChange={ this.handleChange.bind(this) } type="email"id="email" />   
                        <i className="material-icons grey-text" >mail_outline</i>
                    </div>
                    { passwordError ? <h4>{passwordError}</h4> : null }
                    { this.state.blankemail ? <h4>Please enter your email</h4> : null }
                    <button onClick={ this.handlePasswordReset.bind(this) } className="waves-effect waves-light btn  brown lighten-1">Send Email</button>
                    { passwordDialogBox? <PasswordDialog/> : null }
                </div>
            </Fragment> 
        )
    }
}

const mapStateToProps = ( state ) =>{
    return{
        passwordError : state.auth.passwordError,
        passwordDialogBox : state.auth.passwordDialogBox,
        auth : state.firebase.auth
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return{
        resetPassword : ( emailAddress )=> dispatch( resetPassword( emailAddress) )
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( ResetPassword )