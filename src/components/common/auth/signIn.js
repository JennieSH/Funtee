import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signIn } from "../../../store/actions/authActions";
import firebase from 'firebase/app';

import "../../../css/common.css";
import Header from "../header";
import BB from "../../../imgs/BB.jpg";


class SignIn extends React.Component{

    constructor(props){
        super(props);
        this.state={
            email:null,
            password:null,
        }

    }

    handleChange(e){
        this.setState({
            [ e.currentTarget.id ] : e.currentTarget.value
        })
    }

    handleSubmit(e){
        e.preventDefault();

        if ( this.state.email === null ){
            alert("請輸入信箱")
        }else if( this.state.password === null ){
            alert("請輸密碼")
        }else if ( this.state.password.trim().length < 6 ){
            alert("密碼至少六個字");         
        }else{
            this.props.signIn(this.state)            
        }
    }

   
  
    FB_Redirect(){
        let providerF = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithRedirect(providerF).then(function(result) {
            let token = result.credential.accessToken;      
            let user = result.user;
          })
    }


    GO_Redirect(){
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider).then(function(result) {
            let token = result.credential.accessToken;      
            let user = result.user;
          })
    }


    render(){
        const { authError } = this.props;      
        return(
            <>
                <Header/>  
                {/* <img src={BB} className="banner"/> */}
                <div className="AuthContainer">
                    
                    <form onSubmit={ this.handleSubmit.bind(this) } className="authForm">         
                        <input onChange={ this.handleChange.bind(this) } type="email" placeholder="Email" id="email"/> 
                               
                        <input onChange={ this.handleChange.bind(this) } type="password" placeholder="Password" id="password"/>
                        { authError ? <h4>{ authError }</h4> : null }
                        <Link to="/resetpassword"><h5>FORGOT  PASSWORD ></h5></Link>
                        <button> SIGN IN</button>
                    </form>
               
                    <Link to="/signup"><button>SIGN UP</button></Link>                 
                    <button onClick={ this.FB_Redirect.bind(this) }>Facebook Log in</button>       
                    <button onClick={ this.GO_Redirect.bind(this) }>Google Log in</button>

                </div>
            </> 
        )
    }
}

const mapStateToProps = ( state ) => {
    return{
       authError : state.auth.authError
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return{
        signIn : (creds) => dispatch(signIn(creds))
    }
}
export default connect( mapStateToProps, mapDispatchToProps)( SignIn )