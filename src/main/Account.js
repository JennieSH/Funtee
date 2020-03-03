import React, { Fragment } from "react";
// import "../css/account.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../components/common/header";
import SignIn from "../components/common/auth/signIn";
import SignUp from "../components/common/auth/signUp";


class Account extends React.Component{
    constructor(props){
        super(props);
        this.state={
            signIn:true,

        }
    }


    handleToggleIn_M(){
        document.getElementById("auth").classList.remove("active");
    }
    handleToggleUp_M(){
        document.getElementById("auth").classList.add("active")
    }

    handleToggleIn_W(){
        document.getElementById("authCover").classList.remove("active");
        this.setState({
            signIn:true
        })
    }
    handleToggleUp_W(){
        document.getElementById("authCover").classList.add("active");
        this.setState({
            signIn:false
        })
    }

    render() {
        if( this.props.auth.uid )return <Redirect to="/"/>
        return (
            <Fragment>
                <Header/>
                <div className="authContainer">
                    <div className="authMenu">

                        <div className="authBg">
                            <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=60"/>
                        </div>

                        <div className="auth" id="auth">
                                <div className="authCover" id="authCover">

                                    <div className="auth_in_info" style={{display: this.state.signIn? "none": "block" }}>
                                        <h3>Welcome Back</h3>
                                        <p>To keep connected with us please login with your personal information.</p>
                                        <button className="signInBottom" onClick={this.handleToggleIn_W.bind(this)}>SIGN IN</button>
                                    </div>
                                    
                                    <div className="auth_up_info" style={{display: this.state.signIn ? "block" : "none" }}>
                                        <h3 >Hello, Guest</h3>
                                        <p>Enter your personal details and create your own flash cards.</p>
                                        <button className="signUpBottom" onClick={this.handleToggleUp_W.bind(this)}>SIGN UP</button>
                                    </div>

                                </div>

                                <div className="signIn">            
                                    <SignIn/>
                                </div>            
                                
                                <div className="signUp">
                                    <SignUp/>
                                </div>                          
                        </div>

                        <div className="authMobileContainer">
                            <div className="authMobile">
                                <div className="authMobile_Btn">
                                    <button className="signInBottom" onClick={this.handleToggleIn_M.bind(this)}>SIGN IN</button>   
                                    <button className="signUpBottom" onClick={this.handleToggleUp_M.bind(this)}>SIGN UP</button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </Fragment>
        );
    }
  }


const mapStateToProps = ( state ) => {
    return{
       auth : state.firebase.auth
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return{
        signIn : (creds) => dispatch(signIn(creds))
    }
}
export default connect( mapStateToProps, mapDispatchToProps)( Account )
