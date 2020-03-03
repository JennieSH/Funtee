import React, { Fragment } from "react";
import "../css/account.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../components/common/header";
import SignIn from "../components/common/auth/signIn";
import SignUp from "../components/common/auth/signUp";


class Account extends React.Component{
    constructor(props){
        super(props);
        this.state={
            displaySignInWeb:true,
            displaySignInMobile:true
        }
    }
    handleBlock_IN_Web(){
        this.setState({
            ...this.state,
            displaySignInWeb: true
        })
    }
    handleBlock_UP_Web(){
        this.setState({
            ...this.state,
            displaySignInWeb: false
        })
    }
    handleBlock_IN_Mobile(){
        this.setState({
            ...this.state,
            displaySignInMobile: true
        })
    }
    handleBlock_UP_Mobile(){
        this.setState({
            ...this.state,
            displaySignInMobile: false
        })
    }
 

    componentDidMount(){
        window.addEventListener("resize", this.resize.bind(this));
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.resize.bind(this));
    }

    resize(){
       if (document.body.clientWidth>1280){
        this.setState({
            ...this.state,
            displaySignInMobile: true
        })
       }
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

                        <div className={ this.state.displaySignInMobile? "auth" : "auth active" } id="auth">
                                <div className={ this.state.displaySignInWeb? "authCover" :  "authCover active" } id="authCover">

                                    <div className="auth_in_info" style={{display: this.state.displaySignInWeb? "none": "block" }}>
                                        <h3>Welcome Back</h3>
                                        <p>To keep connected with us please login with your personal information.</p>
                                        <button className="signInBottom" onClick={this.handleBlock_IN_Web.bind(this)}>SIGN IN</button>
                                    </div>
                                    
                                    <div className="auth_up_info" style={{display: this.state.displaySignInWeb ? "block" : "none" }}>
                                        <h3 >Hello, Guest</h3>
                                        <p>Enter your personal details and create your own flash cards.</p>
                                        <button className="signUpBottom" onClick={this.handleBlock_UP_Web.bind(this)}>SIGN UP</button>
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
                                    <button className="signInBottom" onClick={this.handleBlock_IN_Mobile.bind(this)}>SIGN IN</button>   
                                    <button className="signUpBottom" onClick={this.handleBlock_UP_Mobile.bind(this)}>SIGN UP</button>
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
